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
      },
      fontFamily: {
        serif: "Garamond ATF Subhead, var(--font-eb-garamond), Georgia, serif",
        number:
          "Garamond ATF Subhead, var(--font-cormorant-garamond), Georgia, serif",
      },
      width: {
        128: "32rem",
      },
      fontSize: {
        "10xl": "10rem",
        "12xl": "18rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
