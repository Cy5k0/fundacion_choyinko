import { cp, copyFile, mkdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = resolve(ROOT, "_site");
const FILES = [
  "index.html",
  "404.html",
  "CNAME",
  "robots.txt",
  "sitemap.xml",
];

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

for (const file of FILES) {
  const source = resolve(ROOT, file);

  if (!existsSync(source)) {
    console.warn(`[pages] Omitido: ${file} no existe`);
    continue;
  }

  await copyFile(source, resolve(OUT, file));
}

await cp(resolve(ROOT, "assets"), resolve(OUT, "assets"), {
  recursive: true,
  filter: (source) => !source.endsWith(".gitkeep"),
});
await writeFile(resolve(OUT, ".nojekyll"), "", "utf8");

console.log(`[pages] Sitio preparado en ${OUT}`);
