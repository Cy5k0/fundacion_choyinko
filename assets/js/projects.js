export function initProjects() {
  const buttons = [...document.querySelectorAll("[data-filter]")];
  const cards = [...document.querySelectorAll("[data-project]")];
  const status = document.querySelector("[data-filter-status]");

  if (!buttons.length || !cards.length) return;

  const apply = (filter) => {
    buttons.forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.filter === filter),
      );
    });

    cards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.status !== filter;
    });

    if (status) {
      const visible = cards.filter((card) => !card.hidden).length;
      status.textContent = `${visible} proyectos visibles.`;
    }
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => apply(button.dataset.filter));
  });

  apply("all");
}
