module.exports = {
  content: [
    './resources/views/**/*.blade.php',
    './resources/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6b4f3b',
        accent: '#d49a6a',
        muted: '#6b6b6b'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')],
}
