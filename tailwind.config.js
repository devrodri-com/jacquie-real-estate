/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Paleta base
        primary: '#0A2540',   // azul marino
        accent:  '#D4AF37',   // dorado
        ink:     '#0A0A0A',   // negro
        paper:   '#FFFFFF',   // blanco
        muted:   '#F5F5F5',   // neutro claro
        // Alias "brand" para compatibilidad
        brand: {
          navy: '#0A2540',
          gold: '#D4AF37',
          ink:  '#0A0A0A',
          sand: '#F5F5F5'
        }
      },
      borderRadius: { xl: '1rem' }
    }
  },
  plugins: []
};