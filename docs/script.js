document.documentElement.classList.add("js");

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".header-nav");
const navLinks = document.querySelectorAll(".header-nav a");
const fadeTargets = document.querySelectorAll(".fade-in");

const closeMenu = () => {
  if (!menuToggle || !nav) return;
  menuToggle.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
};

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.classList.toggle("is-open");
    nav.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

window.addEventListener("scroll", () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px",
  }
);

fadeTargets.forEach((target) => observer.observe(target));

const openReleaseDetailsFromHash = (hash) => {
  if (!hash || hash === "#") return;
  const target = document.querySelector(hash);
  if (!target) return;
  const details = target.querySelector("details");
  if (details) {
    details.open = true;
  }
};

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const id = anchor.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    openReleaseDetailsFromHash(id);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

openReleaseDetailsFromHash(window.location.hash);
