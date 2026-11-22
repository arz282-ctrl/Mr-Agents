/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./skills/**/*.{js,ts,json}",
  ],
  theme: {
    extend: {
      colors: {
        /* Workspace UI colors (existing) */
        background: "#090A0F",
        surface: "#11131F",
        surfaceHover: "#1A1D2E",
        card: "#141726",
        border: "#23273D",
        accent: {
          orchestrator: "#8B5CF6",
          architect: "#EC4899",
          backend: "#10B981",
          scraper: "#F59E0B",
          marketer: "#06B6D4",
          closer: "#E11D48",
          devops: "#3B82F6",
          qa: "#84CC16",
        },
        /* Landing page palette */
        landing: {
          bg: "#09090b",
          fg: "#fafafa",
          muted: "#a1a1aa",
          border: "#27272a",
          card: "#18181b",
          "card-hover": "#1f1f23",
          accent: "#8B5CF6",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-up": "slide-up 0.8s ease-out forwards",
        "slide-up-delay-1": "slide-up 0.8s ease-out 0.1s forwards",
        "slide-up-delay-2": "slide-up 0.8s ease-out 0.2s forwards",
        "slide-up-delay-3": "slide-up 0.8s ease-out 0.3s forwards",
        "slide-up-delay-4": "slide-up 0.8s ease-out 0.4s forwards",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "border-glow": "border-glow 3s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(139, 92, 246, 0.2)" },
          "100%": { boxShadow: "0 0 20px rgba(139, 92, 246, 0.6)" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(139, 92, 246, 0.15)" },
          "50%": { boxShadow: "0 0 40px rgba(139, 92, 246, 0.35)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "border-glow": {
          "0%, 100%": { borderColor: "rgba(139, 92, 246, 0.2)" },
          "50%": { borderColor: "rgba(139, 92, 246, 0.5)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139, 92, 246, 0.15), transparent)",
      },
    },
  },
  plugins: [],
};
