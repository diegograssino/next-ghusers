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
      // DOC Require empty line before comments in TypeScript/JavaScript files for consistency - auto-fixed on commit via lint-staged
      // DOC Configured to work with Prettier by allowing comments at block/object/array starts and ends
      "lines-around-comment": [
        "error",
        {
          beforeLineComment: true,
          allowBlockStart: true,
          allowBlockEnd: true,
          allowObjectStart: true,
          allowObjectEnd: true,
          allowArrayStart: true,
          allowArrayEnd: true,
        },
      ],
    },
  },
  // DOC Disable lines-around-comment for JSX/TSX files to avoid conflicts with Prettier in JSX attribute lists
  {
    files: ["**/*.tsx", "**/*.jsx"],
    rules: {
      "lines-around-comment": "off",
    },
  },
  {
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react"],
            ["^next"],
            ["^@?\\w"],
            ["^@/"],
            ["^@\\w+/"],
            ["^\\."],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
];

export default eslintConfig;
