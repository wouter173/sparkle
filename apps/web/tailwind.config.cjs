/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        main: "#131115",
        header: "#000",
        body: "#020202",
      },
      borderColor: {
        main: "#373737",
      },
      textColor: {
        darkened: "#ccc",
      },
    },
  },
  plugins: [],
};
