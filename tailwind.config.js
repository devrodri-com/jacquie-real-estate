/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Paleta de marca
        primary: '#315F72',
        accent:  '#E0E7EA',
        'brand-dark': '#1E3B47',
        'brand-soft': '#E0E7EA',
        'brand-subtle': '#F3F5F7',
        'on-brand': '#FFFFFF',
        focus: '#3A7087',
        'border-brand': '#A2B7C0',
        ink:     '#2B2530',
        paper:   '#FFFFFF',
        surface: '#F3F5F7',
        placeholder: '#E5E7EB',
        brand: {
          DEFAULT: '#315F72',
          primary: '#315F72',
          dark: '#1E3B47',
          soft: '#E0E7EA',
          subtle: '#F3F5F7',
          on: '#FFFFFF',
          focus: '#3A7087',
          border: '#A2B7C0',
          accent: '#E0E7EA',
          ink: '#2B2530',
          paper: '#FFFFFF',
          surface: '#F3F5F7',
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
