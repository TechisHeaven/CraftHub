/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#181818",
        backgroundSecondary: "#1a1a1a",
        deafult: "#2c2c2c",
        primary: "#664df8",
        primarySecondary: "#836dff",
        secondary: "#fda841",
        white: "#fff",
        dark: "#1a1a1a",
      },
    },
  },
  plugins: [],
};
