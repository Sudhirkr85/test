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


// ========================
// SCROLL ANIMATIONS (CSS + IntersectionObserver — no GSAP)
// ========================
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = { threshold: 0.12 };

  // Fade-up: course cards, FAQ items, map elements, CTA
  const fadeUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("anim-visible");
        fadeUpObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(
    ".course-card, .faq-item, .map-title, .map-subtitle, .map-embed, .map-animate, .cta-content"
  ).forEach(el => {
    el.classList.add("anim-fade-up");
    fadeUpObserver.observe(el);
  });

  // Slide from left
  const slideLeftObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("anim-visible");
        slideLeftObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".left-animate").forEach(el => {
    el.classList.add("anim-slide-left");
    slideLeftObserver.observe(el);
  });

  // Slide from right
  const slideRightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("anim-visible");
        slideRightObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".right-animate").forEach(el => {
    el.classList.add("anim-slide-right");
    slideRightObserver.observe(el);
  });

  // Staggered delays for course cards and FAQ items
  document.querySelectorAll(".course-card").forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.08}s`;
  });
  document.querySelectorAll(".faq-item").forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.06}s`;
  });
  document.querySelectorAll(".map-animate").forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.12}s`;
  });

  // Track scroll direction (used by gallery)
  let lastY = window.pageYOffset || document.documentElement.scrollTop;
  window.scrollDirection = "down";
  window.addEventListener("scroll", () => {
    const y = window.pageYOffset || document.documentElement.scrollTop;
    window.scrollDirection = (y > lastY) ? "down" : "up";
    lastY = y <= 0 ? 0 : y;
  }, { passive: true });

  // Directions button hover — pure CSS now (handled via CSS :hover)
  // Info card border color — pure CSS via CSS :hover
});


// ========================
// LocalBusiness schema helper
// ========================
document.addEventListener('DOMContentLoaded', () => {
  try {
    const ld = document.querySelector('script[type="application/ld+json"]');
    if (!ld) return;
    const json = JSON.parse(ld.textContent);
    window._localBusinessSchema = json;
    document.body.setAttribute('data-schema-loaded', 'localbusiness');
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

  if (!popup || !form) return;

  const homeDemoGrid = form.querySelector(".home-demo-grid");
  const homeDemoMode = form.querySelector(".home-demo-mode");
  const homeDemoMessage = form.querySelector("textarea[name='message']");
  const homeDemoSubmitBtn = form.querySelector(".home-demo-submit");

  const BASE_URL = (window.APP_BASE_URL || "https://sssam.onrender.com").replace(/\/+$/, "");
  const DEMO_ENQUIRY_API_URL = `${BASE_URL}/api/enquiry`;
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
      feedbackTimer = setTimeout(() => { closeFeedbackModal(); }, 3000);
    }
  };

  window.openHomeDemoPopup = openPopup;
  window.closeHomeDemoPopup = closePopup;

  const shouldAutoOpen = popup.dataset.autoOpen !== "false";
  if (shouldAutoOpen) {
    setTimeout(() => { openPopup(); }, 5000);
  }

  if (closeBtn) { closeBtn.addEventListener("click", closePopup); }
  if (feedbackCloseBtn) { feedbackCloseBtn.addEventListener("click", closeFeedbackModal); }

  popup.querySelectorAll("[data-close-popup]").forEach((el) => {
    el.addEventListener("click", closePopup);
  });

  if (feedbackModal) {
    feedbackModal.querySelectorAll("[data-close-feedback]").forEach((el) => {
      el.addEventListener("click", closeFeedbackModal);
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popup.classList.contains("show")) { closePopup(); }
    if (e.key === "Escape" && feedbackModal && feedbackModal.classList.contains("show")) { closeFeedbackModal(); }
  });

  const toggleOtherCourseInput = () => {
    if (!courseSelect || !otherCourseInput) return;
    const isOtherSelected = courseSelect.value === "Other";
    otherCourseInput.classList.toggle("is-hidden", !isOtherSelected);
    otherCourseInput.required = isOtherSelected;
    if (!isOtherSelected) { otherCourseInput.value = ""; }
  };

  if (courseSelect && otherCourseInput) {
    courseSelect.addEventListener("change", toggleOtherCourseInput);
    toggleOtherCourseInput();
  }

  function normalizeDemoType(modeValue) {
    const modeMap = { online: "Online", live: "Live Classes", offline: "Offline (Gurugram)" };
    return modeMap[modeValue] || "";
  }

  async function submitDemoEnquiry(payload) {
    const response = await fetch(DEMO_ENQUIRY_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      let message = "Submission failed. Please try again.";
      try {
        const errorData = await response.json();
        if (errorData && typeof errorData.message === "string" && errorData.message.trim()) {
          message = errorData.message;
        }
      } catch (_err) { }
      throw new Error(message);
    }
    return response;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector(".home-demo-submit");
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Submitting..."; }

    const formData = Object.fromEntries(new FormData(form).entries());
    const phoneNumber = String(formData.phone || "").replace(/\D/g, "");
    const isOthers = formData.course === "Other";
    const customCourseName = isOthers ? String(formData.other_course || "").trim() : "";
    const demoType = normalizeDemoType(String(formData.mode || ""));

    if (!/^\d{10}$/.test(phoneNumber)) {
      if (status) { status.textContent = "Mobile number must be exactly 10 digits."; status.classList.add("error"); }
      showFeedbackModal({ state: "error", title: "Invalid Mobile Number", message: "Please enter a valid 10-digit mobile number.", autoClose: false });
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Submit Enquiry"; }
      return;
    }

    if (isOthers && !customCourseName) {
      if (status) { status.textContent = "Please enter your custom course name."; status.classList.add("error"); }
      showFeedbackModal({ state: "error", title: "Course Required", message: "Please enter your custom course name.", autoClose: false });
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Submit Enquiry"; }
      return;
    }

    if (!demoType) {
      if (status) { status.textContent = "Please select a valid demo type."; status.classList.add("error"); }
      showFeedbackModal({ state: "error", title: "Demo Type Missing", message: "Please select online, live, or offline demo type.", autoClose: false });
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Submit Enquiry"; }
      return;
    }

    const payload = {
      fullName: String(formData.name || "").trim(),
      phoneNumber,
      course: isOthers ? "Others" : String(formData.course || "").trim(),
      customCourseName,
      message: `[Demo Mode: ${demoType}] ` + String(formData.message || "").trim(),
    };

    try {
      await submitDemoEnquiry(payload);
      if (typeof gtag === 'function') {
        gtag('event', 'conversion', { 'send_to': 'AW-18132709725/3nUFCIiP7MMcEN3irMZD' });
      }
      form.reset();
      toggleOtherCourseInput();
      if (status) { status.textContent = "✅ Thank you for your enquiry!\nOur team will contact you shortly."; status.classList.remove("error"); }
      setDemoFormVisible(false);
      successCloseTimer = setTimeout(() => { closePopup(); }, 2500);
    } catch (err) {
      if (status) { status.textContent = err.message || "Submission failed. Please try again."; status.classList.add("error"); }
      showFeedbackModal({ state: "error", title: "Submission Failed", message: err.message || "Submission failed. Please try again.", autoClose: false });
    } finally {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Submit Enquiry"; }
    }
  });
});

// Testimonials Marquee Generator from Students Database
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

  const selectedStudents = [];
  const pool = [...SSSAM_STUDENTS];
  let seed = 999;
  function randomSeeded() {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  for (let i = 0; i < 40; i++) {
    if (pool.length === 0) break;
    const idx = Math.floor(randomSeeded() * pool.length);
    selectedStudents.push(pool.splice(idx, 1)[0]);
  }

  const marqueeWrapper = document.createElement("div");
  marqueeWrapper.className = "testimonials-marquee-wrapper";

  const row1Students = selectedStudents.slice(0, 20);
  const row2Students = selectedStudents.slice(20, 40);

  function createRowHTML(studentsList, isReverse) {
    let rowHTML = `<div class="testimonials-marquee-row${isReverse ? ' reverse' : ''}">`;
    for (let loop = 0; loop < 2; loop++) {
      studentsList.forEach(student => {
        const initial = student.name.charAt(0);
        const reviewText = getReviewText(student.course, student.name);
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

  marqueeWrapper.innerHTML = createRowHTML(row1Students, false) + createRowHTML(row2Students, true);
  container.replaceWith(marqueeWrapper);

  const dots = document.querySelector(".testimonials-dots");
  if (dots) dots.remove();
});
