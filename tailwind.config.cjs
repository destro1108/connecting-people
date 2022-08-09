/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "outer-space": {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e6e8ea",
          300: "#d2d6da",
          400: "#9fa6ac",
          500: "#6e757d",
          600: "#4f595f",
          700: "#3b454d",
          800: "#27323a",
          900: "#141c24",
        },
      },
      fontFamily: {
        Ubuntu: ["Ubuntu", "sans-serif"],
      },
    },
  },
  plugins: [],
};
