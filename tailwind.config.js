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
      animation: {
        bounce: 'bounce 2s ease-in-out infinite',
      },
    },
  },
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
  fontFamily: {
    sans: ['Inter', 'sans-serif'],
    serif: ['Newsreader', 'serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  plugins: [],
};
