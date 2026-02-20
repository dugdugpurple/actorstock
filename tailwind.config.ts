import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        paper: "#f8fafc",
        accent: "#f97316",
        calm: "#0ea5e9"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at 10% 20%, rgba(14,165,233,0.14), transparent 35%), radial-gradient(circle at 85% 15%, rgba(249,115,22,0.18), transparent 30%), linear-gradient(180deg, rgba(248,250,252,1), rgba(248,250,252,0.96))"
      }
    }
  },
  plugins: []
};

export default config;
