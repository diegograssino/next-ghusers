# Naming Conventions

### Variables & Functions

- Use camelCase: `fetchUsersService`, `handleLoadMore`, `isLoading`
- **Boolean flags/variables must start with `is`, `has`, or `should`**: `isLoading`, `hasNextPage`, `shouldUpdate`, `isError`, `hasNoFavs`
- **When converting constants to boolean flags, always use camelCase** - even if the constant is UPPER_SNAKE_CASE
  - Constants: `GITHUB_TOKEN`, `NEXT_PUBLIC_GITHUB_TOKEN`
  - Boolean flags: `hasGithubToken`, `hasNextPublicGithubToken` ✅ (NOT `hasGITHUB_TOKEN`, `hasNEXT_PUBLIC_GITHUB_TOKEN` ❌)
  - This ensures consistent camelCase naming for all variables, regardless of the source constant's naming convention
- **Functions must start with a verb**: `getSomething`, `fetchSomething`, `validateSomething`, `checkSomething`, `handleSomething`
- Functions that return booleans: `checkFav`, `isAddingFav`, `validateFilterParams`
- **Always prefer arrow functions over function declarations**: Use `const functionName = () => {}` instead of `function functionName() {}`
- Arrow functions provide consistent syntax, better `this` binding, and work well with TypeScript
- **No exceptions**: This applies to all functions including server actions, utilities, hooks, and components

### Function Declaration Examples

```typescript
// ✅ CORRECT: Use arrow functions
export const fetchUsersService = async (params: FetchUsersParams) => {
  return fetchUsers(params);
};

const handleClick = () => {
  // implementation
};

const checkFav = (id: number): boolean => {
  return favs.some((fav) => fav.user.id === id);
};

// ✅ CORRECT: Arrow function for server actions
export const fetchUsersAction = async (
  params: FetchUsersParams
): Promise<FetchUsersResult> => {
  return fetchUsersService(params);
};

// ❌ AVOID: Function declarations (always use arrow functions)
function fetchUsersService(params: FetchUsersParams) {
  return fetchUsers(params);
}

export function handleClick() {
  // implementation
}
```

### Components & Types

- Use PascalCase: `Card`, `Header`, `FavoritesContext`, `CardProps`
- Component files match component name: `Card.tsx` exports `Card`

### Context Files

- **Context files must use `.context.tsx` suffix**: `{Feature}.context.tsx` (e.g., `Modal.context.tsx`, `Shared.context.tsx`, `Filters.context.tsx`, `Favorites.context.tsx`)
- Context name inside file: `{Feature}Context` (e.g., `ModalContext`, `SharedContext`)
- Custom hook name: `use{Feature}Context` (e.g., `useModalContext`, `useSharedContext`)

### Constants

- Use UPPER_SNAKE_CASE: `DEFAULT_QUERY_PARAMS`, `STALE_DATA_THRESHOLD`, `PER_PAGE_CONFIGS`
- **ALL constants MUST be defined in a `constants.ts` file** - never define constants inline in component or utility files
- Constants should be organized by feature in `features/[feature]/lib/constants.ts` or shared in `features/shared/constants/constants.tsx`
- Export constants from `constants.ts` files and import them where needed
- This ensures constants are reusable, maintainable, and follow the abstraction principle

### Hooks

- **Must start with `use` prefix**: `useInfiniteUsers`, `useUrl`, `useFavsContext`, `useSharedContext`
- Return objects with descriptive property names
- Use camelCase after `use`: `useInfiniteUsers` not `useInfinite_Users`

### Services (React Query Hooks)

- **Service layer contains React Query hooks that start with `use` prefix**: `useInfiniteUsers`, `useInfiniteFavUsers`
- Follow the same naming as hooks but be specific about what data they fetch
- Use camelCase: `useInfiniteUsers` not `useInfinite_Users`
- Service files are named `[feature].service.ts` (e.g., `users.service.ts`)

### Data Layer Naming Conventions

**Repository Layer**:

- **Do NOT use "fetch" prefix** - Repository methods should use action verbs like `get`, `find`, `retrieve`
- Examples: `getUsers()`, `getUser()`, `findUserById()` (NOT `fetchUsers()`, `fetchUser()`)
- Repository is an abstraction, not a fetch function

**Adapter Layer**:

- **Use "to" prefix** for transformation functions: `toUserAdapter()`, `toUsersAdapter()`, `toFetchUsersResultAdapter()`
- Pattern: `to{TargetType}Adapter()` - transforms source → target
- Examples: `toUserAdapter()`, `toRepoAdapter()`, `toUsersAdapter()`

**Service Layer (Hooks)**:

- **Use "use" prefix** (React convention): `useInfiniteUsers()`, `useInfiniteFavUsers()`
- Follow React hook naming conventions
- Examples: `useInfiniteUsers()`, `useUser()`, `useUsers()`

**Service Layer (Actions)**:

- **Use "fetch" prefix + "Action" suffix**: `fetchUsersAction()`, `fetchUserAction()`
- Explicit naming for server actions
- Examples: `fetchUsersAction()`, `fetchUserAction()`, `fetchUserReposAction()`

### Data Layer Naming Examples

```typescript
// ✅ Repository Layer - No "fetch" prefix
export const usersRepository = {
  getUsers: async (params: FetchUsersParams) => {
    /* ... */
  },
  getUser: async (id: number) => {
    /* ... */
  },
  // ❌ NOT: fetchUsers, fetchUser
};

// ✅ Adapter Layer - "to" prefix
export const toUserAdapter = (apiUser: GitHubUser): User => {
  /* ... */
};
export const toUsersAdapter = (apiUsers: GitHubUser[]): User[] => {
  /* ... */
};
export const toFetchUsersResultAdapter = (
  response: GitHubUsersResponse
): FetchUsersResult => {
  /* ... */
};

// ✅ Service Layer (Hooks) - "use" prefix
export const useInfiniteUsers = () => {
  /* ... */
};
export const useUser = (id: number) => {
  /* ... */
};

// ✅ Service Layer (Actions) - "fetch" prefix + "Action" suffix
export const fetchUsersAction = async (params: FetchUsersParams) => {
  /* ... */
};
export const fetchUserAction = async (id: number) => {
  /* ... */
};
```

### Data Layer Naming Conventions

**Repository Layer**:

- **Do NOT use "fetch" prefix** - Repository methods should use action verbs like `get`, `find`, `retrieve`
- Examples: `getUsers()`, `getUser()`, `findUserById()` (NOT `fetchUsers()`, `fetchUser()`)
- Repository is an abstraction, not a fetch function

**Adapter Layer**:

- **Use "to" prefix** for transformation functions: `toUserAdapter()`, `toUsersAdapter()`, `toFetchUsersResultAdapter()`
- Pattern: `to{TargetType}Adapter()` - transforms source → target
- Examples: `toUserAdapter()`, `toRepoAdapter()`, `toUsersAdapter()`

**Service Layer (Hooks)**:

- **Use "use" prefix** (React convention): `useInfiniteUsers()`, `useInfiniteFavUsers()`
- Follow React hook naming conventions
- Examples: `useInfiniteUsers()`, `useUser()`, `useUsers()`

**Service Layer (Actions)**:

- **Use "fetch" prefix + "Action" suffix**: `fetchUsersAction()`, `fetchUserAction()`
- Explicit naming for server actions
- Examples: `fetchUsersAction()`, `fetchUserAction()`, `fetchUserReposAction()`

### Data Layer Naming Examples

````typescript
// ✅ Repository Layer - No "fetch" prefix
export const usersRepository = {
  getUsers: async (params: FetchUsersParams) => { /* ... */ },
  getUser: async (id: number) => { /* ... */ },
  // ❌ NOT: fetchUsers, fetchUser
};

// ✅ Adapter Layer - "to" prefix
export const toUserAdapter = (apiUser: GitHubUser): User => { /* ... */ };
export const toUsersAdapter = (apiUsers: GitHubUser[]): User[] => { /* ... */ };
export const toFetchUsersResultAdapter = (response: GitHubUsersResponse): FetchUsersResult => { /* ... */ };

// ✅ Service Layer (Hooks) - "use" prefix
export const useInfiniteUsers = () => { /* ... */ };
export const useUser = (id: number) => { /* ... */ };

// ✅ Service Layer (Actions) - "fetch" prefix + "Action" suffix
export const fetchUsersAction = async (params: FetchUsersParams) => { /* ... */ };
export const fetchUserAction = async (id: number) => { /* ... */ };
``` for client-side
- Actions files are named `[feature].actions.ts` (e.g., `users.actions.ts`) for server-side

````
