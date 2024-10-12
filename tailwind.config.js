/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3785cd',  // for user
        'secondary': '#d33333',  // Emergency color
        'brand': {  // for admin color
          'primary': '#5a17e0'
        }
      },
      fontFamily: {
        'primary': ['Roboto', 'sans-serif'],
        'secondary': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

