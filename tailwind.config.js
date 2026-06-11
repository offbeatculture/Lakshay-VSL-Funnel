/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#F26B1F',
          orangeDark: '#C9521A',
          navy: '#0B1B2B',
          navySoft: '#13283F',
          cream: '#FBF6EE',
          sand: '#F1E7D5',
          ink: '#101820',
          line: '#E6DCC9'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(11,27,43,0.25)',
        cta: '0 12px 24px -10px rgba(242,107,31,0.55)'
      },
      maxWidth: {
        content: '1120px'
      }
    }
  },
  plugins: []
};
