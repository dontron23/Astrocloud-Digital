/* =========================================================
   AstroCloud Digital — Shared partials injector
   Injects header, footer, sticky mobile action bar and the
   floating WhatsApp button into every page. Keeps nav DRY:
   change it here once and it updates across all pages.
   ========================================================= */
(function () {
  var A = window.ASTRO;
  var wa = A.waLink();
  var tel = "tel:" + A.phoneTel;

  var logo =
    '<a href="/index.html" class="flex items-center gap-2.5 group" aria-label="AstroCloud Digital home">' +
    '<svg width="34" height="34" viewBox="0 0 40 40" fill="none" aria-hidden="true" class="transition-transform group-hover:scale-105">' +
    '<defs><linearGradient id="lg" x1="0" y1="0" x2="40" y2="40">' +
    '<stop stop-color="#FF7A3D"/><stop offset="0.6" stop-color="#FFB23E"/><stop offset="1" stop-color="#46E0CE"/>' +
    '</linearGradient></defs>' +
    '<path d="M20 3c2.4 6.8 7.2 11.6 14 14-6.8 2.4-11.6 7.2-14 14-2.4-6.8-7.2-11.6-14-14 6.8-2.4 11.6-7.2 14-14Z" fill="url(#lg)"/>' +
    '<circle cx="31" cy="9" r="2.4" fill="#FFD79A"/>' +
    '</svg>' +
    '<span class="font-display text-[1.15rem] font-bold tracking-tight text-white">AstroCloud<span class="text-grad-warm"> Digital</span></span>' +
    "</a>";

  var navItems = [
    ["Home", "/index.html"],
    ["Services", "/services.html"],
    ["Work", "/work.html"],
    ["Pricing", "/pricing.html"],
    ["About", "/about.html"],
    ["Contact", "/contact.html"],
  ];

  var page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (page === "") page = "index.html";

  var navHtml = navItems
    .map(function (it) {
      var active = it[1].toLowerCase().indexOf(page) !== -1 ? " active" : "";
      return '<a href="' + it[1] + '" class="nav-link' + active + '">' + it[0] + "</a>";
    })
    .join("");

  var header =
    '<div class="fixed inset-x-0 top-0 z-50 transition-all duration-300" id="nav-shell">' +
    '<nav class="container-x flex items-center justify-between py-4">' +
    logo +
    '<div class="hidden items-center gap-8 lg:flex">' + navHtml + "</div>" +
    '<div class="hidden items-center gap-3 lg:flex">' +
    '<a href="/free-audit.html" class="btn btn-primary btn-sm">Free Website Audit</a>' +
    '<a href="' + wa + '" target="_blank" rel="noopener" class="btn btn-ghost-dark btn-sm" aria-label="Chat on WhatsApp">' +
    waIcon(18) + "WhatsApp</a>" +
    "</div>" +
    // mobile toggle
    '<button id="menu-btn" class="lg:hidden grid h-11 w-11 place-items-center rounded-xl text-white" aria-label="Open menu" aria-expanded="false">' +
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
    "</button>" +
    "</nav>" +
    // mobile menu panel
    '<div id="mobile-menu" class="lg:hidden hidden border-t border-white/10 bg-ink-950/95 backdrop-blur-lg">' +
    '<div class="container-x flex flex-col gap-1 py-4">' +
    navItems
      .map(function (it) {
        return '<a href="' + it[1] + '" class="rounded-xl px-4 py-3 text-base font-medium text-muted-dark hover:bg-white/5 hover:text-white">' + it[0] + "</a>";
      })
      .join("") +
    '<div class="mt-3 grid grid-cols-1 gap-2">' +
    '<a href="/free-audit.html" class="btn btn-primary w-full">Get my Free Website Audit</a>' +
    '<a href="' + wa + '" target="_blank" rel="noopener" class="btn btn-wa w-full">' + waIcon(18) + "Chat on WhatsApp</a>" +
    "</div></div></div>" +
    "</div>";

  var year = new Date().getFullYear();
  var footer =
    '<footer class="canvas-dark stars relative overflow-hidden pt-20">' +
    '<div class="container-x relative">' +
    '<div class="grid gap-12 pb-14 md:grid-cols-12">' +
    '<div class="md:col-span-5">' +
    logo +
    '<p class="lede-dark mt-5 max-w-sm text-base">Your growth partner for websites, local SEO and digital visibility — built for Kenyan SMEs that want more enquiries, not just a prettier page.</p>' +
    '<div class="mt-6 flex flex-wrap gap-3">' +
    '<a href="' + wa + '" target="_blank" rel="noopener" class="btn btn-wa btn-sm">' + waIcon(16) + "WhatsApp us</a>" +
    '<a href="' + tel + '" class="btn btn-ghost-dark btn-sm">Call ' + A.phoneDisplay + "</a>" +
    "</div>" +
    '<p class="mt-6 text-sm text-muted-dark">📍 ' + A.city + ' &nbsp;·&nbsp; ⚡ We reply within 2 working hours, Mon–Sat</p>' +
    "</div>" +
    '<div class="md:col-span-2"><h4 class="text-sm font-semibold uppercase tracking-widest text-white/60">Company</h4>' +
    '<ul class="mt-4 space-y-3 text-sm text-muted-dark">' +
    foot("/about.html", "About") + foot("/work.html", "Our Work") + foot("/services.html", "Services") + foot("/pricing.html", "Pricing") +
    "</ul></div>" +
    '<div class="md:col-span-2"><h4 class="text-sm font-semibold uppercase tracking-widest text-white/60">Get started</h4>' +
    '<ul class="mt-4 space-y-3 text-sm text-muted-dark">' +
    foot("/free-audit.html", "Free Website Audit") + foot("/contact.html", "Contact us") + foot("/pricing.html#faq", "FAQ") + foot("/contact.html", "Book a call") +
    "</ul></div>" +
    '<div class="md:col-span-3"><h4 class="text-sm font-semibold uppercase tracking-widest text-white/60">Talk to a human</h4>' +
    '<ul class="mt-4 space-y-3 text-sm text-muted-dark">' +
    '<li><a class="hover:text-white" href="mailto:' + A.email + '">' + A.email + "</a></li>" +
    '<li><a class="hover:text-white" href="' + tel + '">' + A.phoneDisplay + "</a></li>" +
    '<li><a class="hover:text-white" href="' + wa + '" target="_blank" rel="noopener">WhatsApp chat</a></li>' +
    "</ul>" +
    '<div class="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-sm text-white/80" aria-label="Google rating">' +
    '<span class="text-sun">★★★★★</span> Loved by local businesses</div>' +
    "</div>" +
    "</div>" +
    '<div class="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-7 text-sm text-muted-dark sm:flex-row">' +
    "<p>© " + year + " AstroCloud Digital. Made in Nairobi 🇰🇪</p>" +
    '<div class="flex flex-wrap items-center gap-x-5 gap-y-2">' +
    '<a class="hover:text-white" href="/privacy.html">Privacy</a>' +
    '<a class="hover:text-white" href="/terms.html">Terms</a>' +
    '<a class="hover:text-white" href="/cookies.html">Cookies</a>' +
    "</div></div>" +
    "</div></footer>";

  var sticky =
    '<div class="fixed inset-x-0 bottom-0 z-50 lg:hidden">' +
    '<div class="m-3 flex gap-2 rounded-2xl bg-ink-900/95 p-2 shadow-2xl ring-1 ring-white/10 backdrop-blur">' +
    '<a href="' + wa + '" target="_blank" rel="noopener" class="btn btn-wa flex-1">' + waIcon(18) + "WhatsApp</a>" +
    '<a href="' + tel + '" class="btn btn-primary flex-1">' + phoneIcon() + "Call</a>" +
    "</div></div>";

  var floatWa =
    '<a href="' + wa + '" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp" ' +
    'class="group fixed bottom-6 right-6 z-50 hidden items-center gap-3 rounded-full bg-[#25D366] px-4 py-4 text-white shadow-2xl transition-transform hover:scale-105 lg:flex">' +
    waIcon(26) +
    '<span class="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-[160px] group-hover:opacity-100">Chat with us</span>' +
    "</a>";

  function setHTML(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }
  setHTML("site-header", header);
  setHTML("site-footer", footer);

  document.body.insertAdjacentHTML("beforeend", sticky + floatWa);

  // Mobile menu toggle
  var btn = document.getElementById("menu-btn");
  var menu = document.getElementById("mobile-menu");
  if (btn && menu) {
    btn.addEventListener("click", function () {
      var open = menu.classList.toggle("hidden") === false;
      btn.setAttribute("aria-expanded", String(open));
    });
  }

  // Sticky nav shrink + background on scroll
  var shell = document.getElementById("nav-shell");
  function onScroll() {
    if (!shell) return;
    if (window.scrollY > 24) {
      shell.classList.add("bg-ink-950/80", "backdrop-blur-lg", "shadow-lg", "ring-1", "ring-white/5");
    } else {
      shell.classList.remove("bg-ink-950/80", "backdrop-blur-lg", "shadow-lg", "ring-1", "ring-white/5");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function foot(href, label) {
    return '<li><a class="hover:text-white" href="' + href + '">' + label + "</a></li>";
  }
  function waIcon(s) {
    return (
      '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.06c-.24.68-1.42 1.32-1.96 1.36-.5.04-1.14.06-1.84-.12-.42-.13-.96-.31-1.66-.61-2.92-1.26-4.82-4.2-4.97-4.4-.14-.2-1.18-1.57-1.18-2.99 0-1.42.74-2.12 1.01-2.41.27-.29.58-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.66.5.24.59.82 2.03.89 2.18.07.14.12.31.02.5-.09.2-.14.31-.28.48-.14.16-.29.36-.42.49-.14.14-.28.29-.12.56.16.27.72 1.18 1.54 1.91 1.06.94 1.96 1.24 2.23 1.38.27.14.43.12.59-.07.16-.2.68-.79.86-1.06.18-.27.36-.22.61-.13.25.09 1.58.75 1.85.88.27.14.45.2.51.31.07.11.07.62-.17 1.3Z"/></svg>'
    );
  }
  function phoneIcon() {
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>';
  }
})();
