module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        xs: {
          min: '0px',
          max: '639.98px',
        },
      },
      fontFamily: {
        noto: 'Noto Sans KR',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
