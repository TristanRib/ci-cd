import globals from "globals";
import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        files: ["backend/**/*.js"],
        languageOptions: {
            sourceType: "module",
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
            sourceType: "module",
            globals: globals.browser
        }
    }
];
