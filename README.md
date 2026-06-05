# AstroCloud Digital — Website

A fast, mobile-first marketing website for a Nairobi web-design studio. Pure **static** site: HTML + compiled **Tailwind CSS** + vanilla **JavaScript**. No backend, no framework, no build step required to deploy.

---

## ✅ What's included

| Page | File |
|------|------|
| Home | `index.html` |
| Services | `services.html` |
| Pricing (+ ROI calculator) | `pricing.html` |
| Work / Case studies | `work.html` |
| About | `about.html` |
| Contact (lead form) | `contact.html` |
| Free Website Audit (lead magnet) | `free-audit.html` |
| Thank-you (form redirect) | `thank-you.html` |
| 404 | `404.html` |
| Privacy / Terms / Cookies | `privacy.html`, `terms.html`, `cookies.html` |

Features: sticky mobile WhatsApp + Call bar, floating WhatsApp button, mobile-first responsive design, SEO tags + JSON-LD + sitemap/robots, contact & audit forms (with WhatsApp fallback), FAQ accordions, pricing cards, testimonials, case studies, before/after slider, animated counters, ROI calculator, cookie consent.

---

## ✏️ STEP 1 — Edit your details (do this first)

Open **`assets/js/config.js`** and change these once — they power every link on the site:

```js
whatsapp:     "254700123456",            // your WhatsApp number, digits only, no +
phoneDisplay: "+254 700 123 456",        // how the number is shown
phoneTel:     "+254700123456",           // the click-to-call number
email:        "hello@astrocloud.digital",
formspree:    "https://formspree.io/f/REPLACE_WITH_YOUR_ID",  // optional, see Step 2
bookingUrl:   "https://cal.com/astrocloud/intro",             // optional
```

Also replace `https://astrocloud.digital` with your real domain in each page's
`<link rel="canonical">`, the Open Graph tags, `sitemap.xml` and `robots.txt`
(a quick find-and-replace across the folder does it).

## 📨 STEP 2 — Make the forms deliver email (optional but recommended)

The forms work **out of the box via WhatsApp** with no setup. To *also* receive
submissions by email:

1. Create a free form at [formspree.io](https://formspree.io) (or Web3Forms / Tally).
2. Paste the endpoint into `formspree` in `config.js`.

If you skip this, the form simply opens WhatsApp with the details pre-filled — no lead is ever lost.

---

## 🚀 Deploy to Cloudflare Pages (recommended, free)

The site is **already built** — `assets/css/tailwind.css` is compiled, so no build command is needed.

**Option A — drag & drop**
1. Log in to Cloudflare → **Workers & Pages** → **Create** → **Pages** → **Upload assets**.
2. Drag the whole project folder in. Done.

**Option B — connect Git**
1. Push this folder to a GitHub repo.
2. Cloudflare Pages → **Connect to Git** → pick the repo.
3. Build settings:
   - **Framework preset:** `None`
   - **Build command:** *(leave empty)* — or `npm run build` if you edit styles (see below)
   - **Build output directory:** `/` (the repo root)
4. Save & deploy, then add your custom domain under **Custom domains**.

> Also deploys as-is to **GitHub Pages**, **Netlify**, or any static host.

---

## 🎨 Editing the design / styles

Styling uses Tailwind. The class definitions live in `assets/css/input.css` and the
theme in `tailwind.config.js`. If you change any classes, recompile:

```bash
npm install          # first time only
npm run build        # rebuild assets/css/tailwind.css (minified)
# or, while editing:
npm run watch
```

Brand colours and fonts are defined in `tailwind.config.js`
(navy `ink`, amber `sun`, cyan `sky`; fonts Bricolage Grotesque + Plus Jakarta Sans).

---

## ⚠️ Before you go live — honesty & legal checklist

- **Testimonials** in `index.html` are realistic *examples*. Replace them with **real, permission-given** client quotes (or remove the section) before launch. Look for the `NOTE:` comment in the file.
- **Case studies** in `work.html` are clearly labelled **"Concept build"**. Swap in real client work — and never invent client logos, names or result figures.
- **Legal pages** (`privacy.html`, `terms.html`, `cookies.html`) are **templates, not legal advice**. Review them with a qualified advisor and register with Kenya's **Office of the Data Protection Commissioner (ODPC)** where required (Data Protection Act, 2019).
- Replace the placeholder WhatsApp number, email and domain (Step 1).

---

## 🗂 Project structure

```
astrocloud/
├── index.html  services.html  pricing.html  work.html
├── about.html  contact.html   free-audit.html
├── thank-you.html  404.html
├── privacy.html  terms.html  cookies.html
├── robots.txt  sitemap.xml  manifest.webmanifest  _redirects
├── package.json  tailwind.config.js  README.md
└── assets/
    ├── css/  input.css  tailwind.css
    ├── js/   config.js  partials.js  main.js  forms.js
    └── img/  favicon.svg  og-image.png
```
