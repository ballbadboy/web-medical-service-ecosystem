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
        "background-light": "#f6f7f8",
        "background-dark": "#101822",
        "surface-light": "#ffffff",
        "surface-dark": "#1a2634", // using the slightly lighter one from Home for base
        "text-main": "#111418", // main text color
        "text-muted": "#617289", // muted text color
        "text-secondary": "#64748b", // slate-500 from AI
        "border-light": "#e2e8f0", // slate-200 from AI
        "border-dark": "#2d3748", // slate-700 from AI
      },
      fontFamily: {
        "display": ["Manrope", "sans-serif"],
        "body": ["Manrope", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "full": "9999px"
      },
      animation: {
        "fade-in-up": "fadeInUp 0.5s ease-out forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        }
      }
    },
  },
  plugins: [
    import("@tailwindcss/forms"),
    import("@tailwindcss/container-queries")
  ],
}
