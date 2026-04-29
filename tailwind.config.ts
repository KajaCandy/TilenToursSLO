import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f2f7f2",
          100: "#e0ece0",
          200: "#c3d9c3",
          300: "#97bc97",
          400: "#659665",
          500: "#437a43",
          600: "#316131",
          700: "#284f28",
          800: "#223f22",
          900: "#1c341c",
          950: "#0e1f0e",
        },
        beige: {
          50: "#faf8f5",
          100: "#f2ede4",
          200: "#e5d9c8",
          300: "#d3c0a4",
          400: "#bfa07e",
          500: "#b08b63",
          600: "#a27558",
          700: "#875f4a",
          800: "#6e4e40",
          900: "#5a4136",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
