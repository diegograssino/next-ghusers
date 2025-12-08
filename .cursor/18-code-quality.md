# Code Quality

### Formatting

- Use Prettier (configured via ESLint)
- Format on save enabled
- Organize imports on save

### Linting

- Follow ESLint rules (Next.js + TypeScript + Prettier)
- Fix all linting errors before committing
- Use `source.fixAll` on save

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

