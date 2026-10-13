const colors = require('tailwindcss/colors')

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Be Vietnam Pro", "Inter", "system-ui", "sans"],
      monospace: ["DM Mono", "monospace"],
    },
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.yellow,
      blue: colors.blue,
      green: colors.green,
      orange: colors.orange,
      purple: colors.purple,
    pink: colors.pink,
    },
    extend: {
      // Custom colors for the website
      colors: {
        // MAIN BACKGROUND
        bg: "#080353",
        // highlight colour
        "fun-pink": "rgb(234, 154, 178)",

        "fun-gray-light": "#b2bbcf",
        "fun-gray": "#ffdbe5",
        "fun-gray-medium": "#767c85",
        "fun-gray-darker": "#2a2a2c",
        "fun-gray-dark": "#1F1F20",
        "fun-gray-darkest": "#141414",
        "fun-pink-darker": "#497e67a6",
        "fun-pink-darkest": "#337357",
        "fun-pink-dark": "#192742",
        "fun-pink-light": "#ffdbe5",
        "chole-more-purple": "#310A59",
        "chole-lighter-purple": "#3B0D63",
        "chole-light-plum": "#902E6B",
        "chole-dark-pink": "#CA8184",
        "chole-yellow": "#FBE99E",
        "chole-light-yellow": "#E49B70",
      },
      rotate: {
        '360': '360deg'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        'fadeInAndBounce': 'fadeIn 3s ease-out',
      },
      willChange: {
        'projectCard': 'border-color, opacity, transform',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
