import { globalIgnores } from "eslint/config";
import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";

const eslintConfig = [
  ...tseslint.configs.recommended,
  nextPlugin.configs["core-web-vitals"],
  globalIgnores([".next/**", ".netlify/**", "out/**", "node_modules/**"]),
];

export default eslintConfig;
