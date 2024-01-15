/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        newFont:['Sarabun']


      },
      
      animation: {
      marquee: 'marquee 10s linear infinite',
      marquee2: 'marquee 10s linear infinite',
      
    },
    keyframes: {
      marquee: {
        '0%': { transform: 'translateX(0%)' },
        '40%': { transform: 'translateX(-25%)' },
        '50%': { transform: 'translateX(-25%)' },
        '90%' : {transform: 'translateX(0%)'}
      },
      marquee2: {
        '0%': { transform: 'translateX(0%)' },
        '40%': { transform: 'translateX(-25%)' },
        '50%': { transform: 'translateX(-25%)' },
        '90%' : {transform: 'translateX(0%)'}
      },
    },},
  },
  plugins: [],
}

