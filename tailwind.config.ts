import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        "accent-bold": "var(--accent-bold)",
        "accent-400": "var(--accent-400)",
        "accent-highlight": "var(--accent-highlight)",
        "accent-highlight-hover": "var(--accent-highlight-hover)",
        "accent-text": "var(--accent-text)",
      },
      fontFamily: {
        sans: "var(--font-inter), Inter, sans-serif",
        serif:
          "var(--font-garamond-atf-subhead), Garamond ATF Subhead, var(--font-eb-garamond), Georgia, serif",
        number:
          "var(--font-garamond-atf-subhead), Garamond ATF Subhead, var(--font-cormorant-garamond), Georgia, serif",
      },
      fontSize: {
        "2xs": "0.5rem",
        "10xl": "12rem",
        "12xl": "18rem",
      },
      lineHeight: {
        snug: "1.45",
      },
      spacing: {
        9: "2.25rem", // Section sidebar right padding
        17: "4.25rem", // Section sidebar numbers
        26: "6.5rem", // TitleWithConfidence width with label
        57: "14.25rem", // Header table of contents
        68: "17rem", // Number next to sidebar
        88: "22rem", // Inline block content images
        128: "32rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
