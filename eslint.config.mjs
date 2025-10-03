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
    // Ignore patterns remain here
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  // 👇 ADD THIS NEW CONFIGURATION OBJECT TO OVERRIDE THE RULE
  {
    // This targets only TypeScript files where the rule is active
    files: ["**/*.{ts,tsx}"], 
    rules: {
      // Set to "off" to completely disable the error and allow 'any'.
      // You can also use "warn" to see it as a warning instead of a failure.
      "@typescript-eslint/no-explicit-any": "off", 
    },
  },
];

export default eslintConfig;
