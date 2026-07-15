window.__sharedEnquiryFormActive = true;

(function () {
  const BASE_URL = (window.APP_BASE_URL || "https://sssam.onrender.com").replace(/\/+$/, "");
  const DEMO_ENQUIRY_API_URL = `${BASE_URL}/api/enquiry/demo-class`;

  const COURSES = [
    "Data Science",
    "Data Analytics + Power BI",
    "AI & Machine Learning",
    "Full Stack Development with AI",
    "Ethical Hacking & Cyber Security",
    "Digital Marketing & SEO",
    "AWS Cloud Computing",
    "Basic Computer Course"
  ];

  function getVariant(container) {
    const byAttr = (container.dataset.enquiryVariant || "").toLowerCase();
    if (byAttr === "popup" || byAttr === "static") return byAttr;

    const path = window.location.pathname.toLowerCase();
    if (
      document.body.classList.contains("contact-page") ||
      path.endsWith("/contact.html") ||
      path.endsWith("contact.html")
    ) {
      return "static";
    }

    return "popup";
  }

  function getFormFieldsMarkup(uid) {
    return `
      <form id="home-demo-form-${uid}" class="home-demo-form" action="#" method="post" novalidate>
        <div class="home-demo-grid">
          <input
            type="text"
            name="name"
            placeholder="Full Name *"
            autocomplete="name"
            minlength="2"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Mobile Number *"
            inputmode="numeric"
            pattern="[0-9]{10}"
            maxlength="10"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address (optional)"
            autocomplete="email"
          />

          <div class="enquiry-course-wrap" style="position:relative; grid-column: 1 / -1;">
            <input
              type="text"
              id="enquiry-course-input-${uid}"
              name="course"
              class="enquiry-course-input"
              placeholder="Course Interested In * (type to search)"
              autocomplete="off"
              required
            />
            <div id="enquiry-course-dd-${uid}" class="enquiry-course-dd"></div>
          </div>
        </div>

        <button type="submit" class="home-demo-submit">Submit Enquiry</button>
        <p class="home-demo-status" aria-live="polite"></p>
      </form>
    `;
  }

  function getMarkup(variant, uid, title, subtitle) {
    const fields = getFormFieldsMarkup(uid);

    if (variant === "popup") {
      return `
        <div class="demo-popup" data-enquiry-popup aria-hidden="true">
          <div class="demo-popup-backdrop" data-close-popup></div>
          <div class="demo-popup-dialog" role="dialog" aria-modal="true" aria-labelledby="homeDemoPopupTitle-${uid}">
            <button class="demo-popup-close" type="button" data-popup-close aria-label="Close enquiry popup">×</button>
            <h3 id="homeDemoPopupTitle-${uid}">${title}</h3>
            <p class="demo-popup-subtitle">${subtitle}</p>
            ${fields}
          </div>
        </div>
      `;
    }

    return `
      <section class="enquiry-static-wrap" aria-labelledby="homeDemoPopupTitle-${uid}">
        <div class="enquiry-static-card">
          <h3 id="homeDemoPopupTitle-${uid}">${title}</h3>
          <p class="demo-popup-subtitle">${subtitle}</p>
          ${fields}
        </div>
      </section>
    `;
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
      } catch (_err) {}
      throw new Error(message);
    }

    return response;
  }

  function initCourseDropdown(container, uid) {
    const inp = container.querySelector(`#enquiry-course-input-${uid}`);
    const dd  = container.querySelector(`#enquiry-course-dd-${uid}`);
    if (!inp || !dd) return;

    function renderList(list) {
      dd.innerHTML = "";
      if (!list.length) { dd.style.display = "none"; return; }
      list.forEach(function(course) {
        const item = document.createElement("div");
        item.textContent = course;
        item.style.cssText = "padding:10px 14px; cursor:pointer; font-size:0.9rem;" +
          "border-bottom:1px solid #333; transition:background 0.15s;";
        item.onmouseenter = function() { this.style.background = "#2a2a2a"; };
        item.onmouseleave = function() { this.style.background = "transparent"; };
        item.onmousedown = function(e) { e.preventDefault(); pick(course); };
        dd.appendChild(item);
      });
      dd.style.display = "block";
    }

    function filter(val) {
      const filtered = COURSES.filter(c => c.toLowerCase().includes(val.toLowerCase()));
      if (!filtered.length) { dd.style.display = "none"; } else { renderList(filtered); }
    }

    function pick(course) {
      inp.value = course;
      inp.style.borderColor = "#e0a730";
      dd.style.display = "none";
    }

    inp.addEventListener("focus", function() {
      inp.style.borderColor = "#e0a730";
      if (inp.value.trim()) { filter(inp.value); } else { renderList(COURSES); }
    });

    inp.addEventListener("input", function() { filter(this.value); });

    document.addEventListener("click", function(e) {
      if (!dd.contains(e.target) && e.target !== inp) dd.style.display = "none";
    });
  }

  function initEnquiryForm(container) {
    const uid      = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const variant  = getVariant(container);
    const title    = container.dataset.enquiryTitle    || "Talk to Our Course Advisor 🎓";
    const subtitle = container.dataset.enquirySubtitle || "Get complete details about courses, fees & placement assistance.";

    container.innerHTML = getMarkup(variant, uid, title, subtitle);

    const popup  = container.querySelector("[data-enquiry-popup]");
    const form   = container.querySelector(".home-demo-form");
    const status = container.querySelector(".home-demo-status");
    if (!form || !status) return;

    initCourseDropdown(container, uid);

    const setStatus = (msg, isError = false) => {
      status.textContent = msg;
      status.classList.toggle("error", Boolean(isError));
    };

    let autoCloseTimer = null;

    const openPopup = (selectedCourse = "") => {
      if (!popup) return;
      clearTimeout(autoCloseTimer);
      setStatus("", false);
      if (selectedCourse) {
        const inp = container.querySelector(`#enquiry-course-input-${uid}`);
        if (inp) inp.value = selectedCourse;
      }
      popup.classList.add("show");
      popup.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    const closePopup = () => {
      if (!popup) return;
      popup.classList.remove("show");
      popup.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    if (variant === "popup") {
      const shouldAutoOpen   = container.dataset.autoOpen !== "false";
      const autoOpenDelay    = Number.parseInt(container.dataset.autoOpenDelay || "5000", 10);
      if (shouldAutoOpen) {
        window.setTimeout(openPopup, Number.isNaN(autoOpenDelay) ? 5000 : autoOpenDelay);
      }
      container.querySelectorAll("[data-close-popup], [data-popup-close]").forEach(el => {
        el.addEventListener("click", closePopup);
      });
      document.addEventListener("keydown", e => {
        if (e.key === "Escape" && popup.classList.contains("show")) closePopup();
      });
      window.openHomeDemoPopup  = openPopup;
      window.closeHomeDemoPopup = closePopup;
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const submitBtn = form.querySelector(".home-demo-submit");
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Submitting..."; }

      const formData    = Object.fromEntries(new FormData(form).entries());
      const fullName    = String(formData.name  || "").trim();
      const phoneNumber = String(formData.phone || "").replace(/\D/g, "");
      const email       = String(formData.email || "").trim();
      const course      = String(formData.course || "").trim();

      if (!fullName) {
        setStatus("Full name is required.", true);
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Submit Enquiry"; }
        return;
      }

      if (!/^\d{10}$/.test(phoneNumber)) {
        setStatus("Mobile number must be exactly 10 digits.", true);
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Submit Enquiry"; }
        return;
      }

      if (!course) {
        setStatus("Please select a course.", true);
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Submit Enquiry"; }
        return;
      }

      const payload = {
        fullName,
        phoneNumber,
        email,
        course,
        demoType: "Offline (Gurugram)",
        customCourseName: "",
        message: "Enquiry submitted via contact/enquiry widget"
      };

      try {
        await submitDemoEnquiry(payload);
        if (typeof gtag === 'function') {
          gtag('event', 'conversion', {
            'send_to': 'AW-18132709725/3nUFCIiP7MMcEN3irMZD'
          });
        }
        form.reset();
        setStatus("✅ Thank you! Our team will contact you shortly.", false);
        if (variant === "popup") {
          autoCloseTimer = window.setTimeout(closePopup, 2200);
        }
      } catch (error) {
        setStatus(error.message || "Submission failed. Please try again.", true);
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Submit Enquiry"; }
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const roots = document.querySelectorAll("[data-enquiry-form-root]");
    roots.forEach(container => initEnquiryForm(container));
  });
})();
