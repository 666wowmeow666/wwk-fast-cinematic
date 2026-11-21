import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wwk: {
          red: "#e11d2e",
          "red-dark": "#b01522",
          white: "#f8f8f8",
          black: "#0a0a0a",
        },
      },
    },
  },
  plugins: [],
};
export default config;
