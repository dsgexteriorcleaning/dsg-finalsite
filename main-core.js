document.addEventListener("DOMContentLoaded", () => {
  if (!document.querySelector('script[src="photo-proof.js"]')) {
    const proofScript = document.createElement('script');
    proofScript.src = 'photo-proof.js';
    document.body.appendChild(proofScript);
  }

  // Shared presentation layers.
  ["conversion-boost.css", "premium-brand.css"].forEach((href) => {
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }
  });

  // Standardize tracking across every page that uses main.js.
  if (typeof window.fbq !== "function") {
    !function(f,b,e,v,n,t,s){
      if(f.fbq)return;
      n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
      t=b.createElement(e);t.async=!0;t.src=v;
      s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s);
    }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init','1064838422781154');
    window.fbq('track','PageView');
  }

  if (typeof window.gtag !== "function") {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){window.dataLayer.push(arguments);};
    window.gtag('js', new Date());
    const googleScript = document.createElement('script');
    googleScript.async = true;
    googleScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-94B0E9VKL1';
    document.head.appendChild(googleScript);
  }
  window.gtag('config','G-94B0E9VKL1');
  window.gtag('config','AW-18025925638');

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

  // Portfolio quality control: hide malformed or obviously mismatched before/after pairs.
  if (isHome) {
    const gallery = document.querySelector('#galleryTrack');
    if (gallery) {
      gallery.querySelectorAll('.gallery-card').forEach((card) => {
        const after = card.querySelector('.ba-after-img img');
        const before = card.querySelector('.ba-before-wrap img');
        const mismatchedPlaceholder = before && after && /IMG_7473\.jpg$/i.test(before.getAttribute('src') || '') && /collage_export/i.test(after.getAttribute('src') || '');
        if (!after || !before || mismatchedPlaceholder) card.remove();
      });
      const activeFilter = document.querySelector('.filter-btn.active');
      if (activeFilter) setTimeout(() => activeFilter.click(), 0);
    }
  }

  // Ensure Holiday Lighting has a visible place in the site navigation during season.
  const navLinksForHoliday = document.querySelector(".nav-links");
  if (navLinksForHoliday && !navLinksForHoliday.querySelector('a[href*="christmas-light-installation"]')) {
    const li = document.createElement("li");
    li.className = "holiday-nav-item";
    li.innerHTML = '<a href="christmas-light-installation.html" style="color:#9a7415;font-weight:800">Holiday Lighting</a>';
    const reviewsLink = Array.from(navLinksForHoliday.children).find((item) => item.querySelector('a[href*="reviews.html"]'));
    if (reviewsLink) navLinksForHoliday.insertBefore(li, reviewsLink);
    else navLinksForHoliday.appendChild(li);
  }

  // Add dedicated Window Cleaning local-service pages into the Services dropdown.
  const serviceMenus = document.querySelectorAll('.nav-dropdown .dropdown-menu');
  serviceMenus.forEach((menu) => {
    if (!menu.querySelector('a[href*="window-cleaning.html"]') || menu.querySelector('a[href*="window-cleaning-bronx-ny"]')) return;
    const divider = document.createElement('li');
    divider.className = 'dropdown-divider';
    const title = document.createElement('li');
    title.className = 'dropdown-title';
    title.textContent = 'Window Cleaning Areas';
    menu.appendChild(divider);
    menu.appendChild(title);
    [
      ['window-cleaning-dutchess-county.html','Window Cleaning — Dutchess'],
      ['window-cleaning-putnam-county.html','Window Cleaning — Putnam'],
      ['window-cleaning-westchester-county.html','Window Cleaning — Westchester'],
      ['window-cleaning-bronx-ny.html','Window Cleaning — Bronx']
    ].forEach(([href,label]) => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${href}">${label}</a>`;
      menu.appendChild(li);
    });
  });

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

  // Persistent mobile CTA.
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

  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    link.addEventListener("click", () => trackLeadIntent("phone_click", link.getAttribute("href")));
  });
  document.querySelectorAll('a[href*="quote.html"]').forEach((link) => {
    link.addEventListener("click", () => trackLeadIntent("quote_click", link.textContent.trim().slice(0, 60)));
  });

  // Emit standard lead events when the homepage quick quote reports success.
  const quickSuccess = document.getElementById('hqfSuccess');
  if (quickSuccess) {
    let quickLeadTracked = false;
    const reportQuickLead = () => {
      if (quickLeadTracked || getComputedStyle(quickSuccess).display === 'none') return;
      quickLeadTracked = true;
      window.gtag('event','generate_lead',{event_category:'lead',event_label:'homepage_quick_quote'});
      if (typeof window.fbq === 'function') {
        window.fbq('track','Lead',{content_name:'Homepage Quick Quote'});
      }
    };
    const observer = new MutationObserver(reportQuickLead);
    observer.observe(quickSuccess,{attributes:true,attributeFilter:['style','class']});
    reportQuickLead();
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
