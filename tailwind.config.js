module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        //sans: ['"Mona-Sans", sans-serif', { fontFeatureSettings: '"ss01"' }],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
