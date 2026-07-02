/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Paleta de marca
        primary: '#3B274A',
        accent:  '#A98BB8',
        ink:     '#2B2530',
        paper:   '#FFFFFF',
        surface: '#F8F5FA',
        placeholder: '#E5E7EB',
        brand: {
          primary: '#3B274A',
          accent: '#A98BB8',
          ink: '#2B2530',
          paper: '#FFFFFF',
          surface: '#F8F5FA',
          placeholder: '#E5E7EB'
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-newsreader)', 'Georgia', 'Times New Roman', 'serif']
      },
      borderRadius: { xl: '1rem' }
    }
  },
  plugins: []
};
