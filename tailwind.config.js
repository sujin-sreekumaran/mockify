/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        instagram: {
          primary: "#E4405F",
          secondary: "#833AB4",
          tertiary: "#F77737",
        },
        twitter: {
          primary: "#1DA1F2",
        },
        whatsapp: {
          primary: "#25D366",
        },
        messenger: {
          primary: "#0084FF",
        },
        tinder: {
          primary: "#FD5068",
          secondary: "#FF4458",
        },
      },
      fontFamily: {
        instagram: ["Helvetica Neue", "Arial", "sans-serif"],
        twitter: ["TwitterChirp", "system-ui", "sans-serif"],
        whatsapp: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        messenger: ["Helvetica", "Arial", "sans-serif"],
        tinder: ["Proxima Nova", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
