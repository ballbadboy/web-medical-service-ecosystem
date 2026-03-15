/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#2b7cee",
        "primary-dark": "#1a5bb8",
        "secondary": "#1e5baf",
        "accent": "#d4af37",
        "accent-warm": "#c49a2a",
        "background-light": "#f7f8fa",
        "background-dark": "#0c1420",
        "surface-light": "#fefefe",
        "surface-dark": "#152030",
        "surface-dark-alt": "#1a2840",
        "text-main": "#1a2033",
        "text-muted": "#5a6a80",
        "text-secondary": "#6b7a90",
        "border-light": "#e4e8ef",
        "border-dark": "#253548",
        "success": "#16a34a",
        "warning": "#d97706",
        "error": "#dc2626",
      },
      fontFamily: {
        "display": ['"DM Serif Display"', "Georgia", "serif"],
        "body": ["Manrope", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.5rem, 5vw, 4rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "full": "9999px"
      },
      boxShadow: {
        "soft": "0 2px 12px -2px rgba(26, 32, 51, 0.08)",
        "medium": "0 4px 24px -4px rgba(26, 32, 51, 0.12)",
        "lift": "0 8px 32px -8px rgba(26, 32, 51, 0.16)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-up-delay-1": "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards",
        "fade-in-up-delay-2": "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards",
        "fade-in-up-delay-3": "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards",
        "fade-in": "fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      transitionTimingFunction: {
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [
    import("@tailwindcss/forms"),
    import("@tailwindcss/container-queries")
  ],
}
