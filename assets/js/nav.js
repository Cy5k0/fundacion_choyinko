const MOBILE_BREAKPOINT = 1024;

export function initNav() {
  const header = document.querySelector("[data-site-header]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-mobile-menu]");
  const pageRegions = [
    document.querySelector("main"),
    document.querySelector("footer"),
    document.querySelector(".skip-link"),
    document.querySelector(".whatsapp-fab"),
  ].filter(Boolean);

  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (toggle && menu) {
    const setOpen = (open, { returnFocus = false } = {}) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      menu.classList.toggle("is-open", open);
      document.body.classList.toggle("is-locked", open);
      pageRegions.forEach((region) => {
        region.inert = open;
      });

      const icon = toggle.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars", !open);
        icon.classList.toggle("fa-xmark", open);
      }

      if (open) {
        const firstLink = menu.querySelector("a");
        if (firstLink) firstLink.focus();
      } else if (returnFocus) {
        toggle.focus();
      }
    };

    toggle.addEventListener("click", () => {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        setOpen(false, { returnFocus: true });
      }
    });

    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        toggle.getAttribute("aria-expanded") === "true"
      ) {
        setOpen(false, { returnFocus: true });
      }
    });

    document.addEventListener("click", (event) => {
      if (
        toggle.getAttribute("aria-expanded") === "true" &&
        !menu.contains(event.target) &&
        !toggle.contains(event.target)
      ) {
        setOpen(false);
      }
    });

    const media = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT}px)`);
    media.addEventListener("change", (event) => {
      if (event.matches) setOpen(false);
    });
  }

  initActiveSection();
}

function initActiveSection() {
  const links = [...document.querySelectorAll("[data-nav-link]")];
  if (!links.length) return;

  const hrefs = [
    ...new Set(
      links
        .map((link) => link.getAttribute("href"))
        .filter((href) => href && href.startsWith("#")),
    ),
  ];

  const sections = hrefs
    .map((href) => document.querySelector(href))
    .filter(Boolean);

  if (!sections.length || !("IntersectionObserver" in window)) return;

  const visibility = new Map();

  const setActive = (id) => {
    links.forEach((link) => {
      const active = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("is-active", active);

      if (active) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        visibility.set(entry.target.id, entry.isIntersecting);
      });

      const current = sections.find((section) => visibility.get(section.id));
      if (current) setActive(current.id);
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
  );

  sections.forEach((section) => observer.observe(section));
}
