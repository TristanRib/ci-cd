const globals = require("globals");
const js = require("@eslint/js");

module.exports = [
    {
        ignores: ["eslint.config.js"]
    },
    js.configs.recommended,
    {
        files: ["backend/**/*.js"],
        languageOptions: {
            sourceType: "commonjs",
            globals: globals.node
        },
        ignores: ["**/*.test.js", "**/*.config.js"],
        rules: {
            "no-console": "off"
        }
    },
    {
        files: ["frontend/**/*.js"],
        languageOptions: {
            sourceType: "commonjs",
            globals: globals.browser
        }
    }
];
