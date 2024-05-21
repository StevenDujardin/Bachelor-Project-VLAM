/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires , no-undef
const plugin = require("tailwindcss/plugin");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      centerBold: ["Center Bold Regular"],
      poppins: ["Poppins"],
    },

    extend: {
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
      colors: {
        mantis: {
          50: "#f3faf0",
          100: "#e8f7e1",
          200: "#d0efc3",
          300: "#abe095",
          400: "#6cc24a",
          500: "#5aae39",
          600: "#468f2a",
          700: "#397124",
          800: "#305a21",
          900: "#284a1d",
          950: "#12280b",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      );
    }),
  ],
};
