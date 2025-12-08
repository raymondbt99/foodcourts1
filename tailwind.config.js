/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warna kustom untuk food court
        'food-primary': '#FF6B35',  // Orange untuk makanan
        'food-secondary': '#2EC4B6', // Teal untuk minuman
        'food-accent': '#FF9F1C',    // Kuning aksen
        'food-dark': '#1A1A2E',      // Background gelap
        'food-light': '#F8F9FA',     // Background terang
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'food-card': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'food-hover': '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}