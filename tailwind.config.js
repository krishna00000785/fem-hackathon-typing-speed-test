/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          900: 'hsl(0, 0%, 7%)',
          800: 'hsl(0, 0%, 15%)',
          500: 'hsl(240, 3%, 46%)',
          400: 'hsl(240, 1%, 59%)',
          0: 'hsl(0, 0%, 100%)',
        },
        blue: {
          600: 'hsl(214, 100%, 55%)',
          400: 'hsl(210, 100%, 65%)',
        },
        red: { 500: 'hsl(354, 63%, 57%)' },
        green: { 500: 'hsl(140, 63%, 57%)' },
        yellow: { 400: 'hsl(49, 85%, 70%)' },
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(16px) scale(0.98)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) scale(1)',
          },
        },
      },
      animation: {
        fadeUp: 'fadeUp 400ms ease-out forwards',
      },
    },
  },
  plugins: [],
}