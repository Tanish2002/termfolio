import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'character-walk': 'character-walk 5s linear infinite',
      },
      keyframes: {
        'character-walk': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      colors: {
        'tokyo-night': {
          'background': '#1a1b26',
          'foreground': '#c0caf5',
          'selection': '#2d4f67',
          'comment': '#565f89',
          'red': '#f7768e',
          'orange': '#ff9e64',
          'yellow': '#e0af68',
          'green': '#9ece6a',
          'blue': '#7aa2f7',
          'cyan': '#7dcfff',
          'purple': '#bb9af7',
          'magenta': '#c678dd',
          'dark-blue': '#3d59a1',
          'dark-cyan': '#1abc9c',
          'dark-purple': '#1e2239',
        },
      },
      fontFamily: {
        sans: ['var(--font-mono)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
  plugins: [
    typography,
  ],
};
export default config;
