/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      },
      fontFamily:{
        newFont:['Sarabun']


      },
      
      animation: {
      marquee: 'marquee 50s linear infinite',
      marquee2: 'marquee 40s linear infinite',
      
    },
    keyframes: {
      marquee: {
        '0%': { transform: 'translateX(0%)' },
        '40%': { transform: 'translateX(-75%)' },
        '50%': { transform: 'translateX(-75%)' },
        '90%' : {transform: 'translateX(0%)'}
      },
      marquee2: {
        '0%': { transform: 'translateX(0%)' },
        '40%': { transform: 'translateX(-150%)' },
        '50%': { transform: 'translateX(-150%)' },
        '90%' : {transform: 'translateX(0%)'}
      },
    },},
  },
  plugins: [],
}

