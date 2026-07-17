// ==========================================
// FAQ ACCORDION FUNCTIONALITY (Global for inline onclick - Defined FIRST so it is always available)
// ==========================================
window.toggleFAQ = function(element) {
  const faqItem = element.parentElement;
  const answer = faqItem.querySelector('.faq-answer');
  const question = element;

  // Close other open FAQs
  document.querySelectorAll('.faq-item').forEach(item => {
    if (item !== faqItem) {
      const q = item.querySelector('.faq-question');
      const a = item.querySelector('.faq-answer');
      if (q) q.classList.remove('active');
      if (a) a.classList.remove('active');
    }
  });

  // Toggle current FAQ
  question.classList.toggle('active');
  if (answer) answer.classList.toggle('active');
};

// FAQ keyboard support & animations initialized globally
document.addEventListener('DOMContentLoaded', () => {
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.setAttribute('tabindex', '0');
    question.setAttribute('role', 'button');
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.toggleFAQ(question);
      }
    });
  });

});

// ==========================================
// NAVBAR & FOOTER ASYNC DYNAMIC COMPONENT LOADING
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  const navbarPath = currentPath.includes("/courses/") ? "../components/navbar.html" : "components/navbar.html";
  
  fetch(navbarPath)
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML("afterbegin", html);

      // Navbar slide-in via CSS class
      const navContent = document.querySelector(".nav_content");
      if (navContent) {
        navContent.classList.add("nav-slide-in");
      }

      const hamburger = document.querySelector(".hamburger");
      const mobileMenu = document.querySelector(".mobile-menu");
      const themeBtn = document.getElementById("themeToggle");
      const mobileThemeBtn = document.getElementById("mobileThemeToggle");
      const desktopDropdownToggle = document.querySelector(".dropdown-toggle");
      const desktopDropdown = document.querySelector(".nav-dropdown");
      const mobileDropdownToggle = document.querySelector(".mobile-dropdown-toggle");
      const mobileDropdown = document.querySelector(".mobile-dropdown");

      // Mobile Menu Toggle Function exposed globally
      window.initNavbarBurger = function() {
        const burger = document.querySelector(".hamburger");
        const menu = document.querySelector(".mobile-menu");
        if (burger && menu) {
          const newBurger = burger.cloneNode(true);
          burger.parentNode.replaceChild(newBurger, burger);
          newBurger.addEventListener("click", () => {
            menu.classList.toggle("show");
          });
        }
      };

      // Call burger menu initialization
      window.initNavbarBurger();

      // Mobile Certificate submenu toggle
      if (mobileDropdownToggle && mobileDropdown) {
        mobileDropdownToggle.addEventListener("click", () => {
          mobileDropdown.classList.toggle("open");
          const isOpen = mobileDropdown.classList.contains("open");
          mobileDropdownToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });
      }

      // Desktop Certificate submenu toggle
      if (desktopDropdownToggle && desktopDropdown) {
        desktopDropdownToggle.addEventListener("click", (e) => {
          e.preventDefault();
          desktopDropdown.classList.toggle("open");
          const isOpen = desktopDropdown.classList.contains("open");
          desktopDropdownToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        document.addEventListener("click", (e) => {
          if (!desktopDropdown.contains(e.target)) {
            desktopDropdown.classList.remove("open");
            desktopDropdownToggle.setAttribute("aria-expanded", "false");
          }
        });
      }

      // Load Theme
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "light" || !savedTheme) {
        document.body.classList.add("light-mode");
        if (themeBtn) themeBtn.textContent = "☀️";
        if (mobileThemeBtn) mobileThemeBtn.textContent = "☀️";
      } else {
        document.body.classList.remove("light-mode");
        if (themeBtn) themeBtn.textContent = "🌙";
        if (mobileThemeBtn) mobileThemeBtn.textContent = "🌙";
      }

      // Desktop Theme Toggle Action
      if (themeBtn) {
        themeBtn.addEventListener("click", () => {
          document.body.classList.toggle("light-mode");
          if (document.body.classList.contains("light-mode")) {
            localStorage.setItem("theme", "light");
            themeBtn.textContent = "☀️";
            if (mobileThemeBtn) mobileThemeBtn.textContent = "☀️";
          } else {
            localStorage.setItem("theme", "dark");
            themeBtn.textContent = "🌙";
            if (mobileThemeBtn) mobileThemeBtn.textContent = "🌙";
          }
        });
      }

      // Mobile Menu Theme Toggle Action
      if (mobileThemeBtn) {
        mobileThemeBtn.addEventListener("click", () => {
          document.body.classList.toggle("light-mode");
          if (document.body.classList.contains("light-mode")) {
            localStorage.setItem("theme", "light");
            if (themeBtn) themeBtn.textContent = "☀️";
            mobileThemeBtn.textContent = "☀️";
          } else {
            localStorage.setItem("theme", "dark");
            if (themeBtn) themeBtn.textContent = "🌙";
            mobileThemeBtn.textContent = "🌙";
          }
        });
      }

      // Menu Highlights highlight
      const currentPage = window.location.pathname.split("/").pop();
      const isHome = (currentPage === "" || currentPage === "/" || currentPage === "index.html");

      // Desktop menu highlights
      document.querySelectorAll(".nav-links a").forEach(link => {
        const href = link.getAttribute("href");
        let linkPage = "";
        try {
          if (href) linkPage = new URL(href, window.location.origin).pathname.split("/").pop();
        } catch (e) {
          linkPage = (href || "").split("/").pop().split("#")[0];
        }
        if (isHome && (href === "/" || href === "index.html")) {
          link.classList.add("active");
        } else if (linkPage === currentPage) {
          link.classList.add("active");
        }
      });

      // Mobile menu highlights
      document.querySelectorAll(".mobile-menu a").forEach(link => {
        const href = link.getAttribute("href");
        let linkPage = "";
        try {
          if (href) linkPage = new URL(href, window.location.origin).pathname.split("/").pop();
        } catch (e) {
          linkPage = (href || "").split("/").pop().split("#")[0];
        }
        if (isHome && (href === "/" || href === "index.html")) {
          link.classList.add("active");
        } else if (linkPage === currentPage) {
          link.classList.add("active");
        }
      });
    });
});

// WHY CHOOSE SSSAM SECTION ANIMATION (CSS IntersectionObserver)
document.addEventListener("DOMContentLoaded", () => {
  if (!document.querySelector(".why-choose-sssam")) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("anim-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".why-choose-item").forEach((el, i) => {
    el.classList.add("anim-fade-up");
    el.style.transitionDelay = `${i * 0.1}s`;
    observer.observe(el);
  });
});

// LOAD FOOTER
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  const footerPath = currentPath.includes("/courses/") ? "../components/footer.html" : "components/footer.html";
  
  fetch(footerPath)
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML("beforeend", html);

      const currentPage = window.location.pathname.split("/").pop();
      const isHome = (currentPage === "" || currentPage === "/" || currentPage === "index.html");
      const footerLinks = document.querySelectorAll(".footer-box#box2 a");

      footerLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (isHome && (href === "/" || href === "index.html")) {
          link.classList.add("active-footer");
        } else if (href === currentPage) {
          link.classList.add("active-footer");
        }
      });
    });
});

// WHY CHOOSE HOVER EFFECT
document.querySelectorAll('.feature-card').forEach((card) => {
  let rect = null;
  card.addEventListener('mouseenter', () => {
    rect = card.getBoundingClientRect();
  });
  card.addEventListener('mousemove', (e) => {
    if (!rect) rect = card.getBoundingClientRect();
    const cardX = rect.left + rect.width / 2;
    const cardY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - cardY, e.clientX - cardX);
    card.style.setProperty('--mouse-angle', `${angle}rad`);
  });
  card.addEventListener('mouseleave', () => {
    rect = null;
  });
});
