# Context Patterns

### Context Setup

- Use `"use client"` directive for client-side contexts
- Create context with `createContext` and `undefined` default
- **ALWAYS provide a custom hook for consuming context** - never use `useContext(ContextName)` directly
- Custom hook must be named `use{ContextName}Context` (e.g., `FavsContext` → `useFavsContext`)
- Custom hook must include error handling to check if context is undefined
- Use `useMemo` for context values
- Use `useCallback` for context methods

### Context File Naming Convention

- **Context files must use `.context.tsx` suffix**: `{Feature}.context.tsx` (e.g., `Modal.context.tsx`, `Shared.context.tsx`, `Filters.context.tsx`, `Favorites.context.tsx`)
- **Context name**: `{Feature}Context` (e.g., `ModalContext`, `FiltersContext`, `SharedContext`)
- **Custom hook name**: `use{Feature}Context` (e.g., `useModalContext`, `useFiltersContext`, `useSharedContext`)
- **Never use `useContext(ContextName)` directly** - always use the custom hook export
- This ensures type safety and provides helpful error messages when context is used outside provider

### Context Example

**File: `Favorites.context.tsx`**

```typescript
"use client";
import { createContext, useContext, useMemo, useCallback } from "react";

export const FavoritesContext = createContext<
  FavoritesContextProps | undefined
>(undefined);

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<FavoredUser[]>([]);

  const addFavorite = useCallback(async (user: User) => {
    // implementation
  }, []);

  const contextValue = useMemo(
    () => ({ favorites, addFavorite }),
    [favorites, addFavorite]
  );

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

// ✅ CORRECT: Export custom hook with use{ContextName}Context naming
export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error(
      "useFavoritesContext must be used within a FavoritesProvider"
    );
  }
  return context;
};
```

### ❌ Incorrect Context Usage (Don't Do This)

```typescript
// ❌ WRONG: Don't use useContext directly
import { useContext } from "react";
import { FavoritesContext } from "./FavoritesContext";

const MyComponent = () => {
  const { favorites } = useContext(FavoritesContext); // ❌ Use useFavoritesContext instead
  // ...
};
```

### ✅ Correct Context Usage

```typescript
// ✅ CORRECT: Use the custom hook export via barrel export
import { useFavoritesContext } from "@users/contexts";

const MyComponent = () => {
  const { favorites } = useFavoritesContext(); // ✅ Type-safe with error handling
  // ...
};
```
