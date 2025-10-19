/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Image Creatives Brand Colors
        'flame': '#E65100',      // Primary Flame
        'ember': '#FFA726',      // Secondary Ember
        'cool': '#0288D1',       // Primary Cool
        'night': '#0D47A1',      // Deep Night
        'light': '#F5F5F5',      // Soft Light
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      fontWeight: {
        'bold': '700',
        'semibold': '600',
        'regular': '400',
      },
      backgroundImage: {
        'gradient-flame': 'linear-gradient(135deg, #E65100 0%, #FFA726 100%)',
        'gradient-cool': 'linear-gradient(135deg, #0288D1 0%, #0D47A1 100%)',
      },
      boxShadow: {
        'brand': '0 4px 6px -1px rgba(230, 81, 0, 0.1), 0 2px 4px -1px rgba(230, 81, 0, 0.06)',
        'brand-lg': '0 10px 15px -3px rgba(230, 81, 0, 0.1), 0 4px 6px -2px rgba(230, 81, 0, 0.05)',
        'brand-xl': '0 20px 25px -5px rgba(230, 81, 0, 0.1), 0 10px 10px -5px rgba(230, 81, 0, 0.04)',
      },
      borderRadius: {
        'brand': '0.75rem',
        'brand-lg': '1rem',
        'brand-xl': '1.25rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      }
    },
  },
  plugins: [],
}
