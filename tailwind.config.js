/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',      // Next.js app directory (if using Next.js 13+)
  ],
  theme: {
    extend: {
      colors: {
        primary: '#391F5B',
        secondary: '#512787',
      },
      screens: {
        'max-dp': { max: '1322px' }, 
      },
    },
  },
  plugins: [],
}

