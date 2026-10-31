/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        retro: ['"Silkscreen"', 'monospace'],
        vt: ['"VT323"', 'monospace'],
      },
      colors: {
        parchment: {
          50: '#fffdfa',
          100: '#fcf6ea',
          200: '#f5ebce',
          300: '#ebd9a8',
        },
        pixel: {
          dark: '#2d2740',
          purple: '#4c4270',
          lavender: '#8a7dc4',
          lightLavender: '#eef0fb',
          blue: '#3b6f99',
          lightBlue: '#e5f3fd',
          green: '#437c4e',
          lightGreen: '#e9f7ea',
          yellow: '#9c7b28',
          lightYellow: '#fdf6db',
          gold: '#eab308',
          peach: '#9c5548',
          lightPeach: '#fdf0ed',
          pink: '#8f4a88',
          lightPink: '#f9ecf7',
        }
      },
      boxShadow: {
        'pixel': '3px 3px 0px 0px #2d2740',
        'pixel-sm': '2px 2px 0px 0px #2d2740',
        'pixel-lg': '5px 5px 0px 0px #2d2740',
        'pixel-pressed': '1px 1px 0px 0px #2d2740',
      }
    },
  },
  plugins: [],
}
