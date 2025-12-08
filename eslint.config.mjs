import jsxA11y from "eslint-plugin-jsx-a11y";
import simpleImportSort from "eslint-plugin-simple-import-sort";

import { FlatCompat } from "@eslint/eslintrc";

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
            // DOC External libraries - React first
            ["^react"],
            // DOC External libraries - Next.js second
            ["^next"],
            // DOC External libraries - Other third-party packages
            ["^@?\\w"],
            // DOC Internal imports with @/ alias
            ["^@/"],
            // DOC Feature-specific short aliases (e.g., @users/repository)
            ["^@\\w+/"],
            // DOC Relative imports
            ["^\\."],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
];

export default eslintConfig;
