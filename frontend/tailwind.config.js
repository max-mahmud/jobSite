/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      xl: { min: "1380px" },
      lg: { min: "1180px" },
      "md-lg": { min: "991px" },
      md: { min: "768px" },
      sm: { min: "576px" },
      xs: { min: "480px" },
      "2xs": { min: "340px" },
    },
  },
  plugins: [],
};
