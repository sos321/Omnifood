// Set current year to copyright
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();

yearEl.textContent = currentYear;

// Mobile navigation
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

// Reset mobile navigation
document.body.onload = function () {
  document.querySelector("html").classList.remove("stop-overflow");
};

btnNavEl.addEventListener("click", function () {
  toggleNavMenu();
});

// Smooth scroll
function smoothScroll(e) {
  e.preventDefault();

  if (e.target.closest(".btn-mobile-nav")) return;

  document
    .querySelector(e.target.getAttribute("href") || "body")
    .scrollIntoView({ behavior: "smooth" });

  e.target.blur();
}

function toggleNavMenu() {
  headerEl.classList.toggle("nav-open");
  btnNavEl.blur();

  document.querySelector("html").classList.toggle("stop-overflow");
}

headerEl.addEventListener("click", function (e) {
  if (
    this.classList.contains("nav-open") &&
    e.target.classList.contains("main-nav-link")
  )
    toggleNavMenu();

  smoothScroll(e);
});

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", smoothScroll);
});

// Sticky navigation
const sectionHeroEl = document.querySelector(".section-hero");
const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-100px",
  }
);

obs.observe(sectionHeroEl);

// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
