/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
      robotoMed: ["RobotoMed", "sans-serif"],
      rubik: ["Rubik", "sans-serif"],
      rubikMed: ["RubikMed", "sans-serif"]
    },
    extend: {},
  },
  plugins: [],
}

