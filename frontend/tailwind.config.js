/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    fontFamily: {
      Montserrat: ["MontserratRegular"],
      MontserratLight: ["MontserratLight"],
      MontserratMedium: ["MontserratMedium"],
      MontserratSemibold: ["MontserratSemibold"],
      MontserratBold: ["MontserratBold"],
    },
    extend: {
      colors: {
        red: "#F83758",
        softRed: "#FE735C",
        blue: "#3163E2",
        softBlue: "#4392F9",
        pink: "#FD6E86",
        softPink: "#FA7189",
        softGreen: "#3BC173",
        green: "#139047",
        rose: "#FFCCD5",
        grey: "#A4A9B3",
        softGrey: "F7F7F7",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },

  plugins: [],
};
