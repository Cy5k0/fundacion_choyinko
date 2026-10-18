import { initNav } from "./nav.js";
import { initProjects } from "./projects.js";
import { initContactForm } from "./form.js";

const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());

const toTop = document.querySelector("[data-to-top]");
if (toTop) {
  toTop.addEventListener("click", () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });
}

initNav();
initProjects();
initContactForm();
