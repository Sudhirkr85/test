/**
 * Certificate Services Controller (Verify + Download) for SSSAM Academy
 */
document.addEventListener("DOMContentLoaded", () => {
  const BASE_URL = (window.APP_BASE_URL || "https://sssam.onrender.com").replace(/\/+$/, "");

  // Tab switching logic
  const tabs = document.querySelectorAll(".service-tab-btn");
  const panels = document.querySelectorAll(".tab-panel");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));

      tab.classList.add("active");
      const targetId = `panel-${tab.getAttribute("data-tab")}`;
      document.getElementById(targetId).classList.add("active");
    });
  });

  // Automatically load inputs from URL query params & verify
  const urlParams = new URLSearchParams(window.location.search);
  const certNoParam = urlParams.get("cert") || urlParams.get("certNo");
  const dobParam = urlParams.get("dob");
  const tabParam = urlParams.get("tab");

  // Handle explicit tab routing from URL (e.g. ?tab=download or ?tab=verify)
  if (tabParam === "download" || dobParam) {
    const downloadTab = document.querySelector('[data-tab="download"]');
    if (downloadTab) downloadTab.click();
  } else if (tabParam === "verify") {
    const verifyTab = document.querySelector('[data-tab="verify"]');
    if (verifyTab) verifyTab.click();
  }

  if (certNoParam) {
    if (dobParam) {
      document.getElementById("downloadCertificateNumber").value = certNoParam;
      document.getElementById("downloadDob").value = dobParam;
    } else {
      // Populate verify tab & auto-verify
      const verifyInput = document.getElementById("verifyCertificateNumber");
      if (verifyInput) {
        verifyInput.value = certNoParam;
        const verifyForm = document.getElementById("verifyCertificateForm");
        if (verifyForm) {
          setTimeout(() => {
            verifyForm.dispatchEvent(new Event("submit"));
          }, 100);
        }
      }
    }
  }

  // ----------------------------------------------------
  // VERIFY CERTIFICATE FORM
  // ----------------------------------------------------
  const verifyForm = document.getElementById("verifyCertificateForm");
  const verifyResult = document.getElementById("verifyResult");

  if (verifyForm) {
    verifyForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const input = document.getElementById("verifyCertificateNumber");
      const error = document.getElementById("verifyCertificateNumberError");

      input.classList.remove("is-invalid");
      error.textContent = "";

      const certNo = input.value.trim();
      if (!certNo) {
        input.classList.add("is-invalid");
        error.textContent = "Certificate Number is required.";
        return;
      }

      const btn = document.getElementById("btnVerify");
      btn.disabled = true;
      btn.textContent = "Verifying...";

      try {
        // MUST URL-encode since cert numbers contain "/"
        const encodedCert = encodeURIComponent(certNo);
        const res = await fetch(`${BASE_URL}/api/certificate/verify?certificateNumber=${encodedCert}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Certificate not found.");
        }

        const isLegacy = data.isLegacy;
        const statusText = data.status || (isLegacy ? "Valid (Legacy Record)" : "Active");

        verifyResult.hidden = false;
        verifyResult.innerHTML = `
          <div class="result-title">Verification Successful</div>
          <div class="result-grid" style="margin-top: 15px;">
            <div>Student Name: <strong>${data.studentName}</strong></div>
            <div>Course: <strong>${data.course}</strong></div>
            <div>Training Type: <strong>${data.certificateType}</strong></div>
            <div>Certificate Number: <strong>${data.certificateNumber}</strong></div>
            <div>Issue Date: <strong>${data.issueDate}</strong></div>
            <div>Organization: <strong>${data.organization || "SSSAM Academy"}</strong></div>
            <div class="status-row" style="margin-top: 10px;">
              <span>Status:</span> 
              <span class="status-badge verified">${statusText}</span>
            </div>
            ${isLegacy ? `
              <div style="margin-top: 12px; font-size: 0.85rem; color: #ffc857; font-style: italic;">
                Note: Verified from legacy pre-2026 academy records.
              </div>
            ` : ""}
          </div>
        `;

        if (document.body.classList.contains("light-mode")) {
          const t = verifyResult.querySelector(".result-title");
          if (t) t.style.color = "#0f172a";
        }

        showToast("Success", "Certificate verification successful!", false);

      } catch (err) {
        verifyResult.hidden = false;
        verifyResult.innerHTML = `
          <div class="result-title" style="color: #ef5350;">Verification Failed</div>
          <div class="result-grid" style="margin-top: 10px;">
            <div>${err.message}</div>
          </div>
        `;
        showToast("Error", err.message, true);
      } finally {
        btn.disabled = false;
        btn.textContent = "Verify Authenticity";
      }
    });
  }

  // ----------------------------------------------------
  // DOWNLOAD CERTIFICATE FORM
  // ----------------------------------------------------
  const downloadForm = document.getElementById("downloadCertificateForm");
  const downloadResult = document.getElementById("downloadResult");

  if (downloadForm) {
    downloadForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const certInput = document.getElementById("downloadCertificateNumber");
      const dobInput = document.getElementById("downloadDob");
      const certError = document.getElementById("downloadCertificateNumberError");
      const dobError = document.getElementById("downloadDobError");

      certInput.classList.remove("is-invalid");
      dobInput.classList.remove("is-invalid");
      certError.textContent = "";
      dobError.textContent = "";

      const certNo = certInput.value.trim();
      const dob = dobInput.value;

      let hasError = false;
      if (!certNo) {
        certInput.classList.add("is-invalid");
        certError.textContent = "Certificate Number is required.";
        hasError = true;
      }
      if (!dob) {
        dobInput.classList.add("is-invalid");
        dobError.textContent = "Date of Birth is required.";
        hasError = true;
      }

      if (hasError) return;

      const btn = document.getElementById("btnDownload");
      btn.disabled = true;
      btn.textContent = "Processing...";

      try {
        const res = await fetch(`${BASE_URL}/api/certificate/download`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ certificateNumber: certNo, dateOfBirth: dob })
        });

        const contentType = res.headers.get("content-type") || "";

        if (!res.ok) {
          const errData = contentType.includes("application/json") ? await res.json() : {};
          throw new Error(errData.message || "Failed to find certificate or authentication failed.");
        }

        // If JSON is returned, check if PDF is missing (reissue needed) or if pdfUrl is provided.
        if (contentType.includes("application/json")) {
          const jsonData = await res.json();
          if (jsonData.canReissueManually) {
            downloadResult.hidden = false;
            downloadResult.innerHTML = `
              <div class="result-title" style="color: #ffc857;">Manual Reissue Required</div>
              <div class="result-grid" style="margin-top: 10px;">
                <p style="color: #bbb; line-height: 1.5;">${jsonData.message}</p>
                <div style="margin-top: 15px;">
                  <a href="/contact.html?subject=Legacy%20Certificate%20Reissue&message=Hi,%20I%20would%20like%20to%20request%20a%20digitized%20copy%20for%20my%20legacy%20certificate%20number%20${encodeURIComponent(certNo)}." class="btn-primary" style="display: inline-block;">Contact Academy Support</a>
                </div>
              </div>
            `;
            if (document.body.classList.contains("light-mode")) {
              const para = downloadResult.querySelector("p");
              if (para) para.style.color = "#334155";
            }
            showToast("Warning", "Certificate verified, but PDF not digitized yet.", true);
            return;
          }

          if (jsonData.pdfUrl) {
            // Open or download the url
            window.open(jsonData.pdfUrl, "_blank");
            downloadResult.hidden = false;
            downloadResult.innerHTML = `
              <div class="result-title">Download Completed</div>
              <div class="result-grid" style="margin-top: 10px;">
                <div>Your legacy certificate has been opened in a new tab.</div>
              </div>
            `;
            showToast("Success", "Redirected to legacy certificate file.", false);
            return;
          }

          throw new Error(jsonData.message || "Unexpected JSON response from server.");
        }

        // Otherwise, it is standard dynamic binary PDF stream!
        const blob = await res.blob();
        if (!blob || blob.size === 0) {
          throw new Error("Received empty PDF document from the server.");
        }

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        // Replace / characters with _ for standard safe download filenames
        link.download = `certificate-${certNo.replace(/\//g, "_")}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

        downloadResult.hidden = false;
        downloadResult.innerHTML = `
          <div class="result-title">Download Successful</div>
          <div class="result-grid" style="margin-top: 10px;">
            <div>Your PDF certificate has been generated and downloaded.</div>
          </div>
        `;
        showToast("Success", "Download started successfully!", false);

      } catch (err) {
        downloadResult.hidden = false;
        downloadResult.innerHTML = `
          <div class="result-title" style="color: #ef5350;">Download Failed</div>
          <div class="result-grid" style="margin-top: 10px;">
            <div>${err.message}</div>
          </div>
        `;
        showToast("Error", err.message, true);
      } finally {
        btn.disabled = false;
        btn.textContent = "Download Certificate PDF";
      }
    });
  }

  function showToast(title, message, isError) {
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
          background: isError
            ? "linear-gradient(135deg, #e94c4c, #b83434)"
            : "linear-gradient(135deg, #1f9d53, #15753d)",
        },
      }).showToast();
    }
  }
});
