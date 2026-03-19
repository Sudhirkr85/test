document.addEventListener("DOMContentLoaded", () => {
  // Determine the correct path based on current page location
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
          delay:0.2,
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

      // Mobile Menu Toggle
      hamburger.addEventListener("click", () => {
        mobileMenu.classList.toggle("show");
      });

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
      if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
        themeBtn.textContent = "☀️";
        mobileThemeBtn.textContent = "☀️";
      }


      // FAQ ACCORDION FUNCTIONALITY (Global for inline onclick)
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

      // FAQ keyboard support
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
      // Desktop Theme Toggle
      themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
          localStorage.setItem("theme", "light");
          themeBtn.textContent = "☀️";
          mobileThemeBtn.textContent = "☀️";
        } else {
          localStorage.setItem("theme", "dark");
          themeBtn.textContent = "🌙";
          mobileThemeBtn.textContent = "🌙";
        }
      });

      // Mobile Menu Theme Toggle
      mobileThemeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
          localStorage.setItem("theme", "light");
          themeBtn.textContent = "☀️";
          mobileThemeBtn.textContent = "☀️";
        } else {
          localStorage.setItem("theme", "dark");
          themeBtn.textContent = "🌙";
          mobileThemeBtn.textContent = "🌙";
        }
      });



 const currentPage = window.location.pathname.split("/").pop();

// Special case: Home page
const isHome = (currentPage === "" || currentPage === "/" || currentPage === "index.html");

// Desktop menu
document.querySelectorAll(".nav-links a").forEach(link => {
  const href = link.getAttribute("href");
  let linkPage = "";

  try {
    if (href) {
      linkPage = new URL(href, window.location.origin).pathname.split("/").pop();
    }
  } catch (e) {
    linkPage = (href || "").split("/").pop().split("#")[0];
  }

  if (isHome && (href === "/" || href === "index.html")) {
    link.classList.add("active");
  } 
  
  else if (linkPage === currentPage) {
    link.classList.add("active");
  }
});

// Mobile menu
document.querySelectorAll(".mobile-menu a").forEach(link => {
  const href = link.getAttribute("href");
  let linkPage = "";

  try {
    if (href) {
      linkPage = new URL(href, window.location.origin).pathname.split("/").pop();
    }
  } catch (e) {
    linkPage = (href || "").split("/").pop().split("#")[0];
  }

  if (isHome && (href === "/" || href === "index.html")) {
    link.classList.add("active");
  } 
  
  else if (linkPage === currentPage) {
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

// .............................footer script ............................

// LOAD FOOTER
// Footer Quick Links Active Highlight
document.addEventListener("DOMContentLoaded", () => {
  // Wait for footer to load
  // Determine the correct path based on current page location
  const currentPath = window.location.pathname;
  const footerPath = currentPath.includes("/courses/") ? "../components/footer.html" : "components/footer.html";
  
  fetch(footerPath)
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML("beforeend", html);

      // Get current page path
      const currentPage = window.location.pathname.split("/").pop();

      // Detect Home page
      const isHome = (currentPage === "" || currentPage === "/" || currentPage === "index.html");

      // Select all footer quick links
      const footerLinks = document.querySelectorAll(".footer-box#box2 a");

      footerLinks.forEach(link => {
        const href = link.getAttribute("href");

        // Home page highlight
        if (isHome && (href === "/" || href === "index.html")) {
          link.classList.add("active-footer");
        }

        // Other pages highlight
        else if (href === currentPage) {
          link.classList.add("active-footer");
        }
      });
    });
});

/* ============================
   WHY CHOOSE SECTION - ANIMATIONS
   ============================== */

document.addEventListener('DOMContentLoaded', function() {
  initializeWhyChooseAnimations();
});

/**
 * Initialize scroll-triggered animations for the Why Choose section
 */
function initializeWhyChooseAnimations() {
  const whyChooseSection = document.querySelector('.why-choose-section');
  
  if (!whyChooseSection) return;

  // Check if GSAP is available for advanced animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    initializeGsapAnimations();
  } else {
    // Fallback to Intersection Observer for animations
    initializeIntersectionAnimations();
  }
}

/**
 * GSAP-based animations with ScrollTrigger
 */
function initializeGsapAnimations() {
  const featureCards = document.querySelectorAll('.feature-card');
  
  gsap.registerPlugin(ScrollTrigger);

  featureCards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        end: 'top 30%',
        scrub: 1,
        markers: false,
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power2.out',
      delay: index * 0.1,
    });
  });
}

/**
 * Intersection Observer fallback for animations
 */
function initializeIntersectionAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 
          `fadeInUp 0.6s ease-out ${entry.target.dataset.delay || '0s'} forwards`;
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card, index) => {
    card.dataset.delay = `${index * 0.1}s`;
    observer.observe(card);
  });
}

/**
 * Enhanced hover effect with mouse tracking
 */
document.addEventListener('mousemove', function(e) {
  const featureCards = document.querySelectorAll('.feature-card');
  
  featureCards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const cardX = rect.left + rect.width / 2;
    const cardY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const angle = Math.atan2(mouseY - cardY, mouseX - cardX);
    
    // Optional: Add subtle light effect on hover
    card.style.setProperty(
      '--mouse-angle',
      `${angle}rad`
    );
  });
});

/* ============================
   COURSES AVAILABLE SECTION - ANIMATIONS
   ============================== */

/**
 * Initialize animations for the Courses Available section
 */
function initializeCoursesAnimations() {
  const coursesSection = document.querySelector('.courses-available-section');
  
  if (!coursesSection) return;

  // Check if GSAP is available for advanced animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    initializeCoursesGsapAnimations();
  } else {
    // Fallback to Intersection Observer for animations
    initializeCoursesIntersectionAnimations();
  }
}

/**
 * GSAP-based animations with ScrollTrigger for courses
 */
function initializeCoursesGsapAnimations() {
  const courseCards = document.querySelectorAll('.course-card');
  
  gsap.registerPlugin(ScrollTrigger);

  courseCards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        end: 'top 30%',
        scrub: 1,
        markers: false,
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power2.out',
      delay: index * 0.08,
    });
  });
}

/**
 * Intersection Observer fallback for courses animations
 */
function initializeCoursesIntersectionAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 
          `fadeInUp 0.6s ease-out ${entry.target.dataset.delay || '0s'} forwards`;
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const courseCards = document.querySelectorAll('.course-card');
  courseCards.forEach((card, index) => {
    card.dataset.delay = `${index * 0.08}s`;
    observer.observe(card);
  });
}

/**
 * Enhanced hover effect with mouse tracking for course cards
 */
document.addEventListener('mousemove', function(e) {
  const courseCards = document.querySelectorAll('.course-card');
  
  courseCards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const cardX = rect.left + rect.width / 2;
    const cardY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const angle = Math.atan2(mouseY - cardY, mouseX - cardX);
    
    card.style.setProperty(
      '--mouse-angle',
      `${angle}rad`
    );
  });
});

// Initialize courses animations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeCoursesAnimations();
});
