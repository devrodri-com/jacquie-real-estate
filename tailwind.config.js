/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Paleta de marca
        primary: '#1F3A34',
        accent:  '#8FA79B',
        ink:     '#2F2F2F',
        paper:   '#FFFFFF',
        surface: '#F7F6F3',
        placeholder: '#E5E7EB',
        brand: {
          primary: '#1F3A34',
          accent: '#8FA79B',
          ink: '#2F2F2F',
          paper: '#FFFFFF',
          surface: '#F7F6F3',
          placeholder: '#E5E7EB'
        }
      },
      borderRadius: { xl: '1rem' }
    }
  },
  plugins: []
};