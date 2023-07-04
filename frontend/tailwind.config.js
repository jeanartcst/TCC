/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    extend: {
      colors: {
        background: "#FAFAFA",
      },
    },
  },
  plugins: [
    // ...
    // require("@tailwind/tailwind-scrollbar"),
  ],
  variants: {
    scrollbar: ["rounded"],
  },
};
