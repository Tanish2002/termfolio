import typography from "@tailwindcss/typography";

import tokyoNightThemePlugin from "./src/lib/tokyo-night-plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  darkMode: ["selector", '[data-theme="dark"]'],
  plugins: [
    typography,
    tokyoNightThemePlugin,
    // custom plugin to change the scaling of fonts, since scientifica is bit smaller.
    function({ addBase }) {
      addBase({
        ":root": {
          "--font-scale": "1"
        },
        ".font-mono": {
          "--font-scale": "0.9",
          "font-family": "var(--font-mono)"
        },
        ".font-scientifica": {
          "--font-scale": "1",
          "font-family": "var(--font-scientifica)"
        },
        html: {
          "font-size": "calc(100% * var(--font-scale))"
        }
      });
    }
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        // not really tokyo-night-light, I initially used tokyo-night-light but later decided to use catppuccin latte colorscheme
        "tokyo-night-light": {
          background: "#e6e9ef", // Soft, neutral light background
          "code-background": "#eff1f5",
          foreground: "#4c4f69", // Darker text for readability
          selection: "#7c7f93", // Muted greenish highlight for selection
          comment: "#bcc0cc", // Softer grey for comments
          red: "#d20f39", // Muted pinkish red
          orange: "#fe640b", // Warm, softer orange
          yellow: "#df8e1d", // Gold-like yellow
          green: "#40a02b", // Soft green
          blue: "#1e66f5", // Lighter, softer blue
          cyan: "#04a5e5", // Muted light cyan
          purple: "#8839ef", // Softer purple
          magenta: "#7287fd", // Light magenta
          "dark-blue": "#209fb5", // Pale sky blue
          "dark-cyan": "#179299", // Muted seafoam green
          "dark-purple": "#d1cdd0" // Soft greyish purple
        },
        "tokyo-night-dark": {
          background: "#1a1b26",
          "code-background": "#222436",
          foreground: "#c0caf5",
          selection: "#2d4f67",
          comment: "#565f89",
          red: "#f7768e",
          orange: "#ff9e64",
          yellow: "#e0af68",
          green: "#9ece6a",
          blue: "#7aa2f7",
          cyan: "#7dcfff",
          purple: "#bb9af7",
          magenta: "#c678dd",
          "dark-blue": "#3d59a1",
          "dark-cyan": "#1abc9c",
          "dark-purple": "#1e2239"
        }
      },
      typography: () => ({
        DEFAULT: {
          css: {
            // Base prose styles
            "--tw-prose-body": "var(--color-tokyo-night-foreground)",
            "--tw-prose-headings": "var(--color-tokyo-night-orange)",
            "--tw-prose-links": "var(--color-tokyo-night-blue)",

            // Invert (dark mode) styles
            "--tw-prose-invert-body": "var(--color-tokyo-night-foreground)",
            "--tw-prose-invert-headings": "var(--color-tokyo-night-orange)",
            "--tw-prose-invert-links": "var(--color-tokyo-night-blue)",

            // Specific element customizations
            a: {
              color: "var(--color-tokyo-night-blue)",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline"
              }
            },
            p: {
              marginTop: "0",
              marginBottom: "0"
            },
            strong: {
              color: "var(--color-tokyo-night-purple)"
            },
            em: {
              color: "var(--color-tokyo-night-purple)", // Use a different color for italics
              fontStyle: "italic"
            },
            ul: {
              listStyleType: "disc",
              paddingLeft: "1.5rem",
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
              "@screen sm": {
                paddingLeft: "2rem"
              }
            },
            ol: {
              listStyleType: "decimal",
              paddingLeft: "1.5rem",
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
              "@screen sm": {
                paddingLeft: "2rem"
              }
            },
            blockquote: {
              borderLeftWidth: "4px",
              borderLeftColor: "var(--color-tokyo-night-comment)",
              paddingLeft: "1rem",
              fontStyle: "italic",
              color: "var(--color-tokyo-night-comment)"
            },
            code: {
              backgroundColor: "var(--color-tokyo-night-code-background)",
              color: "var(--color-tokyo-night-foreground)",
              fontWeight: "500",
              borderRadius: "0.25rem",
              padding: "0.2rem 0.4rem",
              border: `1px solid var(--color-tokyo-night-selection)`,
              "&::before, &::after": {
                content: '""',
                display: "none"
              }
            },
            pre: {
              backgroundColor: "var(--color-tokyo-night-code-background)",
              color: "var(--color-tokyo-night-foreground)",
              borderRadius: "0.5rem",
              border: `1px solid var(--color-tokyo-night-selection)`
            },
            "pre code": {
              backgroundColor: "transparent",
              border: "none",
              padding: "0",
              color: "inherit"
            },
            // Syntax highlighting for code
            "code .keyword": { color: "var(--color-tokyo-night-purple)" },
            "code .string": { color: "var(--color-tokyo-night-green)" },
            "code .function": { color: "var(--color-tokyo-night-blue)" },
            "code .comment": { color: "var(--color-tokyo-night-comment)" },
            "code .variable": { color: "var(--color-tokyo-night-red)" }
          }
        }
      }),
      animation: {
        "character-walk": "character-walk 5s linear infinite"
      },
      keyframes: {
        "character-walk": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        }
      },
      fontFamily: {
        mono: "var(--font-mono)",
        scientifica: "var(--font-scientifica)"
      }
    }
  }
};
