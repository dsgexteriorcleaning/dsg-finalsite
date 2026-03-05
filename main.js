document.addEventListener('DOMContentLoaded', function () {
  // Quote form
  const form = document.getElementById('quoteForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      console.log('Quote Request:', data);

      alert("Thank you! Your quote request has been received. We'll contact you within 2 hours with your personalized quote.");

      this.reset();
      const countyAlert = document.getElementById('countyAlert');
      if (countyAlert) countyAlert.style.display = 'none';
    });
  }

  // Veterans form
  const veteransForm = document.getElementById('veteransForm');
  if (veteransForm) {
    veteransForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      console.log('Veterans Application:', data);

      alert("Thank you for your service! Your application has been submitted. We'll contact you within 24 hours to verify eligibility and schedule your free service.");

      this.reset();
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Mobile Menu Toggle
  const nav = document.querySelector('nav .nav-container');
  if (!nav) return;

  const navLinks = nav.querySelector('.nav-links');
  if (!navLinks) return;

  // Get existing hamburger if present, otherwise create it
  let hamburger = nav.querySelector('.mobile-menu-btn');
  if (!hamburger) {
    hamburger = document.createElement('button');
    hamburger.className = 'mobile-menu-btn';
    hamburger.type = 'button';
    hamburger.setAttribute('aria-label', 'Menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    nav.insertBefore(hamburger, navLinks);
  }

  // Get existing overlay if present, otherwise create it
  let overlay = document.querySelector('.mobile-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    document.body.appendChild(overlay);
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function toggleMenu(e) {
    e.stopPropagation();
    const isOpen = navLinks.classList.toggle('active');
    hamburger.classList.toggle('active', isOpen);
    overlay.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".nav-dropdown");
  const toggle = document.querySelector(".nav-dropdown .dropdown-toggle");

  if (!dropdown || !toggle) return;

  // Toggle dropdown on mobile tap
  toggle.addEventListener("click", (e) => {
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    if (!isMobile) return; // Desktop uses hover
    e.preventDefault();
    dropdown.classList.toggle("open");
    toggle.setAttribute("aria-expanded", dropdown.classList.contains("open") ? "true" : "false");
  });

  // Close dropdown when clicking outside (mobile)
  document.addEventListener("click", (e) => {
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    if (!isMobile) return;
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".nav-dropdown");
  const toggle = document.querySelector(".nav-dropdown .dropdown-toggle");
  const navLinks = document.querySelector(".nav-links");
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const overlay = document.querySelector(".mobile-overlay");

  if (!dropdown || !toggle) return;

  const isMobile = () => window.matchMedia("(max-width: 767px)").matches;

  const closeDropdown = () => {
    dropdown.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };

  // MOBILE: Tap Services to expand/collapse dropdown (do NOT close the whole menu)
  toggle.addEventListener("click", (e) => {
    if (!isMobile()) return;          // desktop uses hover
    e.preventDefault();               // don't navigate to services.html
    e.stopPropagation();              // don't trigger “close menu” handlers

    dropdown.classList.toggle("open");
    toggle.setAttribute(
      "aria-expanded",
      dropdown.classList.contains("open") ? "true" : "false"
    );
  });

  // Prevent taps inside dropdown from closing the hamburger menu
  const menuPanel = dropdown.querySelector(".dropdown-menu");
  if (menuPanel) {
    menuPanel.addEventListener("click", (e) => {
      if (!isMobile()) return;
      e.stopPropagation();
    });
  }

  // OPTIONAL: Close dropdown if user taps outside the nav panel (mobile)
  document.addEventListener("click", (e) => {
    if (!isMobile()) return;
    if (!dropdown.contains(e.target)) closeDropdown();
  });

  // OPTIONAL: When a dropdown link is tapped, keep expected behavior:
  // close dropdown AND close the hamburger menu (feels natural)
  dropdown.querySelectorAll(".dropdown-menu a").forEach((a) => {
    a.addEventListener("click", () => {
      if (!isMobile()) return;
      closeDropdown();

      // close the slide-out menu if your hamburger uses these classes
      if (navLinks) navLinks.classList.remove("active");
      if (mobileBtn) mobileBtn.classList.remove("active");
      if (overlay) overlay.classList.remove("active");
    });
  });
});   
