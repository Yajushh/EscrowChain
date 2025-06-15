/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Francois One", "sans-serif"], // for general use
        heading: ["Bebas Neue", "sans-serif"], // if you're using Bebas for titles
      },
    },
  },
  plugins: [],
};
