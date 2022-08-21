/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#111418',
      white: '#FFFFFF',
      pink: colors.pink,
      primary: {
        ...colors.pink,
        DEFAULT: colors.pink[500],
      },
      gray: {
        DEFAULT: '#A7ACBE',
        100: '#F9F9FB',
        200: '#EDEEF2',
        300: '#D6D8E1',
        400: '#BEC2CF',
        500: '#A7ACBE',
        600: '#9096AD',
        700: '#6F7895',
        800: '#575E75',
        900: '#3F4455',
      },
      green: {
        DEFAULT: '#57CC6D',
        100: '#E5FCDF',
        200: '#C6F9C0',
        300: '#9DEF9D',
        400: '#7FE088',
        500: '#57CC6D',
        600: '#3FAF5F',
        700: '#2B9252',
        800: '#1B7646',
        900: '#10613E',
      },
      blue: {
        DEFAULT: '#359AE8',
        100: '#D6F5FD',
        200: '#AEE7FC',
        300: '#85D2F8',
        400: '#65BCF1',
        500: '#359AE8',
        600: '#2678C7',
        700: '#1A5AA7',
        800: '#103F86',
        900: '#0A2C6F',
      },
      yellow: {
        DEFAULT: '#F4EE29',
        100: '#FEFDD4',
        200: '#FDFCA9',
        300: '#FBF87E',
        400: '#F8F45D',
        500: '#F4EE29',
        600: '#D1CB1D',
        700: '#AFAA14',
        800: '#8D880D',
        900: '#757007',
      },
      red: {
        100: '#FEE9E2',
        200: '#FECEC7',
        300: '#FCAEAA',
        400: '#FA9498',
        500: '#F77183',
        600: '#D45270',
        700: '#B1385F',
        800: '#8F2450',
        900: '#761546',
      },
      // magenta: {
      //   50: '#efa4da',
      //   100: '#e59ad0',
      //   200: '#db90c6',
      //   300: '#d186bc',
      //   400: '#c77cb2',
      //   500: '#bd72a8',
      //   600: '#b3689e',
      //   700: '#a95e94',
      //   800: '#9f548a',
      //   900: '#954a80',
      // },
      // orange: {
      //   50: '#f4af72',
      //   100: '#eaa568',
      //   200: '#e09b5e',
      //   300: '#d69154',
      //   400: '#cc874a',
      //   500: '#c27d40',
      //   600: '#b87336',
      //   700: '#ae692c',
      //   800: '#a45f22',
      //   900: '#9a5518',
      // },
      // purple: {
      //   50: '#deaaef',
      //   100: '#d4a0e5',
      //   200: '#ca96db',
      //   300: '#c08cd1',
      //   400: '#b682c7',
      //   500: '#ac78bd',
      //   600: '#a26eb3',
      //   700: '#9864a9',
      //   800: '#8e5a9f',
      //   900: '#845095',
      // },
    },
    extend: {},
  },
  plugins: [],
}
