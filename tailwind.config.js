const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: "#FF6347",
        primary: "#FF6347", // Orange
        secondary: "#F9A825", // Mostard
        confirm: "#0EB36D", // Green
        text: "#332E2E",
        success: "#00C853",
        invalid: "#D32F2F",
        warning: "#E9D502",
      },
      gridTemplateColumns: {
        sidebar: "300px auto", // 👈 for sidebar layout. adds grid-cols-sidebar class
      }, 
      gridTemplateRows: {
        header: "64px auto", // 👈 for the navbar layout. adds grid-rows-header class
      },
      borderRadius: {
        borderMSg: '25px',
      },
      height:{
        '11/12': '90%'
      },
      width:{
        fit: 'fit-content'
      },
      maxWidth:{
        '80p': '80%'
      },
      minHeight:{
        'chat': 'calc(100vh - 7rem)'
      },
      backgroundImage: {
        'food-pattern': "url('../public/image/patternFood.svg')",
        'promotionImg': "url('../public/image/promocionalChef.png')"
      }
    },
  },
  plugins: [nextui],
}
