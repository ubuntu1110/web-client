// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#494643',
        accent: '#FF4500',
        dark: '#1F2937',
      },
      backgroundImage: {
        'snowflakes': "url('/src/assets/images/snowflakes.png')",
      },
    },
  },
  plugins: [],
}
