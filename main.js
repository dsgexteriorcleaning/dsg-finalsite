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
  veteransForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.textContent = "Submitting…";
    submitBtn.disabled = true;

    try {
      await fetch("https://script.google.com/a/macros/dsgclean.com/s/AKfycbyS4RrQdRpiXo0hFcOgsT_NwNaLpe2FL130N8-9f7opOGKcjZbP1alYkH1B2By8Xlxt6g/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      alert("Thank you for your service! Your application has been submitted. We'll contact you within 24 hours to verify eligibility and schedule your free service.");
      this.reset();
    } catch (err) {
      alert("Something went wrong. Please call us at (845) 208-9557 to apply directly.");
    } finally {
      submitBtn.textContent = "Submit Application →";
      submitBtn.disabled = false;
    }
  });
}

  // Smooth scroll
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

  // ─── Navigation ───────────────────────────────────────────────
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const navLinks  = document.querySelector(".nav-links");
  const overlay   = document.querySelector("#mobileOverlay");

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
    // Close ALL dropdowns
    document.querySelectorAll(".nav-dropdown").forEach((d) => {
      d.classList.remove("open");
      const toggle = d.querySelector(".dropdown-toggle");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    });
  }

  function toggleMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!navLinks) return;
    navLinks.classList.contains("active") ? closeMenu() : openMenu();
  }

  if (mobileBtn) mobileBtn.addEventListener("click", toggleMenu);
  if (overlay)   overlay.addEventListener("click", closeMenu);

  // ─── ALL dropdowns — works for Services AND Commercial ────────
  document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
    const toggle    = dropdown.querySelector(".dropdown-toggle");
    const menuPanel = dropdown.querySelector(".dropdown-menu");

    if (!toggle) return;

    toggle.addEventListener("click", (e) => {
      if (!isMobile()) return;
      e.preventDefault();
      e.stopPropagation();

      const isOpen = dropdown.classList.contains("open");

      // Close all other dropdowns first
      document.querySelectorAll(".nav-dropdown").forEach((d) => {
        if (d !== dropdown) {
          d.classList.remove("open");
          const t = d.querySelector(".dropdown-toggle");
          if (t) t.setAttribute("aria-expanded", "false");
        }
      });

      // Toggle this one
      dropdown.classList.toggle("open", !isOpen);
      toggle.setAttribute("aria-expanded", !isOpen ? "true" : "false");
    });

    // Prevent clicks inside the panel from bubbling up and closing menu
    if (menuPanel) {
      menuPanel.addEventListener("click", (e) => {
        if (!isMobile()) return;
        e.stopPropagation();
      });
    }
  });

  // Close menu when tapping a real nav link (not a toggle)
  if (navLinks) {
    navLinks.addEventListener("click", (e) => {
      if (!isMobile()) return;
      const clickedLink = e.target.closest("a");
      if (!clickedLink) return;
      if (clickedLink.classList.contains("dropdown-toggle")) {
        e.preventDefault();
        return;
      }
      closeMenu();
    });
  }

  // Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Reset on resize to desktop
  window.addEventListener("resize", () => {
    if (!isMobile()) closeMenu();
  });
});
