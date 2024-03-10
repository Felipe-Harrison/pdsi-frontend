const { nextui } = require('@nextui-org/react');

// TEXT THEME
const lightText = '#212121';
const darkText = '#f5f7f8';

// BACKGROUND THEME
const darkBg = "#1c1c1c";
const lightBg = "#f2f5fa";

// CONTENT THEME
const blackContent = "#3c3c3c";
const whiteContent = "#f8fafc";

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
        text: {
          light: "#332E2E",
          dark:  "#332E2E"
        },
        contentBlack: "#332E2E",
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
        '11/12': '90%',
        '41vh': 'calc(40.4vh)',
      },
      width:{
        fit: 'fit-content',
      },
      maxWidth:{
        '80p': '80%'
      },
      minHeight:{
        'chat': 'calc(100vh - 7rem)'
      },
      margin:{
        'auto': 'auto'
      },
      backgroundImage: {
        'food-pattern': "url('../public/image/patternFood.svg')",
        'promotionImg': "url('../public/image/promocionalChef.png')"
      }
    },
  },
  plugins: [nextui],
  darkMode: 'media'
}
