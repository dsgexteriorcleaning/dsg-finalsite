document.addEventListener("DOMContentLoaded", () => {
  // Global conversion/mobile stylesheet. Loaded here so existing pages that already
  // include main.js receive the conversion improvements without duplicating markup.
  if (!document.querySelector('link[href="conversion-boost.css"]')) {
    const boostStyles = document.createElement("link");
    boostStyles.rel = "stylesheet";
    boostStyles.href = "conversion-boost.css";
    document.head.appendChild(boostStyles);
  }

  const pathname = window.location.pathname.toLowerCase();
  const isHome = pathname === "/" || pathname.endsWith("/index.html");
  const isQuotePage = pathname.includes("quote");

  function trackLeadIntent(action, label) {
    if (typeof window.gtag === "function") {
      window.gtag("event", action, {
        event_category: "lead_intent",
        event_label: label || pathname
      });
    }
    if (typeof window.fbq === "function") {
      window.fbq("trackCustom", "LeadIntent", {
        action: action,
        label: label || pathname
      });
    }
  }

  // IMPORTANT: the previous generic #quoteForm handler prevented submission,
  // displayed a success alert, and reset the form without transmitting the lead.
  // It has intentionally been removed. Real quote capture is handled by Jobber
  // embeds and the homepage Formspree quick form.

  // Seasonal acquisition banner on the homepage only.
  if (isHome && !document.querySelector(".dsg-seasonal-banner")) {
    const nav = document.querySelector("nav");
    if (nav) {
      const banner = document.createElement("div");
      banner.className = "dsg-seasonal-banner";
      banner.innerHTML = '🎄 2026 Holiday Lighting reservations are open. <a href="christmas-light-installation.html">See Holiday Lighting →</a>';
      nav.insertAdjacentElement("afterend", banner);
      banner.querySelector("a").addEventListener("click", () => trackLeadIntent("holiday_banner_click", "homepage"));
    }
  }

  // Persistent mobile CTA: visitors always have a one-tap path to call or request a quote.
  // Quote pages are excluded so the bar does not cover the Jobber form controls.
  if (!isQuotePage && !document.querySelector(".dsg-mobile-conversion-bar")) {
    const mobileBar = document.createElement("div");
    mobileBar.className = "dsg-mobile-conversion-bar";
    mobileBar.setAttribute("role", "navigation");
    mobileBar.setAttribute("aria-label", "Quick contact actions");
    mobileBar.innerHTML = [
      '<a class="dsg-mobile-call" href="tel:+18452089557">Call DSG</a>',
      '<a class="dsg-mobile-quote" href="quote.html">Get Free Quote</a>'
    ].join("");
    document.body.appendChild(mobileBar);
    mobileBar.querySelector(".dsg-mobile-call").addEventListener("click", () => trackLeadIntent("phone_click", "mobile_sticky"));
    mobileBar.querySelector(".dsg-mobile-quote").addEventListener("click", () => trackLeadIntent("quote_click", "mobile_sticky"));
  }

  // Track existing high-intent links consistently.
  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    link.addEventListener("click", () => trackLeadIntent("phone_click", link.getAttribute("href")));
  });
  document.querySelectorAll('a[href*="quote.html"]').forEach((link) => {
    link.addEventListener("click", () => trackLeadIntent("quote_click", link.textContent.trim().slice(0, 60)));
  });

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

  // Navigation
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const overlay = document.querySelector("#mobileOverlay");
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
  if (overlay) overlay.addEventListener("click", closeMenu);

  document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    const menuPanel = dropdown.querySelector(".dropdown-menu");
    if (!toggle) return;

    toggle.addEventListener("click", (e) => {
      if (!isMobile()) return;
      e.preventDefault();
      e.stopPropagation();
      const isOpen = dropdown.classList.contains("open");

      document.querySelectorAll(".nav-dropdown").forEach((d) => {
        if (d !== dropdown) {
          d.classList.remove("open");
          const t = d.querySelector(".dropdown-toggle");
          if (t) t.setAttribute("aria-expanded", "false");
        }
      });

      dropdown.classList.toggle("open", !isOpen);
      toggle.setAttribute("aria-expanded", !isOpen ? "true" : "false");
    });

    if (menuPanel) {
      menuPanel.addEventListener("click", (e) => {
        if (isMobile()) e.stopPropagation();
      });
    }
  });

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

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (!isMobile()) closeMenu();
  });
});
