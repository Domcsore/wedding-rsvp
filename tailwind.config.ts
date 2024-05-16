import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cursive: ["Tangerine", "cursive"],
        serif: ["'Noto Serif'", "serif"],
        title: ["'Noto Serif Display'", "serif"],
      },
    },
  },
  plugins: [require("rippleui")],
};
export default config;
