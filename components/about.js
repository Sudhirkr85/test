document.addEventListener("DOMContentLoaded", () => {
const DEMO_SHEET_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbz7e3JMuZR23ulfmMXyii56sop28a-tihJk-7WnrEWQ6r0GYNOcrr4Af1hx5n6vK8N4/exec";

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
    { x: -120, opacity: 0 }, 
    { 
      x: 0, opacity: 1, duration: 1, ease: "bounce.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        end: "bottom 60%",
        toggleActions: "play reverse play reverse"
      }
    }
  );
});

// Right card animation
gsap.utils.toArray(".right-animate").forEach((el) => {
  gsap.fromTo(el, 
    { x: 120, opacity: 0 }, 
    { 
      x: 0, opacity: 1, duration: 1, ease: "bounce.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        end: "bottom 60%",
        toggleActions: "play reverse play reverse"
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

function submitToAppsScript_(url, payload) {
  return new Promise((resolve, reject) => {
    const frameName = `demo-submit-frame-${Date.now()}`;
    const iframe = document.createElement("iframe");
    iframe.name = frameName;
    iframe.style.display = "none";

    const form = document.createElement("form");
    form.method = "POST";
    form.action = url;
    form.target = frameName;
    form.style.display = "none";

    Object.entries(payload).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = String(value ?? "");
      form.appendChild(input);
    });

    let cleaned = false;
    const cleanUp = () => {
      if (cleaned) return;
      cleaned = true;
      iframe.remove();
      form.remove();
    };

    const timeout = setTimeout(() => {
      cleanUp();
      reject(new Error("timeout"));
    }, 12000);

    iframe.onload = () => {
      clearTimeout(timeout);
      cleanUp();
      resolve();
    };

    document.body.appendChild(iframe);
    document.body.appendChild(form);
    form.submit();
  });
}

if (demoForm) {
  demoForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (
      !DEMO_SHEET_WEB_APP_URL ||
      DEMO_SHEET_WEB_APP_URL.includes("PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE")
    ) {
      if (demoFormStatus) {
        demoFormStatus.textContent = "Please add your Google Apps Script Web App URL in components/about.js.";
        demoFormStatus.classList.add("error");
      }
      return;
    }

    const submitButton = demoForm.querySelector(".demo-submit");
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";
    }

    const formData = new FormData(demoForm);
    const payload = Object.fromEntries(formData.entries());
    payload.submitted_at = new Date().toISOString();
    payload.page = "about.html";

    try {
      await submitToAppsScript_(DEMO_SHEET_WEB_APP_URL, payload);

      demoForm.reset();
      if (demoDateSelect) {
        demoDateSelect.selectedIndex = 0;
      }

      if (demoFormStatus) {
        demoFormStatus.textContent = "Thanks! Your demo request was submitted successfully.";
        demoFormStatus.classList.remove("error");
      }
    } catch (error) {
      if (demoFormStatus) {
        demoFormStatus.textContent = "Submission failed. Please try again.";
        demoFormStatus.classList.add("error");
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Book Free Demo Class";
      }
    }
  });
}

});

