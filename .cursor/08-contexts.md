# Context Patterns

### Context Setup

- Use `"use client"` directive for client-side contexts
- Create context with `createContext` and `undefined` default
- **ALWAYS provide a custom hook for consuming context** - never use `useContext(ContextName)` directly
- Custom hook must be named `use{ContextName}Context` (e.g., `FavsContext` → `useFavsContext`)
- Custom hook must include error handling to check if context is undefined
- Use `useMemo` for context values
- Use `useCallback` for context methods

### Context Hook Naming Convention

- **Context name**: `{Feature}Context` (e.g., `FavsContext`, `FiltersContext`, `SharedContext`)
- **Custom hook name**: `use{Feature}Context` (e.g., `useFavsContext`, `useFiltersContext`, `useSharedContext`)
- **Never use `useContext(ContextName)` directly** - always use the custom hook export
- This ensures type safety and provides helpful error messages when context is used outside provider

### Context Example

```typescript
"use client";
import { createContext, useContext, useMemo, useCallback } from "react";

export const FavsContext = createContext<FavsContextProps | undefined>(
  undefined
);

export const FavsProvider = ({ children }: FavsProviderProps) => {
  const [favs, setFavs] = useState<FavoredUser[]>([]);

  const addFav = useCallback(async (user: User) => {
    // implementation
  }, []);

  const contextValue = useMemo(() => ({ favs, addFav }), [favs, addFav]);

  return (
    <FavsContext.Provider value={contextValue}>{children}</FavsContext.Provider>
  );
};

// ✅ CORRECT: Export custom hook with use{ContextName}Context naming
export const useFavsContext = () => {
  const context = useContext(FavsContext);
  if (context === undefined) {
    throw new Error("useFavsContext must be used within a FavsProvider");
  }
  return context;
};
```

### ❌ Incorrect Context Usage (Don't Do This)

```typescript
// ❌ WRONG: Don't use useContext directly
import { useContext } from "react";
import { FavsContext } from "./FavsContext";

const MyComponent = () => {
  const { favs } = useContext(FavsContext); // ❌ Use useFavsContext instead
  // ...
};
```

### ✅ Correct Context Usage

```typescript
// ✅ CORRECT: Use the custom hook export
import { useFavsContext } from "./FavsContext";

const MyComponent = () => {
  const { favs } = useFavsContext(); // ✅ Type-safe with error handling
  // ...
};
```

