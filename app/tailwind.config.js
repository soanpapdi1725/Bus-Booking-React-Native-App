/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js, jsx, ts, tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        okra: [
          'Okra-regular',
          'Okra-medium',
          'Okra-extrabold',
          'Okra-bold',
          'Okra-mediumLight',
        ],
      },
      colors: {
        primary: '#FC5431',
        secondary: '#FDBB8A',
        tertiary: '#CF3239',
      },
    },
  },
  plugins: [],
};
