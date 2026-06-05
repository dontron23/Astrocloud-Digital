/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html", "./assets/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#06090F",
          900: "#0A0F1C",
          800: "#111829",
          700: "#1A2236",
          600: "#283150",
          500: "#3A4668",
        },
        paper: {
          DEFAULT: "#F8F7F3",
          pure: "#FFFFFF",
          2: "#EFEEE7",
        },
        sun: {
          DEFAULT: "#FFB23E",
          deep: "#FF7A3D",
          soft: "#FFD79A",
        },
        sky: {
          DEFAULT: "#46E0CE",
          deep: "#1FB8A6",
        },
        muted: {
          dark: "#9AA7C0",
          light: "#56617B",
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Plus Jakarta Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        "8xl": "88rem",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,178,62,0.25), 0 18px 50px -12px rgba(255,122,61,0.45)",
        soft: "0 24px 60px -24px rgba(10,15,28,0.18)",
        card: "0 2px 8px rgba(10,15,28,0.04), 0 24px 48px -28px rgba(10,15,28,0.22)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
