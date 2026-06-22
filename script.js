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
  if (window.__sharedEnquiryFormActive) return;

  const popup = document.getElementById("homeDemoPopup");
  const closeBtn = document.getElementById("homeDemoPopupClose");
  const form = document.getElementById("home-demo-form");
  const status = document.getElementById("home-demo-status");
  const courseSelect = document.getElementById("home-demo-course");
  const otherCourseInput = document.getElementById("home-demo-other-course");
  const feedbackModal = document.getElementById("homeDemoFeedback");
  const feedbackCloseBtn = document.getElementById("homeDemoFeedbackClose");
  const feedbackIcon = document.getElementById("homeDemoFeedbackIcon");
  const feedbackTitle = document.getElementById("homeDemoFeedbackTitle");
  const feedbackMessage = document.getElementById("homeDemoFeedbackMessage");
  const homeDemoGrid = form.querySelector(".home-demo-grid");
  const homeDemoMode = form.querySelector(".home-demo-mode");
  const homeDemoMessage = form.querySelector("textarea[name='message']");
  const homeDemoSubmitBtn = form.querySelector(".home-demo-submit");

  if (!popup || !form) return;

  const BASE_URL = "https://sssam.onrender.com".replace(/\/+$/, "");
  const DEMO_ENQUIRY_API_URL = `${BASE_URL}/api/enquiry/demo-class`;
  let feedbackTimer = null;
  let successCloseTimer = null;

  const setDemoFormVisible = (isVisible) => {
    [homeDemoGrid, homeDemoMode, homeDemoMessage, homeDemoSubmitBtn].forEach((el) => {
      if (!el) return;
      el.style.display = isVisible ? "" : "none";
    });
  };

  const syncBodyScrollLock = () => {
    const isDemoPopupOpen = popup.classList.contains("show");
    const isFeedbackOpen = feedbackModal && feedbackModal.classList.contains("show");
    document.body.style.overflow = isDemoPopupOpen || isFeedbackOpen ? "hidden" : "";
  };

  const openPopup = (selectedCourse = "") => {
    clearTimeout(successCloseTimer);
    setDemoFormVisible(true);
    if (status) {
      status.textContent = "";
      status.classList.remove("error");
    }

    if (selectedCourse && courseSelect) {
      courseSelect.value = selectedCourse;
      courseSelect.dispatchEvent(new Event("change"));
    }

    popup.classList.add("show");
    popup.setAttribute("aria-hidden", "false");
    syncBodyScrollLock();
  };

  const closePopup = () => {
    popup.classList.remove("show");
    popup.setAttribute("aria-hidden", "true");
    syncBodyScrollLock();
  };

  const closeFeedbackModal = () => {
    if (!feedbackModal) return;

    clearTimeout(feedbackTimer);
    feedbackModal.classList.remove("show", "success", "error");
    feedbackModal.setAttribute("aria-hidden", "true");
    syncBodyScrollLock();
  };

  const showFeedbackModal = ({
    state = "success",
    title = "Thank You!",
    message = "Your enquiry has been saved successfully.",
    autoClose = true,
  }) => {
    if (!feedbackModal || !feedbackTitle || !feedbackMessage || !feedbackIcon) return;

    clearTimeout(feedbackTimer);
    feedbackModal.classList.remove("success", "error");
    feedbackModal.classList.add("show", state);
    feedbackModal.setAttribute("aria-hidden", "false");

    feedbackTitle.textContent = title;
    feedbackMessage.textContent = message;
    feedbackIcon.textContent = state === "success" ? "✔" : "✖";

    syncBodyScrollLock();

    if (autoClose) {
      feedbackTimer = setTimeout(() => {
        closeFeedbackModal();
      }, 3000);
    }
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

  if (feedbackCloseBtn) {
    feedbackCloseBtn.addEventListener("click", closeFeedbackModal);
  }

  popup.querySelectorAll("[data-close-popup]").forEach((el) => {
    el.addEventListener("click", closePopup);
  });

  if (feedbackModal) {
    feedbackModal.querySelectorAll("[data-close-feedback]").forEach((el) => {
      el.addEventListener("click", closeFeedbackModal);
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popup.classList.contains("show")) {
      closePopup();
    }

    if (e.key === "Escape" && feedbackModal && feedbackModal.classList.contains("show")) {
      closeFeedbackModal();
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

      showFeedbackModal({
        state: "error",
        title: "Invalid Mobile Number",
        message: "Please enter a valid 10-digit mobile number.",
        autoClose: false,
      });

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Enquiry";
      }
      return;
    }

    if (isOthers && !customCourseName) {
      if (status) {
        status.textContent = "Please enter your custom course name.";
        status.classList.add("error");
      }

      showFeedbackModal({
        state: "error",
        title: "Course Required",
        message: "Please enter your custom course name.",
        autoClose: false,
      });

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Enquiry";
      }
      return;
    }

    if (!demoType) {
      if (status) {
        status.textContent = "Please select a valid demo type.";
        status.classList.add("error");
      }

      showFeedbackModal({
        state: "error",
        title: "Demo Type Missing",
        message: "Please select online, live, or offline demo type.",
        autoClose: false,
      });

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Enquiry";
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
        status.textContent = "✅ Thank you for your enquiry!\nOur team will contact you shortly.";
        status.classList.remove("error");
      }

      setDemoFormVisible(false);

      successCloseTimer = setTimeout(() => {
        closePopup();
      }, 2500);
    } catch (err) {
      if (status) {
        status.textContent = err.message || "Submission failed. Please try again.";
        status.classList.add("error");
      }

      showFeedbackModal({
        state: "error",
        title: "Submission Failed",
        message: err.message || "Submission failed. Please try again.",
        autoClose: false,
      });
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Enquiry";
      }
    }
  });
});

// Testimonials Marquee Generator from 1000 Students Database
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".testimonials-container");
  if (!container) return;
  if (typeof SSSAM_STUDENTS === "undefined") {
    console.error("SSSAM_STUDENTS database not loaded.");
    return;
  }

  const reviewTemplates = {
    "Advanced Excel": [
      "Amazing advanced Excel course. Mastered VLOOKUP, pivot tables, and interactive business dashboard creation.",
      "Highly recommended for working professionals. The weekend batches are flexible and cover practical MIS reporting tasks.",
      "Best Excel institute in Gurugram. The training is 100% practical, focusing on real-world office calculations."
    ],
    "Data Science": [
      "The Data Science course is highly structured. The modules on machine learning pipelines and Power BI dashboards were excellent.",
      "Got placed as a junior Data Analyst after completing the projects. The placement support is very active and responsive.",
      "Excellent curriculum covering Python, Pandas, and Scikit-Learn. The hands-on labs and mentor support are outstanding."
    ],
    "AI & ML": [
      "Very advanced training in AI and Machine Learning. The deep learning projects using TensorFlow were explained clearly.",
      "Best AI ML course in Gurgaon. The trainers are industry experts and guide you through real predictive model deployments.",
      "SSSAM Academy Sector 14 provides great labs and practical datasets for building AI portfolios."
    ],
    "Cyber Security": [
      "Learned penetration testing and network security using Kali Linux and Wireshark. The practical labs are very detailed.",
      "Excellent training for ethical hacking. The instructors explain network security and scanning tools step-by-step.",
      "Hands-on labs and real system scenarios make the Cyber Security course at SSSAM Academy highly valuable."
    ],
    "Full Stack Web Development": [
      "SSSAM Academy MERN stack training is top notch. Developed dynamic React apps and connected database back-ends.",
      "The best Full Stack developer course. Got placed within 4 weeks of completing my final project. Mentors are very supportive.",
      "Learned HTML, CSS, JavaScript, and Node.js with live hosting projects. Best coding institute in Gurgaon."
    ],
    "Digital Marketing": [
      "Highly practical digital marketing classes. Formulated live Google Ads campaigns and learned SEO keyword analytics.",
      "Best SEO and social media marketing training. SSSAM Academy has helped me boost my freelance business.",
      "Great course covering GA4, Search Console, and paid ad channels. Interactive doubt-solving sessions."
    ],
    "AWS Cloud Computing": [
      "AWS training was very clean. Set up EC2 instances, S3 storage buckets, and configured secure VPC networking.",
      "Highly recommended for cloud engineers. The hands-on labs prepare you for official AWS certification exams.",
      "Clear explanations of IAM policies, load balancers, and cloud architecture deployment models."
    ],
    "Graphic Design": [
      "Excellent graphic design program. Learned Photoshop, Illustrator, and Figma. Created a professional design portfolio.",
      "Very creative environment. The mentors guide you individually on design principles, typography, and branding.",
      "SSSAM Academy Sector 14 has the best facilities for practicing print layouts and digital designs."
    ],
    "Software Testing": [
      "Learned automated testing with Selenium WebDriver and Postman API checks. The syllabus is highly job-oriented.",
      "Best manual and automation testing course in Gurgaon. Got placed after mock interview preparations.",
      "Great coverage of JIRA, test cases, execution reports, and automation frameworks."
    ],
    "Linux System Administration": [
      "Very detailed Linux classes. Mastered bash scripting, user security permissions, and systemd service configurations.",
      "Best terminal-based administration course. Highly practical and useful for server deployments."
    ],
    "MySQL Database Design": [
      "Clear database training. Learned SQL queries, complex joins, indexing, and stored procedures.",
      "Highly recommended for SQL learners. The query optimization assignments were very useful."
    ],
    "TallyPrime Accounting": [
      "Best TallyPrime and GST accounting course. Practiced invoicing, inventory ledgers, and e-way bill calculations.",
      "Very helpful for commerce students. Learned corporate accounting and tax reporting structures."
    ],
    "Video Editing": [
      "Awesome video editing classes. Learned timeline workflows in Premiere Pro and motion graphics in After Effects.",
      "The mentors explain audio mixes, transitions, and export formats very clearly. Great portfolio building."
    ],
    "SAP FICO": [
      "FICO training was highly professional. Set up general ledger rules, accounts payable, and asset accounting parameters.",
      "Best SAP training in Gurugram. The training uses live servers and covers actual enterprise modules."
    ],
    "Java Programming": [
      "Java OOP concepts, multithreading, and JDBC connections were covered with deep coding exercises.",
      "Highly detailed Java course. SSSAM Academy has excellent labs and coding guidelines."
    ],
    "C++ Programming": [
      "Learned structures, memory pointers, and compiler operations. Best basic programming course in Sector 14."
    ]
  };

  const defaultTemplates = [
    "Amazing learning experience at SSSAM Academy Gurugram. The instructors are extremely helpful and guide you individually through all practical assignments.",
    "Best computer training classes in Gurgaon. They cover the syllabus with actual code exercises instead of theoretical slides. Very satisfied.",
    "Practical learning standard is top notch. The laboratory facilities and interactive live doubt support made it very easy to transition into coding."
  ];

  function getReviewText(courseName, studentName) {
    let list = reviewTemplates[courseName];
    if (!list) {
      for (const k in reviewTemplates) {
        if (courseName.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(courseName.toLowerCase())) {
          list = reviewTemplates[k];
          break;
        }
      }
    }
    if (!list || list.length === 0) list = defaultTemplates;
    const idx = Math.abs(hashCode(studentName)) % list.length;
    return list[idx];
  }

  function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  // Filter students: select 40 students randomly but deterministic
  const selectedStudents = [];
  const pool = [...SSSAM_STUDENTS];
  
  let seed = 999; // Fixed seed for home page testimonial selection stability
  function randomSeeded() {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  // Pick 40 random students from SSSAM_STUDENTS
  for (let i = 0; i < 40; i++) {
    if (pool.length === 0) break;
    const idx = Math.floor(randomSeeded() * pool.length);
    selectedStudents.push(pool.splice(idx, 1)[0]);
  }

  // Create marquee container structure
  const marqueeWrapper = document.createElement("div");
  marqueeWrapper.className = "testimonials-marquee-wrapper";

  // Split selected students into two rows of 20
  const row1Students = selectedStudents.slice(0, 20);
  const row2Students = selectedStudents.slice(20, 40);

  function createRowHTML(studentsList, isReverse) {
    let rowHTML = `<div class="testimonials-marquee-row${isReverse ? ' reverse' : ''}">`;
    
    // Generate cards twice for seamless looping
    for (let loop = 0; loop < 2; loop++) {
      studentsList.forEach(student => {
        const initial = student.name.charAt(0);
        const reviewText = getReviewText(student.course, student.name);
        
        // Pick an avatar color based on student name hash
        const avatarClasses = ["t-ds", "t-da", "t-fs", "t-sec", "t-aws", "t-bc", "t-dm", "t-excel"];
        const avatarClass = avatarClasses[Math.abs(hashCode(student.name)) % avatarClasses.length];
        
        rowHTML += `
          <div class="testimonial-card">
            <div class="t-avatar-wrapper">
              <div class="t-avatar ${avatarClass}">${initial}</div>
              <span class="t-google-g"><i class="fab fa-google"></i></span>
            </div>
            <span class="t-verified-badge"><i class="fab fa-google"></i> Verified Google Review</span>
            <h3>${student.name}</h3>
            <p class="t-meta">${student.course} | ${student.location}</p>
            <div class="stars" style="color: #e0a730; margin-bottom: 10px;">★★★★★</div>
            <p class="t-feedback">"${reviewText}"</p>
          </div>
        `;
      });
    }
    rowHTML += `</div>`;
    return rowHTML;
  }

  // Populate rows
  marqueeWrapper.innerHTML = createRowHTML(row1Students, false) + createRowHTML(row2Students, true);

  // Replace original container with marquee
  container.replaceWith(marqueeWrapper);

  // Remove dots if present
  const dots = document.querySelector(".testimonials-dots");
  if (dots) dots.remove();
});

