/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF8F4',
        parchment: '#F2EDE4',
        peach: '#F5C8A8',
        'peach-light': '#FAE0CC',
        blush: '#EDCFC9',
        'dusty-blue': '#A8C4D4',
        'blue-light': '#D4E8F0',
        sage: '#A8C4B0',
        'sage-light': '#D4E8DA',
        butter: '#F5E6A0',
        charcoal: '#2D2926',
        'warm-gray': '#8C8580',
        'light-gray': '#E8E4DE',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'card': '0 4px 24px -4px rgba(45,41,38,0.08)',
        'card-hover': '0 12px 40px -8px rgba(45,41,38,0.16)',
        'soft': '0 2px 12px -2px rgba(45,41,38,0.06)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
