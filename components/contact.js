document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const loader = document.getElementById("form-loader");
  const successModal = document.getElementById("form-success");
  const successClose = document.getElementById("success-close");
  const successOk = document.getElementById("success-ok");

  // ✔ Your SheetDB API URL
  const WEB_APP_URL = "https://sheetdb.io/api/v1/pjk7vjr2a5hs5";

  function showLoader(show = true) {
    loader.setAttribute("aria-hidden", show ? "false" : "true");
  }
  function showSuccess(show = true) {
    successModal.setAttribute("aria-hidden", show ? "false" : "true");
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.querySelector("#name").value.trim();
    const email = form.querySelector("#email").value.trim();
    const phone = form.querySelector("#phone").value.trim();
    const subject = form.querySelector("#subject").value.trim();
    const message = form.querySelector("#message").value.trim();

    if (!name || !email || !phone || !subject || !message) {
      alert("Please fill all fields properly.");
      return;
    }

    const data = {
      timestamp: new Date().toLocaleString(),
      name,
      email,
      phone,
      subject,
      message
    };

    showLoader(true);

    try {
      const res = await fetch(WEB_APP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [data] })
      });

      if (res.ok) {
        form.reset();
        showLoader(false);
        showSuccess(true);
      } else {
        showLoader(false);
        alert("Error submitting form.");
      }

    } catch (err) {
      console.error(err);
      showLoader(false);
      alert("Network error. Try again.");
    }
  });

  if (successClose) successClose.addEventListener("click", () => showSuccess(false));
  if (successOk) successOk.addEventListener("click", (e) => { e.preventDefault(); showSuccess(false); });

  // Contact FAQ accordion
  const faqToggles = document.querySelectorAll("#contact-faq .faq-toggle");

  if (faqToggles.length) {
    faqToggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const isExpanded = toggle.getAttribute("aria-expanded") === "true";
        const panelId = toggle.getAttribute("aria-controls");
        const panel = panelId ? document.getElementById(panelId) : null;

        faqToggles.forEach((btn) => {
          const id = btn.getAttribute("aria-controls");
          const target = id ? document.getElementById(id) : null;
          btn.setAttribute("aria-expanded", "false");
          if (target) target.hidden = true;
        });

        if (!isExpanded && panel) {
          toggle.setAttribute("aria-expanded", "true");
          panel.hidden = false;
        }
      });
    });
  }
});
