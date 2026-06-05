/* =========================================================
   AstroCloud Digital — UI interactions
   Scroll reveal · FAQ accordion · before/after slider ·
   animated counters · mini ROI calculator · cookie banner
   ========================================================= */
(function () {
  /* ---- Scroll reveal ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e, i) {
          if (e.isIntersecting) {
            e.target.style.transitionDelay = (e.target.dataset.delay || 0) + "ms";
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    if (!q || !a) return;
    q.addEventListener("click", function () {
      var open = item.classList.toggle("open");
      q.setAttribute("aria-expanded", String(open));
      a.style.maxHeight = open ? a.scrollHeight + "px" : 0;
    });
  });

  /* ---- Before / After slider ---- */
  document.querySelectorAll(".ba-wrap").forEach(function (wrap) {
    var before = wrap.querySelector(".ba-before");
    var handle = wrap.querySelector(".ba-handle");
    if (!before || !handle) return;
    var set = function (pct) {
      pct = Math.max(0, Math.min(100, pct));
      before.style.width = pct + "%";
      handle.style.left = pct + "%";
    };
    var move = function (clientX) {
      var rect = wrap.getBoundingClientRect();
      set(((clientX - rect.left) / rect.width) * 100);
    };
    var dragging = false;
    wrap.addEventListener("pointerdown", function (e) { dragging = true; move(e.clientX); });
    window.addEventListener("pointermove", function (e) { if (dragging) move(e.clientX); });
    window.addEventListener("pointerup", function () { dragging = false; });
    set(52);
  });

  /* ---- Animated counters ---- */
  var counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var target = parseFloat(el.dataset.count);
        var suffix = el.dataset.suffix || "";
        var dur = 1400, start = null;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          var val = target * eased;
          el.textContent = (target % 1 === 0 ? Math.round(val) : val.toFixed(1)) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { cio.observe(c); });
  }

  /* ---- Mini ROI calculator (pricing page) ---- */
  var roi = document.getElementById("roi");
  if (roi) {
    var visitors = document.getElementById("roi-visitors");
    var rate = document.getElementById("roi-rate");
    var value = document.getElementById("roi-value");
    var outLeads = document.getElementById("roi-leads");
    var outRevenue = document.getElementById("roi-revenue");
    var rateLabel = document.getElementById("roi-rate-label");
    function fmt(n) { return "KES " + Math.round(n).toLocaleString("en-KE"); }
    function calc() {
      var v = +visitors.value, r = +rate.value, val = +value.value;
      var leads = v * (r / 100);
      if (rateLabel) rateLabel.textContent = r.toFixed(1) + "%";
      if (outLeads) outLeads.textContent = Math.round(leads).toLocaleString("en-KE");
      if (outRevenue) outRevenue.textContent = fmt(leads * val);
    }
    [visitors, rate, value].forEach(function (el) {
      if (el) { el.addEventListener("input", calc); }
    });
    calc();
  }

  /* ---- Cookie consent banner (DPA-friendly) ---- */
  try {
    if (!localStorage.getItem("ac_cookie_ok")) {
      var bar = document.createElement("div");
      bar.className = "fixed bottom-0 left-0 right-0 z-[60] p-3 sm:p-4";
      bar.innerHTML =
        '<div class="container-x"><div class="mx-auto flex max-w-3xl flex-col items-center gap-3 rounded-2xl bg-ink-900 p-4 text-sm text-white shadow-2xl ring-1 ring-white/10 sm:flex-row sm:gap-5">' +
        '<p class="text-muted-dark">We use privacy-friendly analytics to improve this site. See our <a class="text-sun underline" href="/cookies.html">Cookie Policy</a>.</p>' +
        '<div class="flex shrink-0 gap-2">' +
        '<button id="ck-no" class="btn btn-ghost-dark btn-sm">Decline</button>' +
        '<button id="ck-yes" class="btn btn-primary btn-sm">Accept</button></div>' +
        "</div></div>";
      document.body.appendChild(bar);
      var close = function (v) { try { localStorage.setItem("ac_cookie_ok", v); } catch (e) {} bar.remove(); };
      document.getElementById("ck-yes").onclick = function () { close("yes"); };
      document.getElementById("ck-no").onclick = function () { close("no"); };
    }
  } catch (e) {}

  /* ---- Footer year fallback (if any [data-year]) ---- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
