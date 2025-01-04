/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'animate-moveVertical',
    'animate-moveInCircle',
    'animate-moveHorizontal',
  ],
  theme: {
    extend: {
      transitionProperty: {
        'transform': 'transform',
      },
      scale: {
        150: '1.5',
        200: '2',
      },
      animation: {
        'fade-in': 'fadeIn 0.1s ease forwards', // Initial fade-in animation
        'fade-in-search': 'fadeInSearch 0.6s ease forwards', // Added fade-in-search animation
        'move-up': 'moveUp 0.5s ease forwards', // Move-up animation for text
        'moveInCircle': "moveInCircle 5s linear infinite",
        'moveVertical': "moveVertical 5s ease infinite",
        'moveHorizontal': "moveHorizontal 5s ease infinite",
        'scroll-text': 'scrollText 10s linear infinite',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'wave-pause': 'wavePause 3.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px) scale(0.9)' },
          '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
        fadeInSearch: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 0.8, transform: 'translateY(0)' },
        },
        moveUp: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50px)' },
        },
        moveInCircle: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(180deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        moveVertical: {
          "0%, 100%": { transform: "translateY(-50%)" },
          "50%": { transform: "translateY(50%)" },
        },
        moveHorizontal: {
          "0%, 100%": { transform: "translateX(-50%) translateY(-10%)" },
          "50%": { transform: "translateX(50%) translateY(10%)" },
        },
        scrollText: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        slideUp: {
          '0%': {
            transform: 'translateY(20px)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
        wavePause: {
          '0%, 100%': { transform: 'translateY(0)' }, // Start and end at original position
          '50%': { transform: 'translateY(-20px)' }, // Wave motion
          '100%': { animationTimingFunction: 'steps(3)' }, // Pause
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
