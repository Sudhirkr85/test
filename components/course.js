/* ===== COURSE PAGE JAVASCRIPT ===== */

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  initializeCarousel();
  initializeHeroButtons();
  initializeFAQ();
  initializeButtons();
  setupScrollAnimations();
  initializeTestimonialsCarousel();
  initializeSyllabusAccordion();
});

/**
 * Syllabus Accordion (used on new lightweight course pages)
 * Toggles .accordion-content open/close when .accordion-header is clicked
 */
function initializeSyllabusAccordion() {
  const headers = document.querySelectorAll('.accordion-header');
  if (!headers.length) return;

  headers.forEach(function(header) {
    header.addEventListener('click', function() {
      const item = this.closest('.accordion-item');
      const isOpen = item.classList.contains('open');

      // Close all other items
      document.querySelectorAll('.accordion-item.open').forEach(function(openItem) {
        if (openItem !== item) {
          openItem.classList.remove('open');
          const icon = openItem.querySelector('.accordion-icon');
          if (icon) icon.style.transform = 'rotate(0deg)';
        }
      });

      // Toggle current item
      item.classList.toggle('open', !isOpen);
      const icon = this.querySelector('.accordion-icon');
      if (icon) icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
    });
  });
}

/**
 * Initialize Carousel Slider
 */
function initializeCarousel() {
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let currentSlide = 0;

  function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[n].classList.add('active');
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
  }

  // Auto-advance slides every 8 seconds
  setInterval(nextSlide, 8000);
}

/**
 * Initialize Hero Section Buttons
 */
function initializeHeroButtons() {
  const demoBtn = document.getElementById('demoBtn');
  const callBtn = document.getElementById('callBtn');
  const whyCTADemo = document.getElementById('whyCTADemo');
  const academyCTADemo = document.getElementById('academyCTADemo');
  const curriculumCTADemo = document.getElementById('curriculumCTADemo');
  const toolsCTADemo = document.getElementById('toolsCTADemo');
  const projectsCTADemo = document.getElementById('projectsCTADemo');
  const finalDemoBtn = document.getElementById('finalDemoBtn');

  if (demoBtn) {
    demoBtn.addEventListener('click', function() {
      bookDemoSession();
    });
  }

  if (callBtn) {
    callBtn.addEventListener('click', function() {
      callNow();
    });
  }

  if (whyCTADemo) {
    whyCTADemo.addEventListener('click', function() {
      bookDemoSession();
    });
  }

  if (academyCTADemo) {
    academyCTADemo.addEventListener('click', function() {
      bookDemoSession();
    });
  }

  if (curriculumCTADemo) {
    curriculumCTADemo.addEventListener('click', function() {
      bookDemoSession();
    });
  }

  if (toolsCTADemo) {
    toolsCTADemo.addEventListener('click', function() {
      bookDemoSession();
    });
  }

  if (projectsCTADemo) {
    projectsCTADemo.addEventListener('click', function() {
      bookDemoSession();
    });
  }

  if (finalDemoBtn) {
    finalDemoBtn.addEventListener('click', function() {
      bookDemoSession();
    });
  }
}

/**
 * Book Free Demo
 */
function bookDemoSession() {
  const demoData = {
    course: 'Data Science',
    action: 'book_demo',
    timestamp: new Date().toISOString()
  };

  localStorage.setItem('demoBooking', JSON.stringify(demoData));
  showToast('Demo session request sent! We will contact you soon.', 'success');

  trackEvent('hero_demo_click', {
    course: 'Data Science'
  });

  setTimeout(() => {
    window.location.href = 'contact.html?type=demo&course=data-science';
  }, 2000);
}

/**
 * Call Now
 */
function callNow() {
  const phoneNumber = '919217031899';
  
  trackEvent('hero_call_click', {
    course: 'Data Science'
  });

  // For mobile devices
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.location.href = `tel:+${phoneNumber}`;
  } else {
    // For desktop, show a message
    showToast('📞 Phone: +91 9217031899', 'info');
  }
}



/**
 * Initialize FAQ Accordion
 */
function initializeFAQ() {
  const faqButtons = document.querySelectorAll('.faq-btn');

  faqButtons.forEach(button => {
    button.addEventListener('click', function() {
      const faqItem = this.closest('.faq-item');
      
      // Close other FAQs
      document.querySelectorAll('.faq-item.active').forEach(item => {
        if (item !== faqItem) {
          item.classList.remove('active');
        }
      });

      // Toggle current FAQ
      faqItem.classList.toggle('active');
    });
  });
}

/**
 * Initialize Button Actions
 */
function initializeButtons() {
  const enrollBtn = document.getElementById('enrollBtn');
  const contactBtn = document.getElementById('contactBtn');

  if (enrollBtn) {
    enrollBtn.addEventListener('click', handleEnrollment);
  }

  if (contactBtn) {
    contactBtn.addEventListener('click', handleContact);
  }
}

/**
 * Handle Enrollment
 */
function handleEnrollment() {
  const enrollmentData = {
    course: 'Data Science',
    level: 'Intermediate',
    price: '₹8,999',
    date: new Date().toISOString()
  };

  localStorage.setItem('courseEnrollment', JSON.stringify(enrollmentData));
  showToast('Great! Redirecting to enrollment page...', 'success');

  setTimeout(() => {
    window.location.href = '/contact.html?course=data-science';
  }, 1500);
}

/**
 * Handle Contact
 */
function handleContact() {
  const contactData = {
    course: 'Data Science',
    date: new Date().toISOString()
  };

  localStorage.setItem('courseInquiry', JSON.stringify(contactData));
  showToast('Redirecting to contact page...', 'info');

  setTimeout(() => {
    window.location.href = 'contact.html?course=data-science';
  }, 1500);
}

/**
 * Show Toast Notification
 */
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  // Add styles if not already added
  if (!document.querySelector('[data-toast-styles]')) {
    const style = document.createElement('style');
    style.setAttribute('data-toast-styles', 'true');
    style.textContent = `
      .toast {
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 14px 20px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        animation: toastSlideIn 0.3s ease, toastSlideOut 0.3s ease 2.7s;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      }

      .toast-success {
        background: #4CAF50;
        color: white;
      }

      .toast-info {
        background: #2196F3;
        color: white;
      }

      .toast-error {
        background: #f44336;
        color: white;
      }

      @keyframes toastSlideIn {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @keyframes toastSlideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(400px);
          opacity: 0;
        }
      }

      @media (max-width: 480px) {
        .toast {
          bottom: 20px;
          right: 20px;
          left: 20px;
          max-width: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

/**
 * Setup Scroll Animations
 */
function setupScrollAnimations() {
  // Add fade-in animation to modules on scroll
  const modules = document.querySelectorAll('.module');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  modules.forEach(module => {
    module.style.opacity = '0';
    module.style.transform = 'translateY(20px)';
    module.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(module);
  });
}

/**
 * Track Analytics Events
 */
function trackEvent(eventName, eventData = {}) {
  console.log(`Event: ${eventName}`, eventData);
  
  // Integration with Google Analytics (if available)
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, eventData);
  }
}

// Track page view
trackEvent('course_page_view', {
  course: 'Data Science',
  timestamp: new Date().toISOString()
});

// Export functions globally
window.coursePageFunctions = {
  handleEnrollment,
  handleContact,
  showToast,
  trackEvent
};

/**
 * Testimonials Carousel Dots & Seamless Infinite Loop Navigation
 */
function initializeTestimonialsCarousel() {
  const container = document.querySelector(".testimonials-container");
  if (!container) return;
  const originalCards = Array.from(container.querySelectorAll(".testimonial-card"));
  if (originalCards.length === 0) return;

  // Clone first 3 cards and append to the end for seamless infinite scroll
  const cloneCount = Math.min(3, originalCards.length);
  for (let i = 0; i < cloneCount; i++) {
    const clone = originalCards[i].cloneNode(true);
    clone.classList.add("t-clone");
    container.appendChild(clone);
  }

  // Create dots container based on original cards
  const dotsContainer = document.createElement("div");
  dotsContainer.className = "testimonials-dots";
  container.after(dotsContainer);

  const allCards = container.querySelectorAll(".testimonial-card");
  let currentActive = 0;
  let autoScrollTimer = null;
  let isJumping = false;

  // Generate dots (only for original cards)
  originalCards.forEach((_, idx) => {
    const dot = document.createElement("span");
    dot.className = "t-dot" + (idx === 0 ? " active" : "");
    dot.setAttribute("aria-label", `Go to slide ${idx + 1}`);
    dot.addEventListener("click", () => {
      resetAutoScroll();
      container.scrollTo({
        left: originalCards[idx].offsetLeft - container.offsetLeft,
        behavior: "smooth"
      });
    });
    dotsContainer.appendChild(dot);
  });

  // Sync dots and handle instant boundary reset
  container.addEventListener("scroll", () => {
    if (isJumping) return;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;
    const scrollWidth = container.scrollWidth;

    let activeIdx = 0;
    let minDiff = Infinity;
    
    // Find closest card to sync active index (only matching original cards indices)
    originalCards.forEach((card, idx) => {
      const cardOffset = card.offsetLeft - container.offsetLeft;
      const diff = Math.abs(cardOffset - scrollLeft);
      if (diff < minDiff) {
        minDiff = diff;
        activeIdx = idx;
      }
    });

    currentActive = activeIdx;

    const dots = dotsContainer.querySelectorAll(".t-dot");
    dots.forEach((dot, idx) => {
      if (idx === activeIdx) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });

    // Seamless wrap-around logic
    if (scrollLeft >= scrollWidth - containerWidth - 10) {
      isJumping = true;
      container.style.scrollBehavior = "auto";
      container.scrollLeft = 0;
      container.style.scrollBehavior = "smooth";
      currentActive = 0;
      setTimeout(() => { isJumping = false; }, 50);
    }
  }, { passive: true });

  // Auto scroll logic
  function startAutoScroll() {
    autoScrollTimer = setInterval(() => {
      if (isJumping) return;
      currentActive++;
      if (currentActive >= allCards.length) {
        currentActive = 0;
      }
      if (allCards[currentActive]) {
        container.scrollTo({
          left: allCards[currentActive].offsetLeft - container.offsetLeft,
          behavior: "smooth"
        });
      }
    }, 3000);
  }

  function resetAutoScroll() {
    clearInterval(autoScrollTimer);
    startAutoScroll();
  }

  startAutoScroll();

  container.addEventListener("touchstart", () => clearInterval(autoScrollTimer), { passive: true });
  container.addEventListener("touchend", startAutoScroll, { passive: true });
  container.addEventListener("mousedown", () => clearInterval(autoScrollTimer));
  container.addEventListener("mouseup", startAutoScroll);
}

