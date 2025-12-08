# Code Comments

### Comment Labels - REQUIRED - NO EXCEPTIONS

- **ALL comments MUST use TODO Tree extension labels** - **NO COMMENTS WITHOUT LABELS, THIS IS MANDATORY, NOT OPTIONAL**
- **CRITICAL**: Comments without labels are **FORBIDDEN**. Only use comments with labels:
  - `// TODO` for future improvements, refactoring, or enhancements (yellow highlight)
  - `// FIX` for bugs that need fixing or known issues (red highlight)
  - `// DOC` for documentation notes, explanations, or important context - **ONLY for hacky things or exceptions that need explanation**
- **Never write comments without one of these labels** - this ensures all comments are tracked by the TODO Tree extension
- **If a comment is not TODO, FIX, or necessary DOC for hacky things/exceptions, DO NOT WRITE IT** - code should be self-documenting

### Comment Examples

```typescript
// DOC Only use initialData on first load server-side, not when query changes
initialData: initialData && !isClient ? { pages: [initialData] } : undefined,

// TODO this value should be a config value
const STALE_DATA_THRESHOLD = 24 * 60 * 60 * 1000;

// FIX Cards are shuffling on hover, more noticeable on safari, seems to be the border
const cardStyle = { border: "2px solid" };

// DOC This hook manages infinite scrolling with React Query
export const useInfiniteUsers = () => {
  // implementation
};
```

### ❌ Incorrect Comment Patterns (Don't Do This)

```typescript
// ❌ WRONG: Comment without label
// This function fetches users from the API
const fetchUsers = () => {};

// ❌ WRONG: Regular comment
// Only use initialData on first load
initialData: initialData && !isClient ? { pages: [initialData] } : undefined,
```

### ✅ Correct Comment Patterns

```typescript
// ✅ CORRECT: Use DOC for documentation
// DOC This function fetches users from the API
const fetchUsers = () => {};

// ✅ CORRECT: Use DOC for explanations
// DOC Only use initialData on first load server-side, not when query changes
initialData: initialData && !isClient ? { pages: [initialData] } : undefined,
```

