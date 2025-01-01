/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease forwards', // Initial fade-in animation
        'fade-in-search': 'fadeInSearch 0.6s ease forwards', // Added fade-in-search animation
        'move-up': 'moveUp 0.5s ease forwards', // Move-up animation for text
        'scroll-text': 'scrollText 10s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px) scale(0.9)' },
          '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
        fadeInSearch: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        moveUp: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50px)' },
        },
        scrollText: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
