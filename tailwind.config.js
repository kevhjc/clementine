module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        dark: { raw: '(prefers-color-scheme: dark)' },
      },
    },
  },
  variants: {
    extend: {},
  },
  fontFamily: {
    sans: ['Inter', 'sans-serif'],
    serif: ['Newsreader', 'serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  plugins: [],
};
