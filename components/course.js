/* ===== COURSE PAGE JAVASCRIPT ===== */

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  initializeCarousel();
  initializeHeroButtons();
  initializeFAQ();
  initializeButtons();
  setupScrollAnimations();
});

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
