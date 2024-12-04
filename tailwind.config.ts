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
      },
      fontFamily: {
        sans: "var(--font-inter), Inter, sans-serif",
        serif: "Garamond ATF Subhead, var(--font-eb-garamond), Georgia, serif",
        number:
          "Garamond ATF Subhead, var(--font-cormorant-garamond), Georgia, serif",
        "number-alt-cormorant":
          "var(--font-cormorant-garamond), Garamond ATF Subhead, Georgia, serif",
        // "number-alt":
        //   "var(--font-alegreya), Garamond ATF Subhead, Georgia, serif",
        // "number-alt-abhaya":
        //   "var(--font-abhaya-libre), Garamond ATF Subhead, Georgia, serif",
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
