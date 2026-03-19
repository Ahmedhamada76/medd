module.exports = {
  content: ['./index.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        blood: '#E60000',
        bloodDark: '#B30000',
        bloodLight: '#ff3333',
        cosmic: '#050508',
        horror: '#0d0a0a',
        void: '#0a0a12'
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
