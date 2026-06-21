/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,html}'],
  safelist: [
    "bg-[url('/images/bg-1.jpg')]",
    "bg-[url('/images/bg-2.jpg')]",
    "bg-[url('/images/bg-3.jpg')]",
    "bg-[url('/images/bg-4.jpg')]",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
