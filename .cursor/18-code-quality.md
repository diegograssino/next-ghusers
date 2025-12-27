# Code Quality

### Formatting

- **Use Prettier** - Configured via `.prettierrc.js` with consistent formatting rules
- **Format on save enabled** - VS Code automatically formats on save
- **Auto-fix on commit** - Prettier runs via `lint-staged` to format staged files before commit
- **Organize imports on save** - ESLint plugin automatically sorts imports

### Linting

- **Follow ESLint rules** (Next.js + TypeScript + Prettier)
- **Follow Stylelint rules** (Standard SCSS + Prettier integration)
- **Auto-fix on commit** - ESLint and Stylelint run with `--fix` via `lint-staged` to automatically fix issues
- **Empty lines before comments** - Required for consistency:
  - **SCSS/CSS**: `scss/double-slash-comment-empty-line-before: "always"` - Auto-fixed by Stylelint
  - **TypeScript/JavaScript**: `lines-around-comment` - Auto-fixed by ESLint
  - **JSX/TSX files**: `lines-around-comment` is **disabled** to avoid conflicts with Prettier in JSX attribute lists (Prettier removes blank lines in JSX attributes, causing conflicts)
- **Use `source.fixAll` on save** - VS Code automatically fixes issues on save

### ESLint Configuration Pattern

When setting up ESLint for a new project, use the following configuration pattern to avoid conflicts between ESLint and Prettier:

```javascript
// eslint.config.mjs
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
      // Enable lines-around-comment for .ts/.js files
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
  // IMPORTANT: Disable lines-around-comment for JSX/TSX files
  // Prettier removes blank lines in JSX attribute lists, causing conflicts
  {
    files: ["**/*.tsx", "**/*.jsx"],
    rules: {
      "lines-around-comment": "off",
    },
  },
];
```

**Why disable for JSX/TSX files?**

- Prettier automatically removes blank lines in JSX attribute lists
- ESLint's `lines-around-comment` rule requires empty lines before comments
- This creates a conflict where ESLint adds the line, Prettier removes it, causing infinite formatting loops
- Solution: Disable the rule for JSX/TSX files while keeping it enabled for regular TypeScript/JavaScript files

### Type Safety

- Avoid `any` types
- Use proper TypeScript types for all props, state, and functions
- Leverage TypeScript's strict mode features

### Abstraction Over Hardcoding

- **Never use hardcoded values** - always prefer abstractions, constants, or configuration
- **Extract ALL constants to `constants.ts` files** - never define constants inline
- Extract magic numbers, strings, and repeated values to constants files
- Use configuration objects or constants files for reusable values
- Create helper functions or utilities for repeated logic patterns
- Prefer configuration-driven approaches over hardcoded conditionals
- Constants should be organized by feature: `features/[feature]/lib/constants.ts` for feature-specific constants, `features/shared/constants/constants.tsx` for shared constants

### ❌ Incorrect: Hardcoded Values

```typescript
// ❌ WRONG: Hardcoded values
const users = await fetchUsers(10, "asc"); // What is 10? What is "asc"?
if (user.followers > 1000) {
  // What is 1000?
  // ...
}

// ❌ WRONG: Hardcoded strings
const apiUrl = "https://api.github.com/users";
const errorMessage = "Something went wrong";

// ❌ WRONG: Constants defined inline
const Card = () => {
  const MAX_ITEMS = 10; // ❌ Should be in constants.ts
  const DEFAULT_SORT = "asc"; // ❌ Should be in constants.ts
  // ...
};
```

### ✅ Correct: Using Abstractions

```typescript
// ✅ CORRECT: Use constants from constants.ts files
import {
  PER_PAGE_CONFIGS,
  SORT_ORDERS,
  FOLLOWER_THRESHOLDS,
} from "@/features/shared/constants";
import { MAX_ITEMS, DEFAULT_SORT } from "@/features/users/lib/constants";

const users = await fetchUsers(
  PER_PAGE_CONFIGS.desktop.items,
  SORT_ORDERS.ascending
);

if (user.followers > FOLLOWER_THRESHOLDS.popular) {
  // ...
}

// ✅ CORRECT: Constants defined in constants.ts file
// features/users/lib/constants.ts
export const MAX_ITEMS = 10;
export const DEFAULT_SORT = "asc";

// ✅ CORRECT: Use configuration objects
const API_ENDPOINTS = {
  users: "/api/users",
  userDetail: (id: number) => `/api/users/${id}`,
} as const;

const ERROR_MESSAGES = {
  generic: "Something went wrong",
  network: "Network error occurred",
} as const;
```
