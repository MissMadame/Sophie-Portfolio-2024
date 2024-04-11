/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "1/2-screen": "90vh",
      },
      fontFamily: {
        BugrinoRegular: ["Bugrino-Regular", "sans-serif"], // Use a fallback font like 'sans-serif'
        BugrinoBold: ["Bugrino-Bold", "sans-serif"], // Use a fallback font like 'sans-serif'
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
