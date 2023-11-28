/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    minHeight: {
      '1/4': '25vh',
      '1/2': '50vh',
      '3/4': '75vh',
      '3/5': '60vh'
    },
    fontFamily: {
      mono: 'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,黑体,微软雅黑,monospace'
    },
    extend: {}
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
