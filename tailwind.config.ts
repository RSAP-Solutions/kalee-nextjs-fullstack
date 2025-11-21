import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#2C3E50",
        ocean: "#3498DB",
        amber: "#F39C12",
        tangerine: "#E67E22",
        slate: {
          850: "#1F2A36",
        },
      },
      boxShadow: {
        header: "0 2px 5px rgba(0, 0, 0, 0.1)",
        card: "0 15px 35px rgba(44, 62, 80, 0.08)",
      },
      maxWidth: {
        content: "1200px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
