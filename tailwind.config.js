/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        blue: "#0079ff",
        gray: "#697c9a",
        "blue-grey": "#4b6a9b",
        "black-light-mode": "#2B3442",
        "light-gray": "#F6F8FF",
        "white-light-mode": "#fefefe",
        "black-dark-mode" : "#141D2F",
        navy: "#1E2A47"
      },
    },
    fontSize: {
      sm: ["13px", "20px"],
      base: ["15px", "25px"],
      lg: ["16px", "24px"],
      xl: ["22px", "33px"],
      xxl: ["26px", "38px"],
    }
  },
  plugins: [],
}