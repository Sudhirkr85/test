document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("course-search");
  const levelFilter = document.getElementById("level-filter");
  const courseItems = document.querySelectorAll(".course-item");

  if (!searchInput || !levelFilter || !courseItems.length) {
    return;
  }

  function normalizeText(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();
  }

  function normalizeLevel(value) {
    const normalized = normalizeText(value);
    if (normalized.includes("beginner")) return "beginner";
    if (normalized.includes("intermediate")) return "intermediate";
    if (normalized.includes("advanced")) return "advanced";
    return "";
  }

  courseItems.forEach(item => {
    const levelFromData = normalizeLevel(item.dataset.level);
    const levelFromPill = normalizeLevel(item.querySelector(".pill")?.textContent);
    const finalLevel = levelFromData || levelFromPill;

    if (finalLevel) {
      item.dataset.level = finalLevel;
    }
  });

  function applyFilters() {
    const searchText = normalizeText(searchInput.value);
    const searchTerms = searchText ? searchText.split(" ") : [];
    const selectedLevel = normalizeLevel(levelFilter.value) || "all";

    courseItems.forEach(item => {
      const title = normalizeText(item.querySelector(".course-title")?.textContent);
      const description = normalizeText(item.querySelector(".course-desc")?.textContent);
      const tags = normalizeText(item.dataset.tags);
      const level = normalizeLevel(item.dataset.level);
      const searchableText = `${title} ${description} ${tags}`;

      const matchesSearch =
        searchTerms.length === 0 ||
        searchTerms.every(term => searchableText.includes(term));

      const matchesLevel =
        selectedLevel === "all" || selectedLevel === level;

      if (matchesSearch && matchesLevel) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  }

  searchInput.addEventListener("input", applyFilters);
  levelFilter.addEventListener("change", applyFilters);

  applyFilters(); // initial run
});




document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap === "undefined") return;
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* -------------------------------
     HERO SECTION ANIMATION
  --------------------------------*/
  gsap.from(".courses-hero h1", {
    opacity: 0,
    y: -30,
    duration: 1.1,
    ease: "power3.out"
  });

  gsap.from(".courses-hero p", {
    opacity: 0,
    y: -20,
    delay: 0.2,
    duration: 1,
    ease: "power3.out"
  });

  gsap.from(".hero-actions", {
    opacity: 0,
    y: 20,
    delay: 0.3,
    duration: 1,
    ease: "power3.out"
  });


  /* -------------------------------
     COURSE CARD SCROLL ANIMATION
  --------------------------------*/
  

  // gsap.utils.toArray(".course-item").forEach((card, i) => {
  //   gsap.from(card, {
  //     opacity: 0,
  //     y: 60,
  //     duration: 1,
  //     delay: i * 0.05, // stagger effect
  //     ease: "power3.out",
  //     scrollTrigger: {
  //       trigger: card,
  //       start: "top 95%",
  //       end:"bottom 40%",
  //       scrub: 2,
  //     }
  //   });
  // });



  /* -------------------------------
     IMAGE HOVER ANIMATION
  --------------------------------*/
  document.querySelectorAll(".course-thumb").forEach(img => {
    img.addEventListener("mouseenter", () => {
      gsap.to(img, {
        scale: 1.04,
        rotateY: 5,
        duration: 0.4,
        ease: "power2.out"
      });
    });

    img.addEventListener("mouseleave", () => {
      gsap.to(img, {
        scale: 1,
        rotateY: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    });
  });

  /* -------------------------------
     HTML-CSS COURSE HERO ANIMATION
  --------------------------------*/
  if (document.querySelector("#html-css-foundations-course-gurugram")) {
    gsap.from("#html-css-foundations-course-gurugram h1", {
      opacity: 0,
      y: -26,
      duration: 0.9,
      ease: "power2.out"
    });

    gsap.from("#html-css-foundations-course-gurugram .html-css-course-hero-text", {
      opacity: 0,
      y: 16,
      duration: 0.8,
      delay: 0.15,
      ease: "power2.out"
    });

    gsap.from("#html-css-foundations-course-gurugram .html-css-course-benefits li", {
      opacity: 0,
      y: 14,
      stagger: 0.08,
      duration: 0.55,
      delay: 0.25,
      ease: "power2.out"
    });

    gsap.from("#html-css-foundations-course-gurugram .html-css-course-hero-actions", {
      opacity: 0,
      y: 16,
      duration: 0.7,
      delay: 0.45,
      ease: "power2.out"
    });
  }

});

document.addEventListener("DOMContentLoaded", () => {
  const aiMlHero = document.getElementById("ai-ml-hero");
  if (!aiMlHero) return;

  const ctaLinks = aiMlHero.querySelectorAll('a[href^="#"]');

  ctaLinks.forEach(link => {
    link.addEventListener("click", event => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      event.preventDefault();
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  if (typeof gsap === "undefined") return;

  const heroHeading = aiMlHero.querySelector("h1");
  const heroText = aiMlHero.querySelector("p");
  const heroItems = aiMlHero.querySelectorAll("li");
  const heroButtons = aiMlHero.querySelectorAll("nav a");

  if (heroHeading) {
    gsap.from(heroHeading, {
      opacity: 0,
      y: 26,
      duration: 0.9,
      ease: "power3.out"
    });
  }

  if (heroText) {
    gsap.from(heroText, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.14,
      ease: "power2.out"
    });
  }

  if (heroItems.length) {
    gsap.from(heroItems, {
      opacity: 0,
      y: 16,
      duration: 0.55,
      stagger: 0.08,
      delay: 0.2,
      ease: "power2.out"
    });
  }

  if (heroButtons.length) {
    gsap.from(heroButtons, {
      opacity: 0,
      y: 14,
      duration: 0.6,
      stagger: 0.09,
      delay: 0.32,
      ease: "power2.out"
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("courseDemoPopup");
  const closeBtn = document.getElementById("courseDemoClose");
  const form = document.getElementById("course-demo-form");
  const status = document.getElementById("course-demo-status");
  const courseSelect = document.getElementById("course-demo-course");
  const dateSelect = document.getElementById("course-demo-date");

  if (!popup || !form || !courseSelect) return;

  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbz7e3JMuZR23ulfmMXyii56sop28a-tihJk-7WnrEWQ6r0GYNOcrr4Af1hx5n6vK8N4/exec";

  const courseTitles = new Set();
  document.querySelectorAll(".course-title").forEach((el) => {
    const text = (el.textContent || "").trim();
    if (text) courseTitles.add(text);
  });

  [...courseTitles].forEach((title) => {
    const option = document.createElement("option");
    option.value = title;
    option.textContent = title;
    courseSelect.appendChild(option);
  });

  if (dateSelect) {
    const formatter = new Intl.DateTimeFormat("en-IN", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");

      const option = document.createElement("option");
      option.value = `${yyyy}-${mm}-${dd}`;
      option.textContent = formatter.format(d);
      dateSelect.appendChild(option);
    }
  }

  const openPopup = (selectedCourse = "") => {
    if (selectedCourse && courseSelect) {
      courseSelect.value = selectedCourse;
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

  document.querySelectorAll(".course-actions .btn-ghost").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();

      const card = btn.closest(".course-item");
      const title = card?.querySelector(".course-title")?.textContent?.trim() || "";
      openPopup(title);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closePopup);
  }

  popup.querySelectorAll("[data-close-course-popup]").forEach((el) => {
    el.addEventListener("click", closePopup);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popup.classList.contains("show")) {
      closePopup();
    }
  });

  function submitToAppsScript(url, payload) {
    return new Promise((resolve, reject) => {
      const frameName = `course-demo-frame-${Date.now()}`;
      const iframe = document.createElement("iframe");
      iframe.name = frameName;
      iframe.style.display = "none";

      const postForm = document.createElement("form");
      postForm.method = "POST";
      postForm.action = url;
      postForm.target = frameName;
      postForm.style.display = "none";

      Object.entries(payload).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value ?? "");
        postForm.appendChild(input);
      });

      let cleaned = false;
      const cleanup = () => {
        if (cleaned) return;
        cleaned = true;
        iframe.remove();
        postForm.remove();
      };

      const timeout = setTimeout(() => {
        cleanup();
        reject(new Error("timeout"));
      }, 12000);

      iframe.onload = () => {
        clearTimeout(timeout);
        cleanup();
        resolve();
      };

      document.body.appendChild(iframe);
      document.body.appendChild(postForm);
      postForm.submit();
    });
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitBtn = form.querySelector(".course-demo-submit");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting...";
    }

    const payload = Object.fromEntries(new FormData(form).entries());
    payload.submitted_at = new Date().toISOString();
    payload.page = "courses.html";

    try {
      await submitToAppsScript(WEB_APP_URL, payload);
      form.reset();
      if (dateSelect) dateSelect.selectedIndex = 0;
      if (courseSelect) courseSelect.selectedIndex = 0;

      if (status) {
        status.textContent = "Thanks! Your demo request has been submitted.";
        status.classList.remove("error");
      }

      setTimeout(() => {
        closePopup();
      }, 900);
    } catch (err) {
      if (status) {
        status.textContent = "Submission failed. Please try again.";
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

