import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = resolve(ROOT, "src");
const INCLUDE = /^([ \t]*)<!--\s*@include\s+([^\s]+)\s*-->/gm;

function indentBlock(block, prefix) {
  if (!prefix) return block;

  return block
    .split("\n")
    .map((line) => (line ? prefix + line : line))
    .join("\n");
}

async function render(file, seen = new Set()) {
  if (seen.has(file)) {
    throw new Error(`Include circular detectado en: ${file}`);
  }

  seen.add(file);
  let html = await readFile(file, "utf8");
  const matches = [...html.matchAll(INCLUDE)];

  for (const [tag, prefix, relativePath] of matches) {
    const partial = resolve(SRC, relativePath);

    if (!existsSync(partial)) {
      throw new Error(`No existe el partial: ${relativePath}`);
    }

    const rendered = await render(partial, seen);
    html = html.replace(tag, () => indentBlock(rendered, prefix));
  }

  seen.delete(file);
  return html;
}

async function build(file, output) {
  const source = resolve(SRC, file);

  if (!existsSync(source)) {
    console.warn(`[build] Omitido: src/${file} no existe`);
    return;
  }

  const html = await render(source);
  await writeFile(resolve(ROOT, output), html, "utf8");
  console.log(`[build] src/${file} -> ${output}`);
}

await build("index.html", "index.html");
await build("404.html", "404.html");
