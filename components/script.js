if (!window.APP_BASE_URL) {
  window.APP_BASE_URL = window.USE_LOCAL_BACKEND
    ? `${window.location.protocol}//${window.location.hostname}:5000`
    : 'https://api.sssamacademy.com';
}

window.toggleFAQ = function (element) {
  const item = element.parentElement;
  const answer = item.querySelector(".faq-answer");
  
  document.querySelectorAll(".faq-item").forEach((otherItem) => {
    if (otherItem !== item) {
      const q = otherItem.querySelector(".faq-question");
      const a = otherItem.querySelector(".faq-answer");
      if (q) q.classList.remove("active");
      if (a) a.classList.remove("active");
    }
  });

  element.classList.toggle("active");
  if (answer) answer.classList.toggle("active");
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.setAttribute("tabindex", "0");
    btn.setAttribute("role", "button");
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        window.toggleFAQ(btn);
      }
    });
  });
});

// Dynamic Navbar Loader & Navigation State — with localStorage cache
function initNavbarHTML(html) {
  const placeholder = document.getElementById("navbar-placeholder");
  if (placeholder) {
    placeholder.innerHTML = html;
  } else {
    document.body.insertAdjacentHTML("afterbegin", html);
  }
  const navContent = document.querySelector(".nav_content");
  if (navContent) navContent.classList.add("nav-slide-in");

      // Initialize Mobile Hamburger Menu
      window.initNavbarBurger = function () {
        const hamburger = document.querySelector(".hamburger");
        const mobileMenu = document.querySelector(".mobile-menu");
        if (hamburger && mobileMenu) {
          const clone = hamburger.cloneNode(true);
          hamburger.parentNode.replaceChild(clone, hamburger);
          clone.addEventListener("click", () => {
            mobileMenu.classList.toggle("show");
          });

          // Close mobile menu when clicking a direct navigation link
          mobileMenu.querySelectorAll("a:not(.mobile-dropdown-toggle)").forEach((link) => {
            link.addEventListener("click", () => {
              mobileMenu.classList.remove("show");
            });
          });
        }
      };
      window.initNavbarBurger();

      // Mobile Dropdowns Toggle
      document.querySelectorAll(".mobile-dropdown-toggle").forEach((btn) => {
        btn.addEventListener("click", () => {
          const parent = btn.closest(".mobile-dropdown");
          if (parent) {
            parent.classList.toggle("open");
            btn.setAttribute("aria-expanded", parent.classList.contains("open") ? "true" : "false");
          }
        });
      });

      // Desktop Dropdowns Toggle
      document.querySelectorAll(".dropdown-toggle").forEach((btn) => {
        const parent = btn.closest(".nav-dropdown");
        if (parent) {
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            parent.classList.toggle("open");
            btn.setAttribute("aria-expanded", parent.classList.contains("open") ? "true" : "false");
          });
        }
      });

      // Close Desktop Dropdowns when clicking outside
      document.addEventListener("click", (e) => {
        document.querySelectorAll(".nav-dropdown").forEach((parent) => {
          if (!parent.contains(e.target)) {
            parent.classList.remove("open");
            const btn = parent.querySelector(".dropdown-toggle");
            if (btn) btn.setAttribute("aria-expanded", "false");
          }
        });
      });

      // Theme Toggle Functionality — Inverted icons: Show Moon in Light Mode, Sun in Dark Mode
      const themeToggle = document.getElementById("themeToggle");
      const mobileThemeToggle = document.getElementById("mobileThemeToggle");
      const savedTheme = localStorage.getItem("theme");

      if (savedTheme === "dark") {
        document.body.classList.remove("light-mode");
        if (themeToggle) themeToggle.textContent = "☀️";
        if (mobileThemeToggle) mobileThemeToggle.textContent = "☀️";
      } else {
        document.body.classList.add("light-mode");
        if (themeToggle) themeToggle.textContent = "🌙";
        if (mobileThemeToggle) mobileThemeToggle.textContent = "🌙";
      }

      if (themeToggle) {
        themeToggle.addEventListener("click", () => {
          document.body.classList.toggle("light-mode");
          const isLight = document.body.classList.contains("light-mode");
          localStorage.setItem("theme", isLight ? "light" : "dark");
          themeToggle.textContent = isLight ? "🌙" : "☀️";
          if (mobileThemeToggle) mobileThemeToggle.textContent = isLight ? "🌙" : "☀️";
        });
      }

      if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener("click", () => {
          document.body.classList.toggle("light-mode");
          const isLight = document.body.classList.contains("light-mode");
          localStorage.setItem("theme", isLight ? "light" : "dark");
          if (themeToggle) themeToggle.textContent = isLight ? "🌙" : "☀️";
          mobileThemeToggle.textContent = isLight ? "🌙" : "☀️";
        });
      }

      // Active Menu Item Highlighter (Supports Sub-Pages and Parent Dropdowns)
      const currentPath = window.location.pathname;
      const currentFilename = currentPath.split("/").pop();
      const isHome = currentFilename === "" || currentFilename === "/" || currentFilename === "index.html";
      const isCoursePage = currentPath.includes("/courses/");

      document.querySelectorAll(".nav-links a, .mobile-menu a, .dropdown-menu a, .mobile-dropdown-menu a").forEach((link) => {
        const href = link.getAttribute("href");
        let linkFilename = "";
        try {
          if (href) linkFilename = new URL(href, window.location.origin).pathname.split("/").pop();
        } catch (err) {
          linkFilename = (href || "").split("/").pop().split("#")[0];
        }

        let isActive = false;
        if (isHome && (href === "/" || href === "index.html")) {
          isActive = true;
        } else if (isCoursePage && (href === "/courses.html" || linkFilename === "courses.html")) {
          isActive = true;
        } else if (!isHome && linkFilename === currentFilename && linkFilename !== "") {
          isActive = true;
        }

        if (isActive) {
          link.classList.add("active");
          
          // Highlight parent dropdown toggle if link is inside dropdown
          const dropdownMenu = link.closest(".dropdown-menu, .mobile-dropdown-menu");
          if (dropdownMenu) {
            const parentToggle = dropdownMenu.parentElement.querySelector(".dropdown-toggle, .mobile-dropdown-toggle");
            if (parentToggle) {
              parentToggle.classList.add("active");
            }
          }
        }
      });
}

document.addEventListener("DOMContentLoaded", () => {
  const navPath = window.location.pathname.includes("/courses/")
    ? "../components/navbar.html"
    : "components/navbar.html";

  // Clear previous localStorage caches if any to prevent stale render
  localStorage.removeItem("sssam_navbar_html");
  localStorage.removeItem("sssam_navbar_cached_at");

  // Always fetch fresh navbar HTML to guarantee latest layout and styles
  fetch(navPath)
    .then((res) => res.text())
    .then((html) => {
      initNavbarHTML(html);
    })
    .catch((err) => console.error("Error loading navbar:", err));
});

// Dynamic Footer Loader — with localStorage cache
function initFooterHTML(html) {
  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = html;
  } else {
    document.body.insertAdjacentHTML("beforeend", html);
  }
  const currentFilename = window.location.pathname.split("/").pop();
  const isHome = currentFilename === "" || currentFilename === "/" || currentFilename === "index.html";
  document.querySelectorAll(".footer-box#box2 a").forEach((link) => {
    const href = link.getAttribute("href");
    if (isHome && (href === "/" || href === "index.html")) {
      link.classList.add("active-footer");
    } else if (!isHome && href === currentFilename) {
      link.classList.add("active-footer");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const footerPath = window.location.pathname.includes("/courses/")
    ? "../components/footer.html"
    : "components/footer.html";

  const FOOTER_CACHE_KEY = "sssam_footer_html";
  const FOOTER_TIME_KEY = "sssam_footer_cached_at";
  const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

  const cachedFooter = localStorage.getItem(FOOTER_CACHE_KEY);
  const cachedAt = parseInt(localStorage.getItem(FOOTER_TIME_KEY) || "0", 10);
  const isCacheValid = cachedFooter && (Date.now() - cachedAt < CACHE_TTL);

  if (isCacheValid) {
    // Instant render from cache
    initFooterHTML(cachedFooter);
    // Silently refresh in background
    fetch(footerPath)
      .then((res) => res.text())
      .then((html) => {
        localStorage.setItem(FOOTER_CACHE_KEY, html);
        localStorage.setItem(FOOTER_TIME_KEY, Date.now().toString());
      })
      .catch(() => {});
  } else {
    // First visit: fetch, render, then cache
    fetch(footerPath)
      .then((res) => res.text())
      .then((html) => {
        initFooterHTML(html);
        localStorage.setItem(FOOTER_CACHE_KEY, html);
        localStorage.setItem(FOOTER_TIME_KEY, Date.now().toString());
      })
      .catch((err) => console.error("Error loading footer:", err));
  }
});

// Mouse Tracking for Feature Cards
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".feature-card").forEach((card) => {
    let rect = null;
    card.addEventListener("mouseenter", () => {
      rect = card.getBoundingClientRect();
    });
    card.addEventListener("mousemove", (e) => {
      if (!rect) rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      card.style.setProperty("--mouse-angle", `${angle}rad`);
    });
    card.addEventListener("mouseleave", () => {
      rect = null;
    });
  });
});
