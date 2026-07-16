document.addEventListener("DOMContentLoaded", () => {

gsap.from(".story-image img", {
  opacity: 0,
  x: -100,
  duration: 1,
  scrollTrigger: {
    trigger: ".our-story",
    start: "top 80%",
    end: "bottom 60%",
    scrub: 2
  }
});

gsap.from(".story-text", {
  opacity: 0,
  x: 100,
  duration: 1,
  scrollTrigger: {
    trigger: ".our-story",
    start: "top 80%",
    end: "bottom 60%",
    scrub: 2
  }
});



gsap.registerPlugin(ScrollTrigger);

// Left card animation
gsap.utils.toArray(".left-animate").forEach((el) => {
  gsap.fromTo(el, 
    { y: 50, opacity: 0 }, 
    { 
      y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none"
      }
    }
  );
});

// Right card animation
gsap.utils.toArray(".right-animate").forEach((el) => {
  gsap.fromTo(el, 
    { y: 50, opacity: 0 }, 
    { 
      y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none"
      }
    }
  );
});

// Up card animation
gsap.utils.toArray(".up-animate").forEach((el) => {
  gsap.fromTo(el, 
    { y: 50, opacity: 0 }, 
    { 
      y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none"
      }
    }
  );
});

// Courses section animations
gsap.registerPlugin(ScrollTrigger);

// Animate course cards on scroll
gsap.utils.toArray(".course-card").forEach((card, index) => {
  gsap.to(card, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    delay: index * 0.1,
    scrollTrigger: {
      trigger: ".courses-listing",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });
});

// Course card hover effect
const courseCards = document.querySelectorAll(".course-card");
courseCards.forEach((card) => {
  card.addEventListener("mouseenter", function() {
    gsap.to(this, {
      duration: 0.3,
      boxShadow: "0 15px 40px rgba(224, 167, 48, 0.3)",
      y: -15
    });
  });

  card.addEventListener("mouseleave", function() {
    gsap.to(this, {
      duration: 0.3,
      boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
      y: 0
    });
  });
});

// Courses heading animation
gsap.from(".courses-heading", {
  opacity: 0,
  y: -30,
  duration: 0.8,
  scrollTrigger: {
    trigger: ".courses-listing",
    start: "top 85%",
    toggleActions: "play none none none"
  }
});

// Courses intro animation
gsap.from(".courses-intro", {
  opacity: 0,
  y: 20,
  duration: 0.8,
  delay: 0.2,
  scrollTrigger: {
    trigger: ".courses-listing",
    start: "top 85%",
    toggleActions: "play none none none"
  }
});

// Courses closing animation
gsap.from(".courses-closing", {
  opacity: 0,
  y: 20,
  duration: 0.8,
  scrollTrigger: {
    trigger: ".courses-listing",
    start: "top 50%",
    toggleActions: "play none none none"
  }
});

// Offline & Online training section animation
gsap.from(".training-mode-title", {
  opacity: 0,
  y: 20,
  duration: 0.8,
  stagger: 0.15,
  scrollTrigger: {
    trigger: ".training-modes",
    start: "top 85%",
    toggleActions: "play none none none"
  }
});

gsap.from(".training-mode-text", {
  opacity: 0,
  y: 20,
  duration: 0.8,
  stagger: 0.15,
  scrollTrigger: {
    trigger: ".training-modes",
    start: "top 82%",
    toggleActions: "play none none none"
  }
});

gsap.to(".training-mode-item", {
  opacity: 1,
  y: 0,
  duration: 0.7,
  stagger: 0.12,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".training-modes",
    start: "top 80%",
    toggleActions: "play none none none"
  }
});

// Location & Accessibility section animation
gsap.from(".location-title", {
  opacity: 0,
  y: -24,
  duration: 0.8,
  scrollTrigger: {
    trigger: ".location-accessibility",
    start: "top 85%",
    toggleActions: "play none none none"
  }
});

gsap.from(".location-intro", {
  opacity: 0,
  y: 20,
  duration: 0.8,
  scrollTrigger: {
    trigger: ".location-accessibility",
    start: "top 82%",
    toggleActions: "play none none none"
  }
});

gsap.to(".location-card", {
  opacity: 1,
  y: 0,
  duration: 0.7,
  stagger: 0.14,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".location-accessibility",
    start: "top 80%",
    toggleActions: "play none none none"
  }
});

gsap.to(".location-map-wrap", {
  opacity: 1,
  y: 0,
  duration: 0.9,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".location-map-wrap",
    start: "top 88%",
    toggleActions: "play none none none"
  }
});

// CTA section animations
gsap.from(".career-cta-title", {
  opacity: 0,
  y: -24,
  duration: 0.8,
  scrollTrigger: {
    trigger: ".career-cta",
    start: "top 85%",
    toggleActions: "play none none none"
  }
});

gsap.from(".career-cta-text", {
  opacity: 0,
  y: 20,
  duration: 0.8,
  scrollTrigger: {
    trigger: ".career-cta",
    start: "top 82%",
    toggleActions: "play none none none"
  }
});

gsap.from(".career-cta-actions .career-cta-btn", {
  opacity: 0,
  y: 16,
  duration: 0.6,
  stagger: 0.1,
  scrollTrigger: {
    trigger: ".career-cta-actions",
    start: "top 88%",
    toggleActions: "play none none none"
  }
});

gsap.from(".demo-form-wrap", {
  opacity: 0,
  y: 24,
  duration: 0.85,
  scrollTrigger: {
    trigger: ".demo-form-wrap",
    start: "top 88%",
    toggleActions: "play none none none"
  }
});

const demoDateSelect = document.getElementById("demo-date");
if (demoDateSelect) {
  const formatter = new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);

    const yyyy = nextDate.getFullYear();
    const mm = String(nextDate.getMonth() + 1).padStart(2, "0");
    const dd = String(nextDate.getDate()).padStart(2, "0");
    const isoDate = `${yyyy}-${mm}-${dd}`;

    const option = document.createElement("option");
    option.value = isoDate;
    option.textContent = formatter.format(nextDate);
    demoDateSelect.appendChild(option);
  }
}

const demoForm = document.getElementById("demo-booking-form");
const demoFormStatus = document.getElementById("demo-form-status");

if (demoForm) {
  demoForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = demoForm.querySelector(".demo-submit");
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";
    }

    if (demoFormStatus) {
      demoFormStatus.textContent = "";
      demoFormStatus.classList.remove("error");
    }

    const formData = new FormData(demoForm);
    const fullName = String(formData.get("name") || "").trim();
    const phoneNumber = String(formData.get("phone") || "").replace(/\D/g, "");
    const email = String(formData.get("email") || "").trim();
    const course = String(formData.get("course") || "").trim();

    if (!fullName) {
      if (demoFormStatus) {
        demoFormStatus.textContent = "Full name is required.";
        demoFormStatus.classList.add("error");
      }
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Get Free Counseling 🎓";
      }
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      if (demoFormStatus) {
        demoFormStatus.textContent = "Mobile number must be exactly 10 digits.";
        demoFormStatus.classList.add("error");
      }
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Get Free Counseling 🎓";
      }
      return;
    }

    if (!course) {
      if (demoFormStatus) {
        demoFormStatus.textContent = "Please select a course.";
        demoFormStatus.classList.add("error");
      }
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Get Free Counseling 🎓";
      }
      return;
    }

    const payload = {
      fullName,
      phoneNumber,
      email: email || null,
      course,
      customCourseName: "",
      message: "Counseling Lead from About page"
    };

    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const BASE_URL = isLocal ? `${window.location.protocol}//${window.location.hostname}:5000` : 'https://sssam.onrender.com';

    try {
      const response = await fetch(`${BASE_URL}/api/enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let msg = "Submission failed. Please try again.";
        try {
          const errorData = await response.json();
          if (errorData && typeof errorData.message === "string" && errorData.message.trim()) {
            msg = errorData.message;
          }
        } catch (_e) {}
        throw new Error(msg);
      }

      if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
          'send_to': 'AW-18132709725/3nUFCIiP7MMcEN3irMZD'
        });
      }

      demoForm.reset();

      if (demoFormStatus) {
        demoFormStatus.textContent = "✅ Thanks! Your counseling request was submitted successfully. Our team will contact you shortly.";
        demoFormStatus.classList.remove("error");
      }
    } catch (error) {
      if (demoFormStatus) {
        demoFormStatus.textContent = error.message || "Submission failed. Please try again.";
        demoFormStatus.classList.add("error");
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Get Free Counseling 🎓";
      }
    }
  });
}


  // SEARCHABLE COURSE DROPDOWN LOGIC FOR ABOUT PAGE FORM
  const ABOUT_COURSES = [
    "Data Science",
    "Data Analytics + Power BI",
    "AI & Machine Learning",
    "Full Stack Development with AI",
    "Ethical Hacking & Cyber Security",
    "Digital Marketing & SEO",
    "AWS Cloud Computing",
    "Basic Computer Course"
  ];

  let aboutSelected = "";

  function aboutRenderList(list) {
    const dd = document.getElementById("about-course-dd");
    if (!dd) return;
    dd.innerHTML = "";

    if (list.length === 0) {
      dd.style.display = "none";
      return;
    }

    list.forEach(function(course) {
      const item = document.createElement("div");
      item.textContent = course;
      item.style.cssText = "padding:10px 14px; cursor:pointer; color:#eee;" +
        "font-size:0.9rem; border-bottom:1px solid #333; transition:background 0.15s;";
      item.onmouseenter = function() { this.style.background = "#2a2a2a"; };
      item.onmouseleave = function() { this.style.background = "transparent"; };
      item.onmousedown = function(e) {
        e.preventDefault();
        aboutPickCourse(course);
      };
      dd.appendChild(item);
    });
  }

  window.aboutShowDropdown = function() {
    const inp = document.getElementById("demo-course");
    if (!inp) return;
    inp.style.borderColor = "#e0a730";
    const val = inp.value.trim();
    if (val) {
      window.aboutFilterCourses(val);
    } else {
      aboutRenderList(ABOUT_COURSES);
      const dd = document.getElementById("about-course-dd");
      if (dd) dd.style.display = "block";
    }
  };

  window.aboutFilterCourses = function(val) {
    const filtered = ABOUT_COURSES.filter(function(c) {
      return c.toLowerCase().indexOf(val.toLowerCase()) > -1;
    });

    const exactMatch = ABOUT_COURSES.find(function(c) {
      return c.toLowerCase() === val.trim().toLowerCase();
    });

    if (exactMatch) {
      aboutSelected = exactMatch;
    } else {
      aboutSelected = "";
    }

    const dd = document.getElementById("about-course-dd");
    if (!dd) return;
    if (filtered.length === 0) {
      dd.style.display = "none";
    } else {
      aboutRenderList(filtered);
      dd.style.display = "block";
    }
  };

  function aboutPickCourse(course) {
    aboutSelected = course;
    const inp = document.getElementById("demo-course");
    if (inp) {
      inp.value = course;
      inp.style.borderColor = "#e0a730";
    }
    const dd = document.getElementById("about-course-dd");
    if (dd) dd.style.display = "none";
  }

  document.addEventListener("click", function(e) {
    const dd = document.getElementById("about-course-dd");
    const inp = document.getElementById("demo-course");
    if (dd && !dd.contains(e.target) && e.target !== inp) {
      dd.style.display = "none";
    }
  });

});

