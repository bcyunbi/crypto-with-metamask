/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    // colors: {
    //   'customize': {
    //     customizeLightest: '#ede9e8',
    //     customizeLightGray: '#dbd2cf',
    //     customizeBlue: '#9db6cf',
    //     customizeLightGrayBlue: '#b6cade',
    //     customizeLightestBlue: '#d4e4ed',
    //   },
    // },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      flex: {
        2: '2 2 0%',
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp")
  ],
}
