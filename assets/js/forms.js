/* =========================================================
   AstroCloud Digital — Lead form handling (no backend)
   - Client-side validation + inline errors
   - Honeypot spam trap
   - Primary path: send straight to WhatsApp (always works)
   - Optional path: deliver by email via Formspree
   ========================================================= */
(function () {
  var A = window.ASTRO;

  document.querySelectorAll("form[data-lead]").forEach(function (form) {
    var status = form.querySelector("[data-status]");
    var waBtn = form.querySelector("[data-wa-submit]");

    function fieldErr(input, msg) {
      var wrap = input.closest("[data-field]") || input.parentElement;
      var e = wrap.querySelector(".err");
      if (!e) {
        e = document.createElement("p");
        e.className = "err mt-1.5 text-sm text-red-500";
        wrap.appendChild(e);
      }
      e.textContent = msg || "";
      input.setAttribute("aria-invalid", msg ? "true" : "false");
    }

    function validate() {
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (input) {
        var v = (input.value || "").trim();
        if (!v) { fieldErr(input, "This field is required."); ok = false; return; }
        if (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
          fieldErr(input, "Enter a valid email."); ok = false; return;
        }
        if (input.dataset.phone !== undefined && !/^[0-9+\s()-]{7,}$/.test(v)) {
          fieldErr(input, "Enter a valid phone / WhatsApp number."); ok = false; return;
        }
        fieldErr(input, "");
      });
      return ok;
    }

    function collect() {
      var data = {};
      form.querySelectorAll("input,select,textarea").forEach(function (el) {
        if (!el.name || el.name === "company_website") return; // skip honeypot
        if (el.type === "checkbox") { if (el.checked) data[el.name] = "Yes"; }
        else if (el.value) { data[el.name] = el.value.trim(); }
      });
      return data;
    }

    function toWaMessage(data) {
      var lines = ["New enquiry via AstroCloud website:"];
      Object.keys(data).forEach(function (k) {
        var label = k.replace(/_/g, " ").replace(/\b\w/g, function (c) { return c.toUpperCase(); });
        lines.push(label + ": " + data[k]);
      });
      return lines.join("\n");
    }

    // Honeypot check
    function isSpam() {
      var hp = form.querySelector('[name="company_website"]');
      return hp && hp.value.trim() !== "";
    }

    // Send via WhatsApp (guaranteed, no backend)
    if (waBtn) {
      waBtn.addEventListener("click", function () {
        if (isSpam()) return;
        if (!validate()) return;
        window.open(A.waLink(toWaMessage(collect())), "_blank", "noopener");
      });
    }

    // Email submit via Formspree (optional)
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (isSpam()) return;
      if (!validate()) return;

      var endpoint = A.formspree;
      if (!endpoint || endpoint.indexOf("REPLACE_WITH_YOUR_ID") !== -1) {
        // No email backend configured yet — fall back to WhatsApp so no lead is lost.
        window.open(A.waLink(toWaMessage(collect())), "_blank", "noopener");
        if (status) {
          status.className = "mt-4 rounded-xl bg-sky/10 p-4 text-sm text-ink-900";
          status.textContent = "Opening WhatsApp so we get your message instantly. (Tip: connect Formspree in config.js to also receive these by email.)";
        }
        return;
      }

      var btn = form.querySelector('[type="submit"]');
      var original = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }

      fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      })
        .then(function (r) {
          if (r.ok) {
            if (form.dataset.redirect) {
              window.location.href = form.dataset.redirect;
              return;
            }
            form.reset();
            if (status) {
              status.className = "mt-4 rounded-xl bg-green-50 p-4 text-sm text-green-800 ring-1 ring-green-200";
              status.textContent = "Thank you! Your request is in. We reply within 2 working hours, Mon–Sat.";
            }
          } else {
            throw new Error("bad response");
          }
        })
        .catch(function () {
          // network/email failed — never lose the lead
          window.open(A.waLink(toWaMessage(collect())), "_blank", "noopener");
          if (status) {
            status.className = "mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-900 ring-1 ring-amber-200";
            status.textContent = "We opened WhatsApp so your message reaches us instantly.";
          }
        })
        .finally(function () {
          if (btn) { btn.disabled = false; btn.textContent = original; }
        });
    });
  });
})();
