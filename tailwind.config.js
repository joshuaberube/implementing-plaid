const colors = require('tailwindcss/colors')

const values = {
  '0': '0',
  '2': '2px',
  '4': '4px',
  '6': '6px',
  '8': '8px',
  '10': '10px',
  '12': '12px',
  '16': '16px',
  '19': '19px',
  '24': '24px',
  '32': '32px',
  '40': '40px',
  '48': '48px',
  '64': '64px',
  '80': '80px',
  '96': '96px',
  '105': '105px',
  '128': '128px',
  '152': '152px',
  '192': '192px',
  '210': '210px',
  '256': '256px',
  '384': '384px',
  '512': '512px',
  '640': '640px',
  '768': '768px',
  'full': '100%',
  '100vw': '100vw',
  '100vh': '100vh'
}

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        gray: colors.blueGray,
        red: colors.red,
        blue: colors.sky,
        green: colors.emerald,
        yellow: colors.amber
      }
    },
    spacing: values,
    borderRadius: {
      'none': '0',
      '10': '10px'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}