const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
        fontFamily: {
            sans: ["Inter", ...defaultTheme.fontFamily.sans],
            serif: [...defaultTheme.fontFamily.serif],
            mono: [...defaultTheme.fontFamily.mono],
            heading: ["Open\\ Sans"],
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
