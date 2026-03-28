import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:           "#0B0B0B",
        bg2:          "#111111",
        bg3:          "#161616",
        "rivals-text":"#F0EDE8",
        muted:        "#6B6460",
        border:       "#222222",
        red:          "#FF2D2D",
        "red-dark":   "#C41A1A",
        gold:         "#efb810",
        "gold-dark":  "#C9A800",
        online:       "#00E676",
      },
      fontFamily: {
        heading: ["var(--font-bebas)", "sans-serif"],
        label:   ["var(--font-barlow-condensed)", "sans-serif"],
        body:    ["var(--font-barlow)", "sans-serif"],
      },
      borderRadius: {
        sm: "2px",
      },
      keyframes: {
        pgFadeIn: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "pg-fade-in": "pgFadeIn 0.4s forwards",
      },
    },
  },
  plugins: [],
};

export default config;
