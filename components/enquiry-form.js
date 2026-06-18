window.__sharedEnquiryFormActive = true;

(function () {
  const BASE_URL = "https://sssam.onrender.com".replace(/\/+$/, "");
  const DEMO_ENQUIRY_API_URL = `${BASE_URL}/api/enquiry/demo-class`;

  function normalizeDemoType(modeValue) {
    const modeMap = {
      online: "Online",
      live: "Live Classes",
      offline: "Offline (Gurugram)",
    };

    return modeMap[modeValue] || "";
  }

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

          <select name="course" class="home-demo-course" required>
            <option value="" disabled selected>Select Course *</option>
            <option value="ADCA">ADCA</option>
            <option value="Advanced Excel">Advanced Excel</option>
            <option value="AI & ML">AI & ML</option>
            <option value="AutoCAD">AutoCAD</option>
            <option value="AWS Cloud">AWS Cloud</option>
            <option value="Basic Computer">Basic Computer</option>
            <option value="C Programming">C Programming</option>
            <option value="CCNA">CCNA</option>
            <option value="CCNP">CCNP</option>
            <option value="Cyber Security">Cyber Security</option>
            <option value="Data Analysis">Data Analysis</option>
            <option value="Data Engineering">Data Engineering</option>
            <option value="Data Science">Data Science</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Dot Net">Dot Net</option>
            <option value="Ethical Hacking">Ethical Hacking</option>
            <option value="Full Stack Development">Full Stack Development</option>
            <option value="Google Ads">Google Ads</option>
            <option value="Graphic Design">Graphic Design</option>
            <option value="HTML & CSS">HTML & CSS</option>
            <option value="Java Programming">Java Programming</option>
            <option value="Java Full Stack">Java Full Stack</option>
            <option value="Linux">Linux</option>
            <option value="MIS">MIS</option>
            <option value="MS Office">MS Office</option>
            <option value="MySQL">MySQL</option>
            <option value="PHP">PHP</option>
            <option value="Python">Python</option>
            <option value="Python Full Stack">Python Full Stack</option>
            <option value="Ruby Programming">Ruby Programming</option>
            <option value="SAP FICO">SAP FICO</option>
            <option value="Search Engine Marketing">Search Engine Marketing</option>
            <option value="SEO">SEO</option>
            <option value="Social Media Marketing">Social Media Marketing</option>
            <option value="Software Testing">Software Testing</option>
            <option value="Tally">Tally</option>
            <option value="Video Editing">Video Editing</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="text"
            name="other_course"
            class="home-demo-other-course is-hidden"
            placeholder="Please mention your course name *"
            autocomplete="off"
          />
        </div>

        <div class="home-demo-mode">
          <label class="demo-mode-option"><input type="radio" name="mode" value="online" required /><span>Online</span></label>
          <label class="demo-mode-option"><input type="radio" name="mode" value="live" required /><span>Live Classes</span></label>
          <label class="demo-mode-option"><input type="radio" name="mode" value="offline" required /><span>Offline (Gurugram)</span></label>
        </div>

        <textarea name="message" rows="3" placeholder="Message / Questions (optional)"></textarea>
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let message = "Submission failed. Please try again.";

      try {
        const errorData = await response.json();
        if (
          errorData &&
          typeof errorData.message === "string" &&
          errorData.message.trim()
        ) {
          message = errorData.message;
        }
      } catch (_err) {
        // Keep fallback message when response is not JSON.
      }

      throw new Error(message);
    }

    return response;
  }

  function initEnquiryForm(container) {
    const uid = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const variant = getVariant(container);
    const title = container.dataset.enquiryTitle || "Talk to Our Course Advisor 🎓";
    const subtitle =
      container.dataset.enquirySubtitle ||
      "Get complete details about courses, fees & placement assistance.";

    container.innerHTML = getMarkup(variant, uid, title, subtitle);

    const popup = container.querySelector("[data-enquiry-popup]");
    const form = container.querySelector(".home-demo-form");
    const status = container.querySelector(".home-demo-status");
    const courseSelect = container.querySelector(".home-demo-course");
    const otherCourseInput = container.querySelector(".home-demo-other-course");

    if (!form || !status || !courseSelect || !otherCourseInput) return;

    const setStatus = (message, isError = false) => {
      status.textContent = message;
      status.classList.toggle("error", Boolean(isError));
    };

    const toggleOtherCourseInput = () => {
      const isOtherSelected = courseSelect.value === "Other";
      otherCourseInput.classList.toggle("is-hidden", !isOtherSelected);
      otherCourseInput.required = isOtherSelected;

      if (!isOtherSelected) {
        otherCourseInput.value = "";
      }
    };

    courseSelect.addEventListener("change", toggleOtherCourseInput);
    toggleOtherCourseInput();

    let autoCloseTimer = null;

    const openPopup = (selectedCourse = "") => {
      if (!popup) return;

      clearTimeout(autoCloseTimer);
      setStatus("", false);

      if (selectedCourse) {
        courseSelect.value = selectedCourse;
        toggleOtherCourseInput();
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
      const shouldAutoOpen = container.dataset.autoOpen !== "false";
      const autoOpenDelay = Number.parseInt(container.dataset.autoOpenDelay || "5000", 10);

      if (shouldAutoOpen) {
        window.setTimeout(openPopup, Number.isNaN(autoOpenDelay) ? 5000 : autoOpenDelay);
      }

      container.querySelectorAll("[data-close-popup], [data-popup-close]").forEach((el) => {
        el.addEventListener("click", closePopup);
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && popup.classList.contains("show")) {
          closePopup();
        }
      });

      window.openHomeDemoPopup = openPopup;
      window.closeHomeDemoPopup = closePopup;
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const submitBtn = form.querySelector(".home-demo-submit");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting...";
      }

      const formData = Object.fromEntries(new FormData(form).entries());
      const fullName = String(formData.name || "").trim();
      const phoneNumber = String(formData.phone || "").replace(/\D/g, "");
      const isOthers = formData.course === "Other";
      const customCourseName = isOthers ? String(formData.other_course || "").trim() : "";
      const demoType = normalizeDemoType(String(formData.mode || ""));

      if (!fullName) {
        setStatus("Full name is required.", true);
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Submit Enquiry";
        }
        return;
      }

      if (!/^\d{10}$/.test(phoneNumber)) {
        setStatus("Mobile number must be exactly 10 digits.", true);
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Submit Enquiry";
        }
        return;
      }

      if (isOthers && !customCourseName) {
        setStatus("Please enter your custom course name.", true);
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Submit Enquiry";
        }
        return;
      }

      if (!demoType) {
        setStatus("Please select Online / Live / Offline mode.", true);
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Submit Enquiry";
        }
        return;
      }

      const payload = {
        fullName,
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
        setStatus("✅ Thank you for your enquiry! Our team will contact you shortly.", false);

        if (variant === "popup") {
          autoCloseTimer = window.setTimeout(() => {
            closePopup();
          }, 2200);
        }
      } catch (error) {
        setStatus(error.message || "Submission failed. Please try again.", true);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Submit Enquiry";
        }
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const roots = document.querySelectorAll("[data-enquiry-form-root]");
    roots.forEach((container) => initEnquiryForm(container));
  });
})();
