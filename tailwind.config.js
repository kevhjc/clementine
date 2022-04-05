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
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['Newsreader', 'serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
  },
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
  plugins: [],
};
