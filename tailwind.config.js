export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "bg-purple-500/20",
    "bg-yellow-400/20",
    "bg-orange-400/20",
    "bg-red-500/20",
    "bg-blue-500/20",
    "bg-green-500/20",
    "bg-indigo-500/20",
    "bg-amber-600/20",
    "bg-gray-600/20",
    "bg-purple-500",
    "bg-yellow-400",
    "bg-orange-400",
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-indigo-500",
    "bg-amber-600",
    "bg-gray-600",
  ],
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
      },
      backgroundColor: ["data-state"],
      textColor: ["data-state"],
    },
  },
  plugins: [],
};
