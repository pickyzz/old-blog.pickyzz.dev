const BLOG = require('./blog.config')

module.exports = {
  content: ['./pages/**/*.js', './components/**/*.js', './layouts/**/*.js'],
  darkMode: BLOG.appearance === 'class' ? 'media' : 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        Maitree: ['Maitree'],
        IBM:['IBM Plex Sans Thai Looped']
      },
      colors: {
        day: {
          DEFAULT: BLOG.lightBackground || '#ffffff'
        },
        night: {
          DEFAULT: BLOG.darkBackground || '#111827'
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
