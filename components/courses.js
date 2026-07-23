document.addEventListener("DOMContentLoaded", () => {
  const searchInput   = document.getElementById("course-search");
  const courseItems   = document.querySelectorAll(".course-item");
  const catTabs       = document.querySelectorAll(".cat-tab");
  const visibleCount  = document.getElementById("visible-count");
  const emptyState    = document.getElementById("courses-empty");
  const resetBtn      = document.getElementById("reset-filter-btn");

  if (!courseItems.length) return;

  let activeCategory = "all";

  function norm(v) {
    return String(v || "").toLowerCase().replace(/\s+/g, " ").trim();
  }

  function applyFilters() {
    const query   = norm(searchInput ? searchInput.value : "");
    const terms   = query ? query.split(" ").filter(Boolean) : [];
    let   shown   = 0;

    courseItems.forEach(item => {
      const title = norm(item.querySelector(".course-title")?.textContent);
      const desc  = norm(item.querySelector(".course-desc")?.textContent);
      const tags  = norm(item.dataset.tags);
      const cat   = norm(item.dataset.category);
      const text  = `${title} ${desc} ${tags}`;

      const matchCat    = activeCategory === "all" || cat === activeCategory;
      const matchSearch = terms.length === 0 || terms.every(t => text.includes(t));

      const visible = matchCat && matchSearch;
      item.style.display = visible ? "" : "none";
      if (visible) shown++;
    });

    if (visibleCount) visibleCount.textContent = shown;

    if (emptyState) {
      emptyState.style.display = shown === 0 ? "flex" : "none";
    }
  }

  catTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      catTabs.forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      activeCategory = tab.dataset.cat;
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      catTabs.forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      const allTab = document.querySelector(".cat-tab[data-cat='all']");
      if (allTab) {
        allTab.classList.add("active");
        allTab.setAttribute("aria-selected", "true");
      }
      activeCategory = "all";
      applyFilters();
    });
  }

  applyFilters();
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
  const courseSelect = document.getElementById("home-demo-course");

  document.querySelectorAll(".course-item .btn-primary").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();

      const card = btn.closest(".course-item");
      const title = card?.querySelector(".course-title")?.textContent?.trim() || "";

      // Clean course title for popup pre-fill (e.g. remove "Course in Gurugram" / "Course")
      let cleanTitle = title
        .replace(/Course\s+in\s+Gurugram/gi, "")
        .replace(/Course\s+in\s+Gurgaon/gi, "")
        .replace(/Course/gi, "")
        .replace(/\s+/g, " ")
        .trim();

      // Set the counseling search dropdown to this clean title
      const cpSearchInput = document.getElementById("cp-course-search");
      if (cpSearchInput) {
        cpSearchInput.value = cleanTitle;
        // Trigger matching course in local selection variable if window functions exist
        if (typeof window.cpFilterCourses === "function") {
          window.cpFilterCourses(cleanTitle);
        }
      }

      if (typeof window.openCounselingPopup === "function") {
        window.openCounselingPopup();
      }
    });
  });
});

