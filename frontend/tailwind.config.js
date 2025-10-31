/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       animation: {
        'spin-slow': 'spin 2s linear infinite',
      },
      colors: {
      instaPrimary: '#833AB4', // Instagram gradient start
      instaSecondary: '#FD1D1D', // Instagram gradient end
    },

    },
  },
    
  plugins: [],
}

