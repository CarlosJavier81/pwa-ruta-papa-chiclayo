/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#E8EDF4',
          100: '#C9D6E5',
          200: '#9BB3CC',
          300: '#6D8FB3',
          400: '#3F5F8E',
          500: '#1D3557',
          600: '#172C46',
          700: '#101F33',
          800: '#0A1525',
          900: '#050C16',
        },
        gold: {
          50: '#FFF8E1',
          100: '#FFECB3',
          200: '#FFE082',
          300: '#FFD54F',
          400: '#FFCA28',
          500: '#FFC107',
          600: '#FFB300',
          700: '#FFA000',
          800: '#FF8F00',
          900: '#FF6F00',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        nav: '0 -2px 16px rgba(10, 21, 37, 0.12)',
        card: '0 4px 14px rgba(10, 21, 37, 0.08)',
      },
    },
  },
  plugins: [],
};
