/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "emerald",
      "synthwave",
      "fantasy",
      "business",
      "night",
      "retro",
      "wireframe",
      "acid",
      "nord",
      "winter",
      "corporate",
      "aqua",
      "garden",
      "lofi",
      "pastel",
      "cmyk",
    ],
  },
};
