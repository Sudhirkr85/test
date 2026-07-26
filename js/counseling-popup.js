(function() {
  const CP_COURSES = [
    "Data Science",
    "Data Analytics + Power BI",
    "AI & Machine Learning",
    "Full Stack Development with AI",
    "Ethical Hacking & Cyber Security",
    "Digital Marketing & SEO",
    "AWS Cloud Computing",
    "Basic Computer Course"
  ];

  let cpSelected = "";

  function cpRenderList(list) {
    const dd = document.getElementById("cp-course-dd");
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
        cpPickCourse(course);
      };
      dd.appendChild(item);
    });
  }

  window.cpShowDropdown = function() {
    const inp = document.getElementById("cp-course-search");
    inp.style.borderColor = "#e0a730";
    const val = inp.value.trim();
    if (val) {
      cpFilterCourses(val);
    } else {
      cpRenderList(CP_COURSES);
      document.getElementById("cp-course-dd").style.display = "block";
    }
  };

  window.cpFilterCourses = function(val) {
    const filtered = CP_COURSES.filter(function(c) {
      return c.toLowerCase().indexOf(val.toLowerCase()) > -1;
    });

    const exactMatch = CP_COURSES.find(function(c) {
      return c.toLowerCase() === val.trim().toLowerCase();
    });

    if (exactMatch) {
      cpSelected = exactMatch;
    } else {
      cpSelected = "";
    }

    if (filtered.length === 0) {
      document.getElementById("cp-course-dd").style.display = "none";
    } else {
      cpRenderList(filtered);
      document.getElementById("cp-course-dd").style.display = "block";
    }
  };

  function cpPickCourse(course) {
    cpSelected = course;
    document.getElementById("cp-course-search").value = course;
    document.getElementById("cp-course-search").style.borderColor = "#e0a730";
    document.getElementById("cp-course-dd").style.display = "none";
  }

  document.addEventListener("click", function(e) {
    const dd = document.getElementById("cp-course-dd");
    const inp = document.getElementById("cp-course-search");
    if (dd && !dd.contains(e.target) && e.target !== inp) {
      dd.style.display = "none";
    }
  });

  function cpShakeField(el) {
    el.classList.add("cp-shake-field");
    setTimeout(function() {
      el.classList.remove("cp-shake-field");
    }, 400);
  }

  window.openCounselingPopup = function() {
    const popup = document.getElementById("counseling-popup");
    const content = popup.querySelector(".popup-content");
    content.className = "popup-content rocket-enter";
    popup.style.display = "flex";
    document.body.style.overflow = "hidden";
  };

  window.closeCounselingPopup = function() {
    const popup = document.getElementById("counseling-popup");
    if (!popup) return;
    const content = popup.querySelector(".popup-content");
    popup.style.display = "none";
    if (content) content.className = "popup-content";
    document.body.style.overflow = "";
    try {
      sessionStorage.setItem("counselingPopupDismissed", "true");
      localStorage.setItem("counselingPopupDismissed", "true");
    } catch(e) {}
  };

  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
      window.closeCounselingPopup();
    }
  });

  window.cpSubmit = function() {
    const name = document.getElementById("cp-name").value.trim();
    const mobile = document.getElementById("cp-mobile").value.replace(/\s/g, "");
    const courseInput = document.getElementById("cp-course-search").value.trim();
    const email = document.getElementById("cp-email").value.trim();
    const error = document.getElementById("cp-error");

    error.style.display = "none";
    document.getElementById("cp-name").style.borderColor = "#333";
    document.getElementById("cp-mobile").style.borderColor = "#333";
    document.getElementById("cp-course-search").style.borderColor = "#333";
    document.getElementById("cp-email").style.borderColor = "#333";

    if (!name) {
      error.textContent = "⚠ Please enter your full name.";
      error.style.display = "block";
      const field = document.getElementById("cp-name");
      field.style.borderColor = "#ff6b6b";
      cpShakeField(field);
      return;
    }
    if (!/^[a-zA-Z\s.'-]+$/.test(name)) {
      error.textContent = "⚠ Full name must contain only letters and spaces.";
      error.style.display = "block";
      const field = document.getElementById("cp-name");
      field.style.borderColor = "#ff6b6b";
      cpShakeField(field);
      return;
    }
    if (!mobile || mobile.length !== 10 || !/^\d+$/.test(mobile)) {
      error.textContent = "⚠ Please enter a valid 10-digit mobile number.";
      error.style.display = "block";
      const field = document.getElementById("cp-mobile");
      field.style.borderColor = "#ff6b6b";
      cpShakeField(field);
      return;
    }
    if (!courseInput) {
      error.textContent = "⚠ Please select or type a course name.";
      error.style.display = "block";
      const field = document.getElementById("cp-course-search");
      field.style.borderColor = "#ff6b6b";
      cpShakeField(field);
      return;
    }
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        error.textContent = "⚠ Please enter a valid email address.";
        error.style.display = "block";
        const field = document.getElementById("cp-email");
        field.style.borderColor = "#ff6b6b";
        cpShakeField(field);
        return;
      }
    }

    const btn = document.getElementById("cp-submit");
    btn.disabled = true;
    btn.textContent = "Connecting...";

    const content = document.querySelector("#counseling-popup .popup-content");
    content.className = "popup-content rocket-exit";

    setTimeout(function() {
      document.getElementById("counseling-form").style.display = "none";
      document.getElementById("counseling-success").style.display = "block";
      content.className = "popup-content thankyou-enter";
    }, 450);

    const msg = encodeURIComponent(
      "Hi SSSAM Academy! I am " + name +
      " and I am interested in " + courseInput +
      " course at your Gurugram institute." +
      " My mobile number is " + mobile +
      (email ? " and my email is " + email : "") +
      ". Please guide me."
    );

    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const BASE_URL = isLocal ? `${window.location.protocol}//${window.location.hostname}:5000` : 'https://api.sssamacademy.com';
    fetch(`${BASE_URL}/api/enquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: name,
        phoneNumber: mobile,
        course: courseInput,
        customCourseName: "",
        email: email || null
      })
    }).catch(function(err) {
      console.warn("Failed to hit backend API:", err);
    });

    setTimeout(function() {
      window.open("https://wa.me/919217031899?text=" + msg, "_blank");
      window.closeCounselingPopup();
      setTimeout(function() {
        document.getElementById("counseling-form").style.display = "block";
        document.getElementById("counseling-success").style.display = "none";
        document.getElementById("cp-name").value = "";
        document.getElementById("cp-mobile").value = "";
        document.getElementById("cp-course-search").value = "";
        document.getElementById("cp-course-search").placeholder =
          "Course Interested In * (type to search)";
        document.getElementById("cp-email").value = "";
        cpSelected = "";
        btn.disabled = false;
        btn.textContent = "Get Free Counseling 🎓";
      }, 300);
    }, 2500);
  };

  setTimeout(function() {
    try {
      window.openCounselingPopup();
    } catch(e) {}
  }, 7000);

})();
