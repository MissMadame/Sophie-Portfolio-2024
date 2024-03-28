/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "1/2-screen": "90vh",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
