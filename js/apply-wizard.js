/**
 * Apply Wizard controller for SSSAM Academy
 * Courses are static (no API dependency) — categories match db.js seed
 */
document.addEventListener("DOMContentLoaded", () => {
  const wizardForm = document.getElementById("applyWizardForm");
  if (!wizardForm) return;

  const BASE_URL = (window.APP_BASE_URL || "https://sssam.onrender.com").replace(/\/+$/, "");

  let currentStep = 1;
  const totalSteps = 4;

  // Selected values
  let selectedTrainingType = "";
  let selectedCategory = "";
  let courseDropdown = null;
  let qualificationDropdown = null;
  let durationDropdown = null;
  let collegeDropdown = null;
  let corporateDropdown = null;

  // ─────────────────────────────────────────────────────────────────────────
  // STATIC COURSE LIST (mirrors db.js seed — no API needed)
  // ─────────────────────────────────────────────────────────────────────────
  const STATIC_COURSES = [
    // Programming & Development
    { name: "Python Programming",              category: "Programming & Development" },
    { name: "Python Full Stack",               category: "Programming & Development" },
    { name: "Java Full Stack",                 category: "Programming & Development" },
    { name: "Full Stack Web Development",      category: "Programming & Development" },
    { name: "MERN Stack",                      category: "Programming & Development" },
    { name: "Java Programming",                category: "Programming & Development" },
    { name: "C & C++ Programming",             category: "Programming & Development" },
 
    // Data & AI
    { name: "Data Science",                    category: "Data & AI" },
    { name: "Artificial Intelligence & Machine Learning", category: "Data & AI" },
    { name: "Data Analytics",                  category: "Data & AI" },
    { name: "Data Engineering",                category: "Data & AI" },
    { name: "SQL Course",                      category: "Data & AI" },
    { name: "Oracle SQL & PL/SQL",             category: "Data & AI" },

    // Cyber Security & Ethical Hacking
    { name: "Cyber Security & Ethical Hacking",    category: "Cyber Security & Ethical Hacking" },
    { name: "Ethical Hacking",                     category: "Cyber Security & Ethical Hacking" },
    { name: "AWS Cloud Computing",                 category: "Cyber Security & Ethical Hacking" },
    { name: "CCNA",                                category: "Cyber Security & Ethical Hacking" },
    { name: "CCNP",                                category: "Cyber Security & Ethical Hacking" },
    { name: "Linux Administration",                category: "Cyber Security & Ethical Hacking" },

    // Digital Marketing
    { name: "Digital Marketing",               category: "Digital Marketing" },
    { name: "SEO",                             category: "Digital Marketing" },
    { name: "Google Ads",                      category: "Digital Marketing" },
    { name: "Social Media Marketing",          category: "Digital Marketing" },
    { name: "Search Engine Marketing",         category: "Digital Marketing" },

    // Office & Business Skills
    { name: "Advanced Excel",                  category: "Office & Business Skills" },
    { name: "Software Testing",                category: "Office & Business Skills" },
    { name: "Tally ERP with GST",              category: "Office & Business Skills" },
    { name: "SAP ERP (FICO, MM, HR, SD)",      category: "Office & Business Skills" },
    { name: "MS Office & Excel",               category: "Office & Business Skills" },
    { name: "Basic Computer Course",           category: "Office & Business Skills" },
    { name: "ADCA Course",                     category: "Office & Business Skills" },
    { name: "MIS Course",                      category: "Office & Business Skills" },

    // Design & Creative
    { name: "Graphic Design",                  category: "Design & Creative" },
    { name: "Video Editing",                   category: "Design & Creative" },
    { name: "AutoCAD",                         category: "Design & Creative" }
  ];

  // STATIC COLLEGES LIST (Delhi NCR)
  const STATIC_COLLEGES = [
    "IITM (Institute of Information Technology & Management, Janakpuri, New Delhi)",
    "Dronacharya College of Engineering, Gurugram",
    "GD Goenka University, Gurugram",
    "Amity University, Gurugram",
    "KR Mangalam University, Gurugram",
    "SGT University, Gurugram",
    "Gurugram University",
    "DPG Institute of Technology & Management",
    "St. Andrews Institute of Technology & Management",
    "Delhi Technological University (DTU)",
    "Netaji Subhas University of Technology (NSUT)",
    "Indira Gandhi National Open University (IGNOU)",
    "Jamia Millia Islamia",
    "YMCA Faridabad",
    "Delhi University"
  ];

  // STATIC GURGAON/DELHI COMPANIES LIST
  const STATIC_COMPANIES = [
    "Google India (Gurugram)",
    "Microsoft India (Gurugram)",
    "Accenture (Gurugram)",
    "Deloitte (Gurugram)",
    "TCS (Tata Consultancy Services)",
    "Infosys Limited (Gurugram)",
    "Wipro Technologies",
    "Cognizant Technology Solutions",
    "Zomato (Gurugram)",
    "MakeMyTrip (Gurugram)",
    "OYO Rooms (Gurugram)",
    "Maruti Suzuki India",
    "Ernst & Young (EY)",
    "KPMG India",
    "PwC (PricewaterhouseCoopers)"
  ];

  // Elements
  const panels = document.querySelectorAll(".wizard-step-panel");
  const nodes = document.querySelectorAll(".wizard-step-node");
  const progressBar = document.querySelector(".wizard-progress-bar");
  const btnPrev = document.getElementById("btnPrev");
  const btnNext = document.getElementById("btnNext");
  const stepTitle = document.getElementById("stepTitle");

  // Step 1: Training Type Buttons
  const typeButtons = document.querySelectorAll(".training-type-btn");
  typeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      typeButtons.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedTrainingType = btn.getAttribute("data-value");

      // Progressive disclosure: toggle College or Corporate field in Step 4
      const collegeField = document.getElementById("collegeFieldContainer");
      const corporateField = document.getElementById("corporateFieldContainer");
      const startDateField = document.getElementById("startDateFieldWrap");
      const endDateField = document.getElementById("endDateFieldWrap");
      const qualField = document.getElementById("qualFieldWrap");
      
      const needsQual = selectedTrainingType === "College Training" || selectedTrainingType === "Corporate Training";
      if (qualField) {
        if (needsQual) {
          qualField.style.display = "block";
          if (qualificationDropdown && qualificationDropdown.input) qualificationDropdown.input.required = true;
        } else {
          qualField.style.display = "none";
          if (qualificationDropdown && qualificationDropdown.input) qualificationDropdown.input.required = false;
        }
      }

      if (collegeField) {
        if (selectedTrainingType === "College Training") {
          collegeField.style.display = "block";
          if (collegeDropdown && collegeDropdown.input) collegeDropdown.input.required = true;
        } else {
          collegeField.style.display = "none";
          if (collegeDropdown && collegeDropdown.input) collegeDropdown.input.required = false;
        }
      }

      if (corporateField) {
        if (selectedTrainingType === "Corporate Training") {
          corporateField.style.display = "block";
          if (corporateDropdown && corporateDropdown.input) corporateDropdown.input.required = true;
        } else {
          corporateField.style.display = "none";
          if (corporateDropdown && corporateDropdown.input) corporateDropdown.input.required = false;
        }
      }

      // Start/End date range is required for all training types except Workshops
      const needsDates = selectedTrainingType !== "Workshop";
      if (startDateField && endDateField) {
        if (needsDates) {
          startDateField.style.display = "block";
          endDateField.style.display = "block";
        } else {
          startDateField.style.display = "none";
          endDateField.style.display = "none";
        }
      }

      // Dynamically load duration dropdown items (Months for regular/intern, Hours for others)
      const durationLabel = document.getElementById("durationFieldLabel");
      if (durationDropdown) {
        if (selectedTrainingType === "Training" || selectedTrainingType === "Internship") {
          durationDropdown.items = ["1 Month", "2 Months", "3 Months", "6 Months", "Other"];
          durationDropdown.placeholder = "Select or type duration in Months (e.g. 3 Months)...";
          if (durationLabel) durationLabel.innerHTML = `Duration (in Months) <span class="req">*</span>`;
        } else if (selectedTrainingType === "Workshop") {
          durationDropdown.items = ["1 Day", "2 Days", "3 Days", "5 Days", "1 Week", "Other"];
          durationDropdown.placeholder = "Select or type workshop duration (e.g. 4 Days)...";
          if (durationLabel) durationLabel.innerHTML = `Duration (in Days) <span class="req">*</span>`;
        } else {
          durationDropdown.items = ["40 Hours", "80 Hours", "100 Hours", "120 Hours", "150 Hours", "200 Hours", "Other"];
          durationDropdown.placeholder = "Select or type duration in Hours (e.g. 100 Hours)...";
          if (durationLabel) durationLabel.innerHTML = `Duration (in Hours) <span class="req">*</span>`;
        }
        durationDropdown.renderList(durationDropdown.items);
        durationDropdown.setValue("");
        if (durationDropdown.input) {
          durationDropdown.input.placeholder = durationDropdown.placeholder;
        }
      }

      // Auto move to step 2 after brief delay for smooth UX
      setTimeout(() => {
        navigate(1);
      }, 300);
    });
  });

  // Step 2: Category Cards
  const categoryCards = document.querySelectorAll(".category-card");
  categoryCards.forEach(card => {
    card.addEventListener("click", () => {
      categoryCards.forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      selectedCategory = card.getAttribute("data-category");

      // Filter and reload courses in dropdown
      updateCoursesDropdown();

      // Auto move to step 3
      setTimeout(() => {
        navigate(1);
      }, 300);
    });
  });

  function updateCoursesDropdown() {
    const coursesForCategory = STATIC_COURSES
      .filter(c => c.category === selectedCategory)
      .map(c => c.name);

    if (courseDropdown) {
      courseDropdown.items = [...coursesForCategory, "Other"];
      courseDropdown.renderList(courseDropdown.items);
      courseDropdown.setValue("");
    }
  }

  // Init searchable dropdowns — fully static, no API calls needed
  function initDropdowns() {
    // Course dropdown (Step 3) — starts empty, filled when category chosen
    courseDropdown = new SearchableDropdown("courseDropdownWrap", {
      placeholder: "Search or type course name...",
      staticItems: [],
      showOther: true,
      otherPlaceholder: "Enter custom course name...",
      required: true
    });

    // Qualification dropdown (Step 4)
    qualificationDropdown = new SearchableDropdown("qualificationDropdownWrap", {
      placeholder: "Search or select qualification...",
      staticItems: [
        "High School (10th)",
        "Intermediate (12th)",
        "Diploma",
        "Bachelor of Computer Applications (BCA)",
        "Bachelor of Technology (B.Tech)",
        "Bachelor of Science (B.Sc)",
        "Master of Computer Applications (MCA)",
        "Master of Technology (M.Tech)",
        "Master of Business Administration (MBA)",
        "Post Graduate Diploma",
      ],
      showOther: true,
      otherPlaceholder: "Enter custom qualification...",
      required: true
    });

    // Duration dropdown (Step 4)
    durationDropdown = new SearchableDropdown("durationDropdownWrap", {
      placeholder: "Select or type duration in Hours (e.g. 100 Hours)...",
      staticItems: ["40 Hours", "80 Hours", "100 Hours", "120 Hours", "150 Hours", "200 Hours"],
      showOther: true,
      otherPlaceholder: "Enter custom hours...",
      required: true
    });

    // College dropdown (Step 4) — fully static
    collegeDropdown = new SearchableDropdown("collegeDropdownWrap", {
      placeholder: "Search or select college...",
      staticItems: STATIC_COLLEGES,
      showOther: true,
      otherPlaceholder: "Enter custom college name...",
      required: false
    });

    // Corporate dropdown (Step 4) — fully static
    corporateDropdown = new SearchableDropdown("corporateDropdownWrap", {
      placeholder: "Search or select company...",
      staticItems: STATIC_COMPANIES,
      showOther: true,
      otherPlaceholder: "Enter custom company name...",
      required: false
    });
  }

  // ─── Phone Number Auto-Format (5 5 display) ──────────────────────────────
  function initPhoneAutoFormat() {
    const phoneInput = document.getElementById("applyPhone");
    if (!phoneInput) return;

    phoneInput.addEventListener("input", (e) => {
      // Strip everything except digits
      let digits = phoneInput.value.replace(/\D/g, "").slice(0, 10);

      // Format: first 5 digits, space, next 5 digits
      let formatted = digits;
      if (digits.length > 5) {
        formatted = digits.slice(0, 5) + " " + digits.slice(5);
      }

      phoneInput.value = formatted;
    });

    // On keydown: handle backspace correctly at space position
    phoneInput.addEventListener("keydown", (e) => {
      if (e.key === "Backspace") {
        const val = phoneInput.value;
        // If cursor is right after the space, remove the space + last digit before it
        const pos = phoneInput.selectionStart;
        if (pos === 6 && val[5] === " ") {
          e.preventDefault();
          phoneInput.value = val.slice(0, 4); // remove digit + space
        }
      }
    });
  }


  // ─── Email Domain Auto-Suggest ────────────────────────────────────────────
  function initEmailSuggest() {
    const emailInput  = document.getElementById("applyEmail");
    const suggestBox  = document.getElementById("emailSuggestions");
    if (!emailInput || !suggestBox) return;

    const DOMAINS = [
      "gmail.com", "yahoo.com", "outlook.com",
      "hotmail.com", "rediffmail.com", "icloud.com", "ymail.com"
    ];

    let activeIdx = -1;

    function getItems() {
      return suggestBox.querySelectorAll(".email-suggestion-item");
    }

    function setActive(idx) {
      const items = getItems();
      items.forEach(el => el.classList.remove("active"));
      if (idx >= 0 && idx < items.length) {
        items[idx].classList.add("active");
        activeIdx = idx;
      } else {
        activeIdx = -1;
      }
    }

    function showSuggestions(prefix) {
      suggestBox.innerHTML = "";
      activeIdx = -1;

      DOMAINS.forEach(domain => {
        const full = prefix + domain;
        const item = document.createElement("div");
        item.className = "email-suggestion-item";
        item.setAttribute("role", "option");
        // Bold the domain part
        item.innerHTML = `${prefix}<span>${domain}</span>`;

        item.addEventListener("mousedown", (e) => {
          e.preventDefault(); // prevent blur before fill
          emailInput.value = full;
          closeBox();
          emailInput.focus();
        });

        suggestBox.appendChild(item);
      });

      suggestBox.classList.add("open");
    }

    function closeBox() {
      suggestBox.classList.remove("open");
      suggestBox.innerHTML = "";
      activeIdx = -1;
    }

    emailInput.addEventListener("input", () => {
      const val = emailInput.value;
      const atIdx = val.indexOf("@");

      // Show suggestions only after @ and no domain typed yet (or partial domain)
      if (atIdx !== -1) {
        const prefix = val.slice(0, atIdx + 1); // "user@"
        const afterAt = val.slice(atIdx + 1);   // what's after @

        // Filter domains matching what user typed after @
        const filtered = DOMAINS.filter(d => d.startsWith(afterAt));

        if (filtered.length > 0 && afterAt.length < 15) {
          suggestBox.innerHTML = "";
          activeIdx = -1;

          filtered.forEach(domain => {
            const full = prefix + domain;
            const item = document.createElement("div");
            item.className = "email-suggestion-item";
            item.setAttribute("role", "option");
            item.innerHTML = `${prefix}<span>${domain}</span>`;

            item.addEventListener("mousedown", (e) => {
              e.preventDefault();
              emailInput.value = full;
              closeBox();
              emailInput.focus();
            });

            suggestBox.appendChild(item);
          });

          suggestBox.classList.add("open");
        } else {
          closeBox();
        }
      } else {
        closeBox();
      }
    });

    // Keyboard navigation
    emailInput.addEventListener("keydown", (e) => {
      const items = getItems();
      if (!suggestBox.classList.contains("open") || items.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive(Math.min(activeIdx + 1, items.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive(Math.max(activeIdx - 1, 0));
      } else if (e.key === "Enter" && activeIdx >= 0) {
        e.preventDefault();
        emailInput.value = items[activeIdx].textContent;
        closeBox();
      } else if (e.key === "Escape") {
        closeBox();
      } else if (e.key === "Tab") {
        // Auto-fill first suggestion on Tab
        if (activeIdx === -1 && items.length > 0) {
          e.preventDefault();
          emailInput.value = items[0].textContent;
        }
        closeBox();
      }
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!emailInput.contains(e.target) && !suggestBox.contains(e.target)) {
        closeBox();
      }
    });
  }



  function updateProgress() {
    panels.forEach((p, idx) => {
      p.classList.toggle("active", idx + 1 === currentStep);
    });

    nodes.forEach((node, idx) => {
      const stepNum = idx + 1;
      node.classList.toggle("active", stepNum === currentStep);
      node.classList.toggle("completed", stepNum < currentStep);
    });

    const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressBar.style.width = `${percentage}%`;

    btnPrev.style.visibility = currentStep === 1 ? "hidden" : "visible";

    if (currentStep === totalSteps) {
      btnNext.textContent = "Submit Application";
    } else {
      btnNext.textContent = "Next Step";
    }

    const titles = [
      "Select Training Type",
      "Choose Course Category",
      "Select Course",
      "Enter Student Details"
    ];
    stepTitle.textContent = titles[currentStep - 1];

    // Update dynamic English guidance text per step
    const guideEl = document.getElementById("applyGuideText");
    if (guideEl) {
      if (currentStep === 1) {
        guideEl.innerHTML = `
          <ul style="margin: 0; padding-left: 20px; list-style-type: disc;">
            <li style="margin-bottom: 6px;"><strong>Training (SSSAM Student):</strong> Select this if you are a regular student at our SSSAM Academy center (requires duration in Months & Date range).</li>
            <li style="margin-bottom: 6px;"><strong>College Training:</strong> Choose this if your training was conducted directly inside your college/campus (requires College selection & Date range).</li>
            <li style="margin-bottom: 6px;"><strong>Corporate Training:</strong> Choose this if training was completed inside a company (requires Company selection & Date range).</li>
            <li style="margin-bottom: 0;"><strong>Workshop / Internship:</strong> Select these for short term workshops (in Days) or SSSAM internships.</li>
          </ul>
        `;
      } else if (currentStep === 2) {
        guideEl.innerHTML = `
          <p style="margin: 0 0 10px; font-weight: 600;">Choose the category that matches your training certificate:</p>
          <ul style="margin: 0; padding-left: 20px; list-style-type: disc;">
            <li style="margin-bottom: 4px;"><strong>Programming & Development:</strong> Python, Java, C++, Frontend/Backend, React, Node.js</li>
            <li style="margin-bottom: 4px;"><strong>Data & AI:</strong> Data Science, Data Analytics, Machine Learning, Power BI, SQL</li>
            <li style="margin-bottom: 4px;"><strong>Cyber Security & Hacking:</strong> Ethical Hacking, Cyber Security Fundamentals, Networking</li>
            <li style="margin-bottom: 4px;"><strong>Digital Marketing:</strong> SEO, Social Media, Google Ads, YouTube Marketing</li>
            <li style="margin-bottom: 4px;"><strong>Office & Business Skills:</strong> MIS Reporting, Advanced Excel, Tally Prime, MS Office</li>
            <li style="margin-bottom: 0;"><strong>Design & Creative:</strong> Graphic Design, UI/UX Design, Photoshop, AutoCAD</li>
          </ul>
        `;
      } else if (currentStep === 3) {
        guideEl.innerHTML = `
          <p style="margin: 0;">Search or select your specific course name from the dropdown. If your course is not listed, select <strong>"Other"</strong> at the bottom of the list and type your custom course title.</p>
        `;
      } else if (currentStep === 4) {
        let detailsGuide = `Please double check your spelling. Ensure your name matches your ID proof, and enter a valid email address. Your mobile number will automatically format with a space (e.g., 98765 43210) as you type.`;
        if (selectedTrainingType === "College Training") {
          detailsGuide += `<br/><span style="display: block; margin-top: 8px;"><strong>Note:</strong> Select or type your college name, and enter your training start and end dates. Your duration should be entered in Hours.</span>`;
        } else if (selectedTrainingType === "Corporate Training") {
          detailsGuide += `<br/><span style="display: block; margin-top: 8px;"><strong>Note:</strong> Select or type your company name, and enter your training start and end dates. Your duration should be entered in Hours.</span>`;
        } else if (selectedTrainingType === "Workshop") {
          detailsGuide += `<br/><span style="display: block; margin-top: 8px;"><strong>Note:</strong> Enter your workshop start and end dates. Your duration should be entered in Hours/Days.</span>`;
        } else {
          detailsGuide += `<br/><span style="display: block; margin-top: 8px;"><strong>Note:</strong> Enter your training duration in Months, along with training start and end dates.</span>`;
        }
        guideEl.innerHTML = `<p style="margin: 0;">${detailsGuide}</p>`;
      }
    }
  }

  // ─── Highlight helper ───────────────────────────────────────────────────
  function markError(wrapId, focusId) {
    const wrap = document.getElementById(wrapId);
    if (!wrap) return;
    wrap.classList.add("field-error");
    // Remove highlight once user starts fixing
    const input = focusId ? document.getElementById(focusId) : wrap.querySelector("input, select, textarea");
    if (input) {
      input.focus();
      input.scrollIntoView({ behavior: "smooth", block: "center" });
      input.addEventListener("input", () => wrap.classList.remove("field-error"), { once: true });
      input.addEventListener("change", () => wrap.classList.remove("field-error"), { once: true });
    }
  }

  function markDropdownError(wrapId) {
    const wrap = document.getElementById(wrapId);
    if (!wrap) return;
    wrap.classList.add("field-error");
    wrap.scrollIntoView({ behavior: "smooth", block: "center" });
    const input = wrap.querySelector("input");
    if (input) {
      input.focus();
      input.addEventListener("input", () => wrap.classList.remove("field-error"), { once: true });
    }
  }

  function clearAllErrors() {
    document.querySelectorAll(".field-error").forEach(el => el.classList.remove("field-error"));
    const cb = document.getElementById("applyTerms");
    if (cb) cb.classList.remove("field-error-checkbox");
  }
  // ────────────────────────────────────────────────────────────────────────

  function validateStep(step) {
    clearAllErrors();

    if (step === 1) {
      if (!selectedTrainingType) {
        showToast("Select Training Type", "Please select a training type to continue.", "info");
        return false;
      }
      return true;
    }

    if (step === 2) {
      if (!selectedCategory) {
        showToast("Choose a Category", "Please choose a course category to continue.", "info");
        return false;
      }
      return true;
    }

    if (step === 3) {
      if (!courseDropdown.getValue()) {
        showToast("Select a Course", "Please select or type a course name.", "info");
        markDropdownError("courseFieldWrap");
        return false;
      }
      return true;
    }

    if (step === 4) {
      const name  = document.getElementById("applyFullName");
      const phone = document.getElementById("applyPhone");
      const email = document.getElementById("applyEmail");
      const dob   = document.getElementById("applyDob");
      const terms = document.getElementById("applyTerms");

      if (!name.value.trim()) {
        showToast("Required", "Full Name is required.", "error");
        markError("nameFieldWrap", "applyFullName");
        return false;
      }
      const cleanPhone = phone.value.replace(/\s/g, "");
      if (!phone.value.trim() || !/^[6-9]\d{9}$/.test(cleanPhone)) {
        showToast("Invalid", "Please enter a valid 10-digit mobile number.", "error");
        markError("phoneFieldWrap", "applyPhone");
        return false;
      }
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        showToast("Invalid", "Please enter a valid email address.", "error");
        markError("emailFieldWrap", "applyEmail");
        return false;
      }
      if (!dob.value) {
        showToast("Required", "Date of Birth is required.", "error");
        markError("dobFieldWrap", "applyDob");
        return false;
      }
      const needsQual = selectedTrainingType === "College Training" || selectedTrainingType === "Corporate Training";
      if (needsQual && !qualificationDropdown.getValue()) {
        showToast("Required", "Qualification is required.", "error");
        markDropdownError("qualFieldWrap");
        return false;
      }
      if (!durationDropdown.getValue()) {
        showToast("Required", "Duration is required.", "error");
        markDropdownError("durationFieldWrap");
        return false;
      }
      const needsDates = selectedTrainingType !== "Workshop";
      if (needsDates) {
        const startDate = document.getElementById("applyStartDate");
        const endDate = document.getElementById("applyEndDate");

        if (!startDate.value) {
          showToast("Required", "Training Start Date is required.", "error");
          markError("startDateFieldWrap", "applyStartDate");
          return false;
        }
        if (!endDate.value) {
          showToast("Required", "Training End Date is required.", "error");
          markError("endDateFieldWrap", "applyEndDate");
          return false;
        }
        if (new Date(startDate.value) > new Date(endDate.value)) {
          showToast("Invalid", "Start Date cannot be after End Date.", "error");
          markError("startDateFieldWrap", "applyStartDate");
          return false;
        }
      }
      if (selectedTrainingType === "College Training" && !collegeDropdown.getValue()) {
        showToast("Required", "Please select or type your college name.", "error");
        markDropdownError("collegeFieldContainer");
        return false;
      }
      if (selectedTrainingType === "Corporate Training" && !corporateDropdown.getValue()) {
        showToast("Required", "Please select or type your company name.", "error");
        markDropdownError("corporateFieldContainer");
        return false;
      }
      if (!terms.checked) {
        showToast("Required", "You must agree to the Terms & Conditions.", "error");
        terms.classList.add("field-error-checkbox");
        terms.scrollIntoView({ behavior: "smooth", block: "center" });
        terms.focus();
        terms.addEventListener("change", () => terms.classList.remove("field-error-checkbox"), { once: true });
        return false;
      }
      return true;
    }

    return true;
  }

  function navigate(direction) {
    if (direction === 1) {
      if (!validateStep(currentStep)) return;
    }

    currentStep += direction;
    if (currentStep < 1) currentStep = 1;
    if (currentStep > totalSteps) {
      currentStep = totalSteps;
      submitForm();
      return;
    }

    updateProgress();

    // Vibrate to provide physical feedback (especially helpful on mobile devices)
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    // Scroll smoothly to the step title so the selections/inputs are immediately visible at the top
    const stepTitle = document.getElementById("stepTitle");
    if (stepTitle) {
      stepTitle.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      const wizardCard = document.querySelector(".wizard-card");
      if (wizardCard) {
        wizardCard.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    // Autofocus the first input or card in the active step
    const activePanel = document.querySelector(`.wizard-step-panel[data-step="${currentStep}"]`);
    if (activePanel) {
      setTimeout(() => {
        // Focus first visible input, select, textarea, button or card
        const focusTarget = activePanel.querySelector(
          "input:not([type='hidden']), select, textarea, .category-card, .training-type-btn"
        );
        if (focusTarget) {
          focusTarget.focus();
        }
      }, 350); // Small delay to wait for scrolling/transitions
    }
  }

  btnPrev.addEventListener("click", () => navigate(-1));
  btnNext.addEventListener("click", () => navigate(1));

  function formatDateFriendly(dateStr) {
    if (!dateStr) return "";
    const options = { month: "short", day: "numeric", year: "numeric" };
    return new Date(dateStr).toLocaleDateString("en-US", options);
  }

  async function submitForm() {
    const submitBtn = document.getElementById("btnNext");
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    // Map selected training type directly to certificateType enum
    const CERT_TYPE_MAP = {
      "Training":           "Training",
      "College Training":   "Academic Training",
      "Corporate Training": "Corporate Training",
      "Internship":         "Internship",
      "Workshop":           "Workshop",
    };

    const needsDates = selectedTrainingType !== "Workshop";
    let startFmt = "";
    let endFmt = "";
    if (needsDates) {
      startFmt = formatDateFriendly(document.getElementById("applyStartDate").value);
      endFmt = formatDateFriendly(document.getElementById("applyEndDate").value);
    }

    const needsQual = selectedTrainingType === "College Training" || selectedTrainingType === "Corporate Training";

    const payload = {
      fullName:         document.getElementById("applyFullName").value.trim(),
      phoneNumber:      document.getElementById("applyPhone").value.replace(/\s/g, ""), // strip all spaces
      email:            document.getElementById("applyEmail").value.trim(),
      dateOfBirth:      document.getElementById("applyDob").value,
      course:           courseDropdown.getValue(),
      certificateType:  CERT_TYPE_MAP[selectedTrainingType] || "Training",
      duration:         durationDropdown.getValue()
    };

    if (needsQual) {
      payload.qualification = qualificationDropdown.getValue();
    }

    if (selectedTrainingType === "College Training") {
      payload.organization = collegeDropdown.getValue();
    } else if (selectedTrainingType === "Corporate Training") {
      payload.organization = corporateDropdown.getValue();
    }

    if (needsDates) {
      payload.durationDates = `${startFmt} - ${endFmt}`;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/certificate/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit application.");
      }

      showToast("Success", "Application submitted successfully!", false);

      const wizardInner = document.getElementById("wizardFormInner");
      const wizardResult = document.getElementById("wizardResult");

      wizardInner.style.display = "none";
      wizardResult.hidden = false;
      wizardResult.innerHTML = `
        <div class="result-card success" style="text-align: center; padding: 40px 20px;">
          <span style="font-size: 4rem; color: #2e7d32; display: block; margin-bottom: 20px;">✓</span>
          <h2 style="color: #fff; margin-bottom: 10px;">Application Submitted!</h2>
          <p style="color: #aaa; margin-bottom: 25px;">Your application has been received and is under review.</p>
          <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; max-width: 400px; margin: 0 auto 30px;">
            <span style="font-size: 0.9rem; color: #888; display: block; text-transform: uppercase;">Your Application ID:</span>
            <strong style="font-size: 1.5rem; color: #e0a730; display: block; margin-top: 5px;">${data.applicationId}</strong>
          </div>
          <p style="color: #888; font-size: 0.9rem; margin-bottom: 30px;">Please copy and save this ID to track your status later.</p>
          <a href="/check-status.html?appId=${data.applicationId}" class="btn-primary">Check Status</a>
        </div>
      `;

    } catch (err) {
      showToast("Error", err.message, true);
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Application";
    }
  }

  function showToast(title, message, type) {
    // type: 'error' = red, 'info' = blue, 'success' = green (default)
    const backgrounds = {
      error:   "linear-gradient(135deg, #e94c4c, #b83434)",
      info:    "linear-gradient(135deg, #3b82f6, #1d4ed8)",
      success: "linear-gradient(135deg, #1f9d53, #15753d)",
    };
    const bg = backgrounds[type] || backgrounds.success;
    if (typeof window.Toastify === "function") {
      window.Toastify({
        text: `${title}: ${message}`,
        duration: 3500,
        gravity: "top",
        position: "right",
        close: true,
        style: {
          borderRadius: "8px",
          fontWeight: "600",
          background: bg,
        },
      }).showToast();
    } else {
      alert(`${title}: ${message}`);
    }
  }

  // Format Phone Input: Allow only numbers, max 10 digits, add space at 5th digit (format: XXXXX XXXXX)
  const phoneInput = document.getElementById("applyPhone");
  if (phoneInput) {
    phoneInput.setAttribute("maxlength", "11"); // 10 digits + 1 space
    phoneInput.addEventListener("input", (e) => {
      // Allow only numbers
      let val = e.target.value.replace(/\D/g, "");
      
      // Limit to 10 numbers max
      if (val.length > 10) {
        val = val.substring(0, 10);
      }
      
      // Add space at index 5
      if (val.length > 5) {
        e.target.value = val.substring(0, 5) + " " + val.substring(5);
      } else {
        e.target.value = val;
      }
    });
  }

  // Run initialization — sync now, no async needed
  initDropdowns();
  initPhoneAutoFormat();
  initEmailSuggest();
  updateProgress();
});
