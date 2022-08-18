/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        main: "#131115",
        header: "#000",
      },
      borderColor: {
        main: "#373737",
      },
    },
  },
  plugins: [],
};
