document.addEventListener("DOMContentLoaded", () => {
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
