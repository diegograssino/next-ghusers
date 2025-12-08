import { FlatCompat } from "@eslint/eslintrc";
import jsxA11y from "eslint-plugin-jsx-a11y";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const compat = new FlatCompat({
  // DOC import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
  }),
  {
    plugins: {
      "jsx-a11y": jsxA11y,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      ...jsxA11y.configs.recommended.rules,
      // DOC autoFocus is needed for search input UX - users expect immediate focus on search pages for quick typing
      "jsx-a11y/no-autofocus": "off",
      // DOC Import ordering: External libraries → @/ alias → @feature aliases → Relative imports
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // External libraries (React, Next.js, third-party)
            ["^react", "^next", "^@?\\w"],
            // Internal imports with @/ alias
            ["^@/"],
            // Feature-specific short aliases (e.g., @users/repository)
            ["^@\\w+/"],
            // Relative imports
            ["^\\."],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
];

export default eslintConfig;
