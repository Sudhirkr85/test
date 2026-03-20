// Simple Carousel Logic
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

if (nextBtn && prevBtn && totalSlides > 0) {
  nextBtn.addEventListener("click", () => {
    changeSlide(currentSlide + 1);
  });

  prevBtn.addEventListener("click", () => {
    changeSlide(currentSlide - 1);
  });

  // Auto Slide
  setInterval(() => {
    changeSlide(currentSlide + 1);
  }, 5000); // every 5 seconds
}

function changeSlide(n) {
  if (!totalSlides) return;
  slides[currentSlide].classList.remove("active");

  currentSlide = (n + totalSlides) % totalSlides;

  slides[currentSlide].classList.add("active");
}


//......................... course section js ........................

document.addEventListener("DOMContentLoaded", () => {
  gsap.to(".course-card", {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.3,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".courses-section",
      start: "top 80%",
      end:"bottom 35%",
      scrub:2
    }
  });
});
// ................why us ??/.....................
gsap.registerPlugin(ScrollTrigger);

// LEFT SIDE ANIMATION
// LEFT cards animation
gsap.utils.toArray(".left-animate").forEach((el) => {
  gsap.fromTo(el,
    { x: -120, opacity: 0 },
    {
      x: 0, opacity: 1, duration: 1, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%",end: "bottom 80%", scrub:true }
    }
  );
});

// RIGHT cards animation
gsap.utils.toArray(".right-animate").forEach((el) => {
  gsap.fromTo(el,
    { x: 120, opacity: 0 },
    {
      x: 0, opacity: 1, duration: 1, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", end: "bottom 80%",scrub:true  }
    }
  );
});



// ...........................galllery section .....................

gsap.registerPlugin(ScrollTrigger);

  // track last known scroll to detect direction
  let lastY = window.pageYOffset || document.documentElement.scrollTop;
  let scrollDirection = "down";

  window.addEventListener("scroll", () => {
    const y = window.pageYOffset || document.documentElement.scrollTop;
    scrollDirection = (y > lastY) ? "down" : "up";
    lastY = y <= 0 ? 0 : y; // avoid negative values on some browsers
  }, { passive: true });

  // function to animate gallery items from a direction
  function animateGallery(dir) {
    const fromX = (dir === "down") ? -120 : 120;
    // reset opacity & position first so animation always plays
    gsap.set(".gallery-img", { opacity: 0, x: fromX });
    gsap.to(".gallery-img", {
      x: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.08
    });
  }

  const gallerySection = document.querySelector("#gallery");
  if (gallerySection) {
    // create a ScrollTrigger for the whole gallery section
    ScrollTrigger.create({
      trigger: "#gallery",
      start: "top 85%",
      end: "bottom 30%",
      onEnter: () => animateGallery(scrollDirection),
      onEnterBack: () => animateGallery(scrollDirection),
      // optional: when leaving, keep items visible (do not hide)
      // onLeave and onLeaveBack left empty so items stay shown once animated
    });

    // Optional: animate once on load if #gallery already in view
    if (gallerySection.getBoundingClientRect().top < window.innerHeight) {
      animateGallery(scrollDirection);
    }
  }



//   ........................................
gsap.registerPlugin(ScrollTrigger);

gsap.from(".cta-content", {
  opacity: 0,
  scale: 0.5,
  duration: 1.2,
  ease: "back.out(1.5)",
  scrollTrigger: {
    trigger: ".cta-section",
    start: "top 80%",
    end:"bottom 60%" ,
    scrub:true
  }
});


// ========================
// FAQ ACCORDION FUNCTIONALITY
// ========================

// Toggle FAQ Item
function toggleFAQ(element) {
  const faqItem = element.parentElement;
  const answer = faqItem.querySelector('.faq-answer');
  const question = element;

  // Close other open FAQs
  document.querySelectorAll('.faq-item').forEach(item => {
    if (item !== faqItem) {
      item.querySelector('.faq-question').classList.remove('active');
      item.querySelector('.faq-answer').classList.remove('active');
    }
  });

  // Toggle current FAQ
  question.classList.toggle('active');
  answer.classList.toggle('active');
}

// Add keyboard support (Enter/Space to toggle)
document.addEventListener('DOMContentLoaded', () => {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.setAttribute('tabindex', '0');
    question.setAttribute('role', 'button');
    
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFAQ(question);
      }
    });
  });

  // Smooth scroll animation for FAQ answers
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.faq-item').forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        end: "bottom 65%",
        scrub: false
      }
    });
  });
});


// ========================
// GOOGLE MAP SECTION ANIMATIONS
// ========================

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  // Map title animation
  gsap.from('.map-title', {
    opacity: 0,
    y: -20,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".map-section",
      start: "top 85%",
      end: "bottom 70%",
      scrub: false
    }
  });

  // Map subtitle animation
  gsap.from('.map-subtitle', {
    opacity: 0,
    y: -15,
    duration: 0.8,
    delay: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".map-section",
      start: "top 85%",
      end: "bottom 70%",
      scrub: false
    }
  });

  // Map embed animation
  gsap.from('.map-embed', {
    opacity: 0,
    scale: 0.95,
    duration: 1,
    ease: "back.out(1.5)",
    scrollTrigger: {
      trigger: ".map-section",
      start: "top 75%",
      end: "bottom 60%",
      scrub: 1
    }
  });

  // Info cards animation
  gsap.utils.toArray('.map-animate').forEach((el, index) => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      delay: index * 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".map-section",
        start: "top 70%",
        end: "bottom 55%",
        scrub: false
      }
    });
  });

  // Directions button hover effect
  const directionsBtn = document.querySelector('.directions-btn');
  if (directionsBtn) {
    directionsBtn.addEventListener('mouseenter', function() {
      gsap.to(this, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    directionsBtn.addEventListener('mouseleave', function() {
      gsap.to(this, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  }

  // Interactive map info cards
  const infoCards = document.querySelectorAll('.info-card');
  infoCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      gsap.to(this, {
        borderLeftColor: '#e0a730',
        duration: 0.3,
        ease: "power2.out"
      });
    });

    card.addEventListener('mouseleave', function() {
      gsap.to(this, {
        borderLeftColor: '#e0a730',
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });
});


// ========================
// LocalBusiness schema helper
// ========================

document.addEventListener('DOMContentLoaded', () => {
  try {
    const ld = document.querySelector('script[type="application/ld+json"]');
    if (!ld) return;

    // parse the JSON-LD safely
    const json = JSON.parse(ld.textContent);

    // expose to window for debugging / analytics
    window._localBusinessSchema = json;

    // mark body with a data attribute so CSS/analytics can pick it up
    document.body.setAttribute('data-schema-loaded', 'localbusiness');

    // optionally add a visually-hidden confirmation node for screen-readers
    const note = document.createElement('div');
    note.className = 'sr-only';
    note.textContent = json.name + ' structured data loaded.';
    document.body.appendChild(note);

    console.info('LocalBusiness schema loaded:', json.name || 'SSSAM Academy');
  } catch (err) {
    console.warn('Failed to parse LocalBusiness schema JSON-LD', err);
  }
});

// ========================
// HOME PAGE DEMO POPUP (5s)
// ========================
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("homeDemoPopup");
  const closeBtn = document.getElementById("homeDemoPopupClose");
  const form = document.getElementById("home-demo-form");
  const status = document.getElementById("home-demo-status");
  const courseSelect = document.getElementById("home-demo-course");
  const otherCourseInput = document.getElementById("home-demo-other-course");

  if (!popup || !form) return;

  const BASE_URL = "https://sssam.onrender.com".replace(/\/+$/, "");
  const DEMO_ENQUIRY_API_URL = `${BASE_URL}/api/enquiry/demo-class`;

  const openPopup = (selectedCourse = "") => {
    if (selectedCourse && courseSelect) {
      courseSelect.value = selectedCourse;
      courseSelect.dispatchEvent(new Event("change"));
    }

    popup.classList.add("show");
    popup.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closePopup = () => {
    popup.classList.remove("show");
    popup.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  window.openHomeDemoPopup = openPopup;
  window.closeHomeDemoPopup = closePopup;

  const shouldAutoOpen = popup.dataset.autoOpen !== "false";
  if (shouldAutoOpen) {
    setTimeout(() => {
      openPopup();
    }, 5000);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closePopup);
  }

  popup.querySelectorAll("[data-close-popup]").forEach((el) => {
    el.addEventListener("click", closePopup);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popup.classList.contains("show")) {
      closePopup();
    }
  });

  const toggleOtherCourseInput = () => {
    if (!courseSelect || !otherCourseInput) return;

    const isOtherSelected = courseSelect.value === "Other";
    otherCourseInput.classList.toggle("is-hidden", !isOtherSelected);
    otherCourseInput.required = isOtherSelected;

    if (!isOtherSelected) {
      otherCourseInput.value = "";
    }
  };

  if (courseSelect && otherCourseInput) {
    courseSelect.addEventListener("change", toggleOtherCourseInput);
    toggleOtherCourseInput();
  }

  function normalizeDemoType(modeValue) {
    const modeMap = {
      online: "Online",
      live: "Live Classes",
      offline: "Offline (Gurugram)",
    };

    return modeMap[modeValue] || "";
  }

  async function submitDemoEnquiry(payload) {
    const response = await fetch(DEMO_ENQUIRY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let message = "Submission failed. Please try again.";

      try {
        const errorData = await response.json();
        if (errorData && typeof errorData.message === "string" && errorData.message.trim()) {
          message = errorData.message;
        }
      } catch (_err) {
        // Ignore JSON parse errors and keep fallback message.
      }

      throw new Error(message);
    }

    return response;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector(".home-demo-submit");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting...";
    }

    const formData = Object.fromEntries(new FormData(form).entries());
    const phoneNumber = String(formData.phone || "").replace(/\D/g, "");
    const isOthers = formData.course === "Other";
    const customCourseName = isOthers ? String(formData.other_course || "").trim() : "";
    const demoType = normalizeDemoType(String(formData.mode || ""));

    if (!/^\d{10}$/.test(phoneNumber)) {
      if (status) {
        status.textContent = "Mobile number must be exactly 10 digits.";
        status.classList.add("error");
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Book Free Demo Class";
      }
      return;
    }

    if (isOthers && !customCourseName) {
      if (status) {
        status.textContent = "Please enter your custom course name.";
        status.classList.add("error");
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Book Free Demo Class";
      }
      return;
    }

    if (!demoType) {
      if (status) {
        status.textContent = "Please select a valid demo type.";
        status.classList.add("error");
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Book Free Demo Class";
      }
      return;
    }

    const payload = {
      fullName: String(formData.name || "").trim(),
      phoneNumber,
      course: isOthers ? "Others" : String(formData.course || "").trim(),
      customCourseName,
      demoType,
      message: String(formData.message || "").trim(),
    };

    try {
      await submitDemoEnquiry(payload);
      form.reset();
      toggleOtherCourseInput();

      if (status) {
        status.textContent = "Thanks! Your demo request has been submitted.";
        status.classList.remove("error");
      }

      setTimeout(() => {
        closePopup();
      }, 900);
    } catch (err) {
      if (status) {
        status.textContent = err.message || "Submission failed. Please try again.";
        status.classList.add("error");
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Book Free Demo Class";
      }
    }
  });
});
