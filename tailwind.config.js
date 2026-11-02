/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#243f35",
        gold: "#3e6149",
        charcoal: "#25372f",
        "light-gray": "#eeeee4",
        "mid-gray": "#dcded3",
      },
      fontFamily: {
        heading: ["Manrope", "sans-serif"],
        body: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
