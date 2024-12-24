/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      extend: {
        appearance: ['radio'],
      },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
      },
    },
  },
  plugins: [],
}

