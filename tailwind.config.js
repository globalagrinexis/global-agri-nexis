/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: [
          "Lato",
          "Helvetica Neue",
          "Segoe UI",
          "Roboto",
          "Arial",
          "sans-serif",
        ],
        serif: [
          "DM Serif Text",
          "Young Serif",
          "Playfair Display",
          "Times New Roman",
          "serif",
        ],
      },
    },
  },
  plugins: [],
};
