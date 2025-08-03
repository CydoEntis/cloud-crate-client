export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
      },
    },
  },
plugins: [],
};
