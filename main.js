document.addEventListener("DOMContentLoaded", () => {
  // Quote form
  const form = document.getElementById("quoteForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      console.log("Quote Request:", data);

      alert("Thank you! Your quote request has been received. We'll contact you within 24 hours with your personalized quote.");

      this.reset();
      const countyAlert = document.getElementById("countyAlert");
      if (countyAlert) countyAlert.style.display = "none";
    });
  }

  // Veterans form
  const veteransForm = document.getElementById("veteransForm");
  if (veteransForm) {
    veteransForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      console.log("Veterans Application:", data);

      alert("Thank you for your service! Your application has been submitted. We'll contact you within 24 hours to verify eligibility and schedule your free service.");

      this.reset();
    });
  }

  // Smooth scroll for on-page anchors only
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Navigation
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const overlay = document.querySelector("#mobileOverlay");

  const dropdown = document.querySelector(".nav-dropdown");
  const dropdownToggle = document.querySelector(".nav-dropdown .dropdown-toggle");

  const isMobile = () => window.matchMedia("(max-width: 767px)").matches;

  function openMenu() {
    if (!navLinks || !mobileBtn || !overlay) return;
    navLinks.classList.add("active");
    mobileBtn.classList.add("active");
    overlay.classList.add("active");
    mobileBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    if (!navLinks || !mobileBtn || !overlay) return;
    navLinks.classList.remove("active");
    mobileBtn.classList.remove("active");
    overlay.classList.remove("active");
    mobileBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";

    if (dropdown && dropdownToggle) {
      dropdown.classList.remove("open");
      dropdownToggle.setAttribute("aria-expanded", "false");
    }
  }

  function toggleMenu(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!navLinks) return;

    if (navLinks.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (mobileBtn) {
    mobileBtn.addEventListener("click", toggleMenu);
  }

  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  // Mobile Services dropdown
  if (dropdown && dropdownToggle) {
    dropdownToggle.addEventListener("click", (e) => {
      if (!isMobile()) return;

      e.preventDefault();
      e.stopPropagation();

      dropdown.classList.toggle("open");
      dropdownToggle.setAttribute(
        "aria-expanded",
        dropdown.classList.contains("open") ? "true" : "false"
      );
    });

    // Prevent dropdown panel clicks from bubbling up
    const menuPanel = dropdown.querySelector(".dropdown-menu");
    if (menuPanel) {
      menuPanel.addEventListener("click", (e) => {
        if (!isMobile()) return;
        e.stopPropagation();
      });
    }
  }

  // Close mobile menu only when clicking a real navigation link
  if (navLinks) {
    navLinks.addEventListener("click", (e) => {
      if (!isMobile()) return;

      const clickedLink = e.target.closest("a");
      if (!clickedLink) return;

      // Do not close menu when tapping Services toggle
      if (clickedLink.classList.contains("dropdown-toggle")) {
        e.preventDefault();
        return;
      }

      closeMenu();
    });
  }

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  });

  // Reset states when resizing to desktop
  window.addEventListener("resize", () => {
    if (!isMobile()) {
      closeMenu();
    }
  });
});
