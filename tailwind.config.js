/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-green": "#00AE6B",
        "dark-blue": {
          900: "#0a1929",
          800: "#0f1e2e",
        },
      },
      fontFamily: {
        effra: ["Effra Trial", "Effra", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-dark": "linear-gradient(180deg, #0f1e2e 0%, #0a1929 100%)",
      },
    },
  },
  plugins: [],
};
