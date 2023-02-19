module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        //sans: ['"Mona-Sans", sans-serif', { fontFeatureSettings: '"ss01"' }],
        culture: ['IBM Plex Mono', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
