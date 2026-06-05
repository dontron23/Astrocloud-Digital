/* =========================================================
   AstroCloud Digital — Central configuration
   EDIT THESE VALUES ONCE. They power every link site-wide:
   WhatsApp button, click-to-call, email, and form fallbacks.
   ========================================================= */
window.ASTRO = {
  brand: "AstroCloud Digital",
  // WhatsApp number in international format, digits only (no +, spaces or dashes)
  whatsapp: "25473162913",
  // Display + tel: link number
  phoneDisplay: "+254 703 162 913",
  phoneTel: "+25473162913",
  email: "info@astrocloud.com",
  // Optional: Formspree endpoint for email delivery of forms.
  // Create a free form at https://formspree.io and paste the ID here.
  formspree: "https://formspree.io/f/mreveqyz",
  // Optional: Calendly / Cal.com booking link
  bookingUrl: "https://cal.com/astrocloud/intro",
  city: "Nairobi, Kenya",
  // Default WhatsApp opening message
  waMessage: "Hi AstroCloud, I'd like a free website audit for my business.",
};

window.ASTRO.waLink = function (msg) {
  var text = encodeURIComponent(msg || window.ASTRO.waMessage);
  return "https://wa.me/" + window.ASTRO.whatsapp + "?text=" + text;
};
