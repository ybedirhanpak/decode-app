import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        rules: {
            quotes: ["error", "double"],
            "jsx-quotes": ["error", "prefer-double"],
            indent: ["error", 4],
            "react/jsx-indent": ["error", 4],
            "react/jsx-indent-props": ["error", 4],
            "eol-last": ["error", "always"],
        }
    }
];

export default eslintConfig;
