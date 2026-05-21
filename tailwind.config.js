/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f3f9',
          100: '#dce3f0',
          200: '#b8c7e1',
          300: '#8aa4cc',
          400: '#5c7fb3',
          500: '#3d5f96',
          600: '#2d4a7a',
          700: '#1f3660',
          800: '#1B2A4A',
          900: '#141f38',
          950: '#0c1424',
        },
        green: {
          50: '#f3fbe9',
          100: '#e3f6cf',
          200: '#c8eda4',
          300: '#a4df6e',
          400: '#7AB648',
          500: '#5f9a2e',
          600: '#487a20',
          700: '#375d1c',
          800: '#2f4b1c',
          900: '#28401c',
          950: '#12230a',
        },
        concrete: {
          50: '#faf9f7',
          100: '#f0ede8',
          200: '#e0dbd3',
          300: '#ccc4b8',
          400: '#b5aa9a',
          500: '#9e9080',
          600: '#8a7c6c',
          700: '#73675a',
          800: '#5f554c',
          900: '#504840',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        handwriting: ['Caveat', 'cursive'],
      },
      animation: {
        'pulse-green': 'pulse-green 2s infinite',
        'stamp': 'stamp-drop 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
      },
    },
  },
  plugins: [],
};
