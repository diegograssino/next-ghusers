# TypeScript Patterns

### Type Definitions

- Use strict TypeScript mode
- Define interfaces for component props, context values, and API responses
- Export types from centralized `types/` directory
- Use `Readonly<>` for props when appropriate
- Prefer interfaces over types for object shapes

### Type Naming Conventions

- **Component Props**: Always name as `ComponentNameProps` (PascalCase + `Props` suffix)
  - Examples: `CardProps`, `TypographyProps`, `ContainerProps`, `UserDetailProps`
  - This makes it clear the type is for component props and matches the component name
- **Entity Types**: Use singular names for entity interfaces/types, use arrays for collections
  - Entity: `User`, `Product`, `Repo` (singular)
  - Collections: `User[]`, `Product[]`, `Repo[]` (array of singular)
  - This follows TypeScript and general programming conventions
- **Context Props**: Name as `ContextNameProps` (e.g., `FavsContextProps`)
- **Service/Query Types**: Use descriptive names with suffixes like `Result`, `Params`, `Response`
  - Examples: `FetchUsersResult`, `FetchUsersParams`, `QueryParams`

### Type Naming Examples

```typescript
// ✅ Component Props - ComponentNameProps
interface CardProps {
  user: User;
  className?: string;
}

interface TypographyProps {
  size?: Sizes;
  weight?: WeightVariants;
  variant?: ColorVariants;
}

// ✅ Entity Types - Singular for entity, array for collections
interface User {
  id: number;
  login: string;
  // ...
}

interface Product {
  id: number;
  name: string;
  // ...
}

// Usage in props/interfaces
interface CardProps {
  user: User;        // ✅ Singular entity
}

interface CardGridProps {
  users: User[];     // ✅ Array of entities
}

interface UserDetailProps {
  user: User;        // ✅ Singular entity
  repos: Repo[];     // ✅ Array of entities
}

// ✅ Context Props - ContextNameProps
interface FavsContextProps {
  favs: FavoredUser[];
  addFav: (user: User) => Promise<void>;
  removeFav: (id: number) => void;
}

// ✅ Service/Query Types - Descriptive with suffixes
interface FetchUsersResult {
  users: User[];
  nextSince: string | null;
  totalCount: number | null;
}

interface FetchUsersParams {
  perPageParam?: string;
  pageParam?: string;
  queryParams?: QueryParams;
}
```

### Type Example

```typescript
interface CardProps {
  user: User;
  className?: string;
}

interface FavsContextProps {
  favs: FavoredUser[];
  addFav: (user: User) => Promise<void>;
  removeFav: (id: number) => void;
}
```

