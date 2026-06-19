import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        metel: {
          blue: "#1F5AAA",
        },
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15, 23, 42, 0.06), 0 8px 24px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
} satisfies Config;
