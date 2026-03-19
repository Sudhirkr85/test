(function () {
  "use strict";

  // Change this in one place when backend host/port changes.
  const BASE_URL = (window.APP_BASE_URL || "https://sssam.onrender.com").replace(/\/+$/, "");

  const APPLY_API = "/api/certificate/apply";
  const VERIFY_API = "/api/certificate/verify";
  const DOWNLOAD_API = "/api/certificate/download";
  const STATUS_API = "/api/certificate/status";

  const applyForm = document.getElementById("applyCertificateForm");
  const verifyForm = document.getElementById("verifyCertificateForm");
  const downloadForm = document.getElementById("downloadCertificateForm");
  const statusForm = document.getElementById("statusCertificateForm");

  const applyCourse = document.getElementById("applyCourse");
  const otherCourseWrap = document.getElementById("otherCourseWrap");
  const otherCourseName = document.getElementById("otherCourseName");

  function setError(inputEl, errorEl, message) {
    if (inputEl) inputEl.classList.add("is-invalid");
    if (errorEl) errorEl.textContent = message;
  }

  function clearError(inputEl, errorEl) {
    if (inputEl) inputEl.classList.remove("is-invalid");
    if (errorEl) errorEl.textContent = "";
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function isValidPhone(value) {
    return /^[6-9]\d{9}$/.test(value);
  }

  function randomAppId() {
    const number = Math.floor(1000 + Math.random() * 9000);
    return `APP${number}`;
  }

  function safeText(value) {
    return value === undefined || value === null || value === "" ? "N/A" : value;
  }

  function getStatusBadge(statusText) {
    const status = String(statusText || "").toLowerCase();

    if (status === "verified" || status === "approved") {
      return '<span class="status-badge verified">Verified</span>';
    }

    if (status === "pending" || status === "in-progress") {
      return '<span class="status-badge pending">Pending</span>';
    }

    if (status === "rejected" || status === "failed") {
      return '<span class="status-badge rejected">Rejected</span>';
    }

    return '<span class="status-badge pending">Pending</span>';
  }

  function showResult(containerId, html, isError) {
    const card = document.getElementById(containerId);
    if (!card) return;
    card.hidden = false;
    card.classList.toggle("error", !!isError);
    card.innerHTML = html;
    card.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function setLoading(button, isLoading, text) {
    if (!button) return;
    if (isLoading) {
      button.dataset.originalText = button.textContent;
      button.disabled = true;
      button.textContent = text;
    } else {
      button.disabled = false;
      button.textContent = button.dataset.originalText || button.textContent;
    }
  }

  function buildApiUrl(path) {
    return `${BASE_URL}${path}`;
  }

  async function parseJsonSafe(response) {
    return response.json().catch(() => ({}));
  }

  function getErrorMessage(data, fallback) {
    if (data && typeof data.message === "string" && data.message.trim()) {
      return data.message.trim();
    }
    return fallback;
  }

  function notifyUser(message, isError) {
    const text = safeText(message);
    if (isError) {
      window.alert(`Error: ${text}`);
      return;
    }
    window.alert(text);
  }

  function bindLiveClear(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (!input || !error) return;
    input.addEventListener("input", () => clearError(input, error));
    input.addEventListener("change", () => clearError(input, error));
  }

  // Apply form live validation clear
  [
    ["applyFullName", "applyFullNameError"],
    ["applyPhone", "applyPhoneError"],
    ["applyEmail", "applyEmailError"],
    ["applyDob", "applyDobError"],
    ["applyAddress", "applyAddressError"],
    ["applyCourse", "applyCourseError"],
    ["otherCourseName", "otherCourseError"],
    ["certificateType", "certificateTypeError"],
    ["duration", "durationError"],
    ["verifyCertificateNumber", "verifyCertificateNumberError"],
    ["downloadCertificateNumber", "downloadCertificateNumberError"],
    ["downloadDob", "downloadDobError"],
    ["applicationId", "applicationIdError"],
  ].forEach(([id, errorId]) => bindLiveClear(id, errorId));

  // SECTION 1 — Apply Certificate
  if (applyCourse && otherCourseWrap) {
    applyCourse.addEventListener("change", function () {
      const selected = applyCourse.value;
      const isOther = selected === "Other (Course Not Listed)";

      if (isOther) {
        otherCourseWrap.hidden = false;
        requestAnimationFrame(() => {
          otherCourseWrap.classList.add("visible");
        });
      } else {
        otherCourseWrap.classList.remove("visible");
        setTimeout(() => {
          otherCourseWrap.hidden = true;
        }, 260);
      }

      if (!isOther && otherCourseName) {
        otherCourseName.value = "";
        clearError(otherCourseName, document.getElementById("otherCourseError"));
      }
    });
  }

  if (applyForm) {
    applyForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const fullName = document.getElementById("applyFullName");
      const phone = document.getElementById("applyPhone");
      const email = document.getElementById("applyEmail");
      const dob = document.getElementById("applyDob");
      const address = document.getElementById("applyAddress");
      const certificateType = document.getElementById("certificateType");
      const duration = document.getElementById("duration");

      const fullNameError = document.getElementById("applyFullNameError");
      const phoneError = document.getElementById("applyPhoneError");
      const emailError = document.getElementById("applyEmailError");
      const dobError = document.getElementById("applyDobError");
      const addressError = document.getElementById("applyAddressError");
      const courseError = document.getElementById("applyCourseError");
      const otherCourseError = document.getElementById("otherCourseError");
      const certificateTypeError = document.getElementById("certificateTypeError");
      const durationError = document.getElementById("durationError");

      [
        [fullName, fullNameError],
        [phone, phoneError],
        [email, emailError],
        [dob, dobError],
        [address, addressError],
        [applyCourse, courseError],
        [otherCourseName, otherCourseError],
        [certificateType, certificateTypeError],
        [duration, durationError],
      ].forEach(([input, error]) => clearError(input, error));

      let hasError = false;

      if (!fullName.value.trim()) {
        setError(fullName, fullNameError, "Full Name is required.");
        hasError = true;
      }

      if (!phone.value.trim()) {
        setError(phone, phoneError, "Phone Number is required.");
        hasError = true;
      } else if (!isValidPhone(phone.value.trim())) {
        setError(phone, phoneError, "Enter a valid 10-digit phone number.");
        hasError = true;
      }

      if (!email.value.trim()) {
        setError(email, emailError, "Email is required.");
        hasError = true;
      } else if (!isValidEmail(email.value.trim())) {
        setError(email, emailError, "Enter a valid email address.");
        hasError = true;
      }

      if (!dob.value) {
        setError(dob, dobError, "Date of Birth is required.");
        hasError = true;
      }

      if (!address.value.trim()) {
        setError(address, addressError, "Address is required.");
        hasError = true;
      }

      if (!applyCourse.value) {
        setError(applyCourse, courseError, "Please select a course.");
        hasError = true;
      }

      if (applyCourse.value === "Other (Course Not Listed)" && !otherCourseName.value.trim()) {
        setError(otherCourseName, otherCourseError, "Please enter course name.");
        hasError = true;
      }

      if (!certificateType.value) {
        setError(certificateType, certificateTypeError, "Please select certificate type.");
        hasError = true;
      }

      if (!duration.value.trim()) {
        setError(duration, durationError, "Duration is required.");
        hasError = true;
      }

      if (hasError) return;

      const submitButton = applyForm.querySelector("button[type='submit']");
      setLoading(submitButton, true, "Submitting...");

      const payload = {
        fullName: fullName.value.trim(),
        phoneNumber: phone.value.trim(),
        email: email.value.trim(),
        dateOfBirth: dob.value,
        address: address.value.trim(),
        course:
          applyCourse.value === "Other (Course Not Listed)"
            ? otherCourseName.value.trim()
            : applyCourse.value,
        certificateType: certificateType.value,
        duration: duration.value.trim(),
      };

      try {
        const response = await fetch(buildApiUrl(APPLY_API), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await parseJsonSafe(response);

        if (!response.ok || data.success === false) {
          throw new Error(getErrorMessage(data, "Unable to submit application."));
        }

        const applicationId = data.applicationId || randomAppId();
        const successMessage = data.message || "Application Submitted Successfully";

        showResult(
          "applyResult",
          `
            <div class="result-title">${safeText(successMessage)}</div>
            <div class="result-grid">
              <div>Your Application ID: <strong>${safeText(applicationId)}</strong></div>
            </div>
          `,
          false
        );

        notifyUser(`${successMessage}. Application ID: ${applicationId}`, false);

        applyForm.reset();
        otherCourseWrap.hidden = true;
      } catch (error) {
        notifyUser(error.message, true);
        showResult(
          "applyResult",
          `
            <div class="result-title">Submission Failed</div>
            <div class="result-grid">
              <div>${safeText(error.message)}</div>
            </div>
          `,
          true
        );
      } finally {
        setLoading(submitButton, false);
      }
    });
  }

  // SECTION 2 — Verify Certificate
  if (verifyForm) {
    verifyForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const certificateNumber = document.getElementById("verifyCertificateNumber");
      const certificateNumberError = document.getElementById("verifyCertificateNumberError");
      clearError(certificateNumber, certificateNumberError);

      if (!certificateNumber.value.trim()) {
        setError(certificateNumber, certificateNumberError, "Certificate Number is required.");
        return;
      }

      const submitButton = verifyForm.querySelector("button[type='submit']");
      setLoading(submitButton, true, "Verifying...");

      try {
        const query = encodeURIComponent(certificateNumber.value.trim());
        const response = await fetch(`${buildApiUrl(VERIFY_API)}?certificateNumber=${query}`, {
          method: "GET",
        });

        const data = await parseJsonSafe(response);

        if (!response.ok || data.success === false) {
          throw new Error(getErrorMessage(data, "Certificate not found."));
        }

        const statusText = safeText(data.status);
        const title = String(data.success).toLowerCase() === "true" ? "Certificate Verified" : "Verification Result";

        showResult(
          "verifyResult",
          `
            <div class="result-title">${title}</div>
            <div class="result-grid">
              <div>Student Name: <strong>${safeText(data.studentName)}</strong></div>
              <div>Course: <strong>${safeText(data.course)}</strong></div>
              <div>Duration: <strong>${safeText(data.duration)}</strong></div>
              <div>Certificate Number: <strong>${safeText(data.certificateNumber || certificateNumber.value.trim())}</strong></div>
              <div>Issue Date: <strong>${safeText(data.issueDate)}</strong></div>
              <div>Institute Name: <strong>${safeText(data.instituteName)}</strong></div>
              <div>Status: ${getStatusBadge(statusText)}</div>
            </div>
          `,
          false
        );

        notifyUser("Certificate verification completed successfully.", false);
      } catch (error) {
        notifyUser(error.message, true);
        showResult(
          "verifyResult",
          `
            <div class="result-title">Verification Failed</div>
            <div class="result-grid">
              <div>${safeText(error.message)}</div>
            </div>
          `,
          true
        );
      } finally {
        setLoading(submitButton, false);
      }
    });
  }

  // SECTION 3 — Download Certificate
  if (downloadForm) {
    downloadForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const certificateNumber = document.getElementById("downloadCertificateNumber");
      const dob = document.getElementById("downloadDob");
      const certificateNumberError = document.getElementById("downloadCertificateNumberError");
      const dobError = document.getElementById("downloadDobError");

      clearError(certificateNumber, certificateNumberError);
      clearError(dob, dobError);

      let hasError = false;

      if (!certificateNumber.value.trim()) {
        setError(certificateNumber, certificateNumberError, "Certificate Number is required.");
        hasError = true;
      }

      if (!dob.value) {
        setError(dob, dobError, "Date of Birth is required.");
        hasError = true;
      }

      if (hasError) return;

      const submitButton = downloadForm.querySelector("button[type='submit']");
      setLoading(submitButton, true, "Preparing Download...");

      try {
        const response = await fetch(buildApiUrl(DOWNLOAD_API), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            certificateNumber: certificateNumber.value.trim(),
            dateOfBirth: dob.value,
          }),
        });

        const contentType = response.headers.get("content-type") || "";

        if (!response.ok) {
          const errData = contentType.includes("application/json") ? await parseJsonSafe(response) : {};
          throw new Error(getErrorMessage(errData, "Unable to download certificate."));
        }

        if (contentType.includes("application/json")) {
          const jsonData = await parseJsonSafe(response);
          if (jsonData.success === false) {
            throw new Error(getErrorMessage(jsonData, "Unable to download certificate."));
          }
          throw new Error(getErrorMessage(jsonData, "Unexpected response. PDF file not received."));
        }

        const blob = await response.blob();
        if (!blob || blob.size === 0) {
          throw new Error("Received empty PDF file from server.");
        }

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `certificate-${certificateNumber.value.trim() || "document"}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

        showResult(
          "downloadResult",
          `
            <div class="result-title">Download Started</div>
            <div class="result-grid">
              <div>Your certificate PDF is being downloaded.</div>
            </div>
          `,
          false
        );

        notifyUser("Certificate PDF download started.", false);
      } catch (error) {
        notifyUser(error.message, true);
        showResult(
          "downloadResult",
          `
            <div class="result-title">Download Failed</div>
            <div class="result-grid">
              <div>${safeText(error.message)}</div>
            </div>
          `,
          true
        );
      } finally {
        setLoading(submitButton, false);
      }
    });
  }

  // SECTION 4 — Check Application Status
  if (statusForm) {
    statusForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const applicationIdInput = document.getElementById("applicationId");
      const applicationIdError = document.getElementById("applicationIdError");
      clearError(applicationIdInput, applicationIdError);

      const applicationId = applicationIdInput.value.trim();

      if (!applicationId) {
        setError(applicationIdInput, applicationIdError, "Application ID is required.");
        return;
      }

      const submitButton = statusForm.querySelector("button[type='submit']");
      setLoading(submitButton, true, "Checking...");

      try {
        const response = await fetch(`${buildApiUrl(STATUS_API)}/${encodeURIComponent(applicationId)}`, {
          method: "GET",
        });

        const data = await parseJsonSafe(response);

        if (!response.ok || data.success === false) {
          throw new Error(getErrorMessage(data, "Application not found."));
        }

        const approved = String(data.status || "").toLowerCase() === "approved";

        showResult(
          "statusResult",
          `
            <div class="result-title">Application Status</div>
            <div class="result-grid">
              <div>Name: <strong>${safeText(data.name)}</strong></div>
              <div>Course: <strong>${safeText(data.course)}</strong></div>
              <div>Certificate Type: <strong>${safeText(data.certificateType)}</strong></div>
              <div>Status: ${getStatusBadge(data.status)}</div>
              ${
                approved
                  ? `<div>Certificate Number: <strong>${safeText(data.certificateNumber)}</strong></div>
                     <div>Issue Date: <strong>${safeText(data.issueDate)}</strong></div>`
                  : ""
              }
            </div>
          `,
          false
        );

        notifyUser("Application status fetched successfully.", false);
      } catch (error) {
        notifyUser(error.message, true);
        showResult(
          "statusResult",
          `
            <div class="result-title">Status Check Failed</div>
            <div class="result-grid">
              <div>${safeText(error.message)}</div>
            </div>
          `,
          true
        );
      } finally {
        setLoading(submitButton, false);
      }
    });
  }
})();
