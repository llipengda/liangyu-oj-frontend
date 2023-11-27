/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    minHeight: {
      '1/4': '25vh',
      '1/2': '50vh',
      '3/4': '75vh'
    },
    extend: {}
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
