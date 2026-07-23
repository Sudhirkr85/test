if (!window.APP_BASE_URL) {
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  window.APP_BASE_URL = isLocal ? `${window.location.protocol}//${window.location.hostname}:5000` : 'https://sssam-be.onrender.com';
}
((window.toggleFAQ = function (e) {
  const t = e.parentElement,
    o = t.querySelector(".faq-answer"),
    n = e;
  (document.querySelectorAll(".faq-item").forEach((e) => {
    if (e !== t) {
      const t = e.querySelector(".faq-question"),
        o = e.querySelector(".faq-answer");
      (t && t.classList.remove("active"), o && o.classList.remove("active"));
    }
  }),
    n.classList.toggle("active"),
    o && o.classList.toggle("active"));
}),
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".faq-question").forEach((e) => {
      (e.setAttribute("tabindex", "0"),
        e.setAttribute("role", "button"),
        e.addEventListener("keydown", (t) => {
          ("Enter" !== t.key && " " !== t.key) ||
            (t.preventDefault(), window.toggleFAQ(e));
        }));
    });
  }),
  document.addEventListener("DOMContentLoaded", () => {
    const e = window.location.pathname.includes("/courses/")
      ? "../components/navbar.html"
      : "components/navbar.html";
    fetch(e)
      .then((e) => e.text())
      .then((e) => {
        document.body.insertAdjacentHTML("afterbegin", e);
        const t = document.querySelector(".nav_content");
        t && t.classList.add("nav-slide-in");
        (document.querySelector(".hamburger"),
          document.querySelector(".mobile-menu"));
        const o = document.getElementById("themeToggle"),
          n = document.getElementById("mobileThemeToggle"),
          s = document.querySelector(".dropdown-toggle"),
          c = document.querySelector(".nav-dropdown"),
          a = document.querySelector(".mobile-dropdown-toggle"),
          l = document.querySelector(".mobile-dropdown");
        ((window.initNavbarBurger = function () {
          const e = document.querySelector(".hamburger"),
            t = document.querySelector(".mobile-menu");
          if (e && t) {
            const o = e.cloneNode(!0);
            (e.parentNode.replaceChild(o, e),
              o.addEventListener("click", () => {
                t.classList.toggle("show");
              }));
          }
        }),
          window.initNavbarBurger(),
          a &&
            l &&
            a.addEventListener("click", () => {
              l.classList.toggle("open");
              const e = l.classList.contains("open");
              a.setAttribute("aria-expanded", e ? "true" : "false");
            }),
          s &&
            c &&
            (s.addEventListener("click", (e) => {
              (e.preventDefault(), c.classList.toggle("open"));
              const t = c.classList.contains("open");
              s.setAttribute("aria-expanded", t ? "true" : "false");
            }),
            document.addEventListener("click", (e) => {
              c.contains(e.target) ||
                (c.classList.remove("open"),
                s.setAttribute("aria-expanded", "false"));
            })));
        const i = localStorage.getItem("theme");
        ("light" !== i && i
          ? (document.body.classList.remove("light-mode"),
            o && (o.textContent = "🌙"),
            n && (n.textContent = "🌙"))
          : (document.body.classList.add("light-mode"),
            o && (o.textContent = "☀️"),
            n && (n.textContent = "☀️")),
          o &&
            o.addEventListener("click", () => {
              (document.body.classList.toggle("light-mode"),
                document.body.classList.contains("light-mode")
                  ? (localStorage.setItem("theme", "light"),
                    (o.textContent = "☀️"),
                    n && (n.textContent = "☀️"))
                  : (localStorage.setItem("theme", "dark"),
                    (o.textContent = "🌙"),
                    n && (n.textContent = "🌙")));
            }),
          n &&
            n.addEventListener("click", () => {
              (document.body.classList.toggle("light-mode"),
                document.body.classList.contains("light-mode")
                  ? (localStorage.setItem("theme", "light"),
                    o && (o.textContent = "☀️"),
                    (n.textContent = "☀️"))
                  : (localStorage.setItem("theme", "dark"),
                    o && (o.textContent = "🌙"),
                    (n.textContent = "🌙")));
            }));
        const d = window.location.pathname.split("/").pop(),
          r = "" === d || "/" === d || "index.html" === d;
        (document.querySelectorAll(".nav-links a").forEach((e) => {
          const t = e.getAttribute("href");
          let o = "";
          try {
            t &&
              (o = new URL(t, window.location.origin).pathname
                .split("/")
                .pop());
          } catch (e) {
            o = (t || "").split("/").pop().split("#")[0];
          }
          !r || ("/" !== t && "index.html" !== t)
            ? o === d && e.classList.add("active")
            : e.classList.add("active");
        }),
          document.querySelectorAll(".mobile-menu a").forEach((e) => {
            const t = e.getAttribute("href");
            let o = "";
            try {
              t &&
                (o = new URL(t, window.location.origin).pathname
                  .split("/")
                  .pop());
            } catch (e) {
              o = (t || "").split("/").pop().split("#")[0];
            }
            !r || ("/" !== t && "index.html" !== t)
              ? o === d && e.classList.add("active")
              : e.classList.add("active");
          }));
      });
  }),
  document.addEventListener("DOMContentLoaded", () => {
    if (!document.querySelector(".why-choose-sssam")) return;
    const e = new IntersectionObserver(
      (t) => {
        t.forEach((t) => {
          t.isIntersecting &&
            (t.target.classList.add("anim-visible"), e.unobserve(t.target));
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".why-choose-item").forEach((t, o) => {
      (t.classList.add("anim-fade-up"),
        (t.style.transitionDelay = 0.1 * o + "s"),
        e.observe(t));
    });
  }),
  document.addEventListener("DOMContentLoaded", () => {
    const e = window.location.pathname.includes("/courses/")
      ? "../components/footer.html"
      : "components/footer.html";
    fetch(e)
      .then((e) => e.text())
      .then((e) => {
        document.body.insertAdjacentHTML("beforeend", e);
        const t = window.location.pathname.split("/").pop(),
          o = "" === t || "/" === t || "index.html" === t;
        document.querySelectorAll(".footer-box#box2 a").forEach((e) => {
          const n = e.getAttribute("href");
          !o || ("/" !== n && "index.html" !== n)
            ? n === t && e.classList.add("active-footer")
            : e.classList.add("active-footer");
        });
      });
  }),
  document.querySelectorAll(".feature-card").forEach((e) => {
    let t = null;
    (e.addEventListener("mouseenter", () => {
      t = e.getBoundingClientRect();
    }),
      e.addEventListener("mousemove", (o) => {
        t || (t = e.getBoundingClientRect());
        const n = t.left + t.width / 2,
          s = t.top + t.height / 2,
          c = Math.atan2(o.clientY - s, o.clientX - n);
        e.style.setProperty("--mouse-angle", `${c}rad`);
      }),
      e.addEventListener("mouseleave", () => {
        t = null;
      }));
  }));
