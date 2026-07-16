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

  // Smooth scroll animation for FAQ answers with GSAP if available
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.faq-item').forEach((el, index) => {
      gsap.from(el, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        delay: index * 0.08,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "bottom 65%",
          scrub: false
        }
      });
    });
  }
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

      // GSAP Animation (only if GSAP is loaded)
      if (typeof gsap !== "undefined") {
        gsap.from(".nav_content ", {
          y: -50,
          opacity: 0,
          duration: 1,
          delay: 0.2,
          ease: "bounce", 
        });
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

// WHY CHOOSE SSSAM SECTION ANIMATION
document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
  if (!document.querySelector(".why-choose-sssam")) return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".why-choose-item",
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".why-choose-sssam",
        start: "top 82%",
        toggleActions: "play none none none"
      }
    }
  );
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
document.addEventListener('mousemove', function(e) {
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const cardX = rect.left + rect.width / 2;
    const cardY = rect.top + rect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const angle = Math.atan2(mouseY - cardY, mouseX - cardX);
    card.style.setProperty('--mouse-angle', `${angle}rad`);
  });
});
