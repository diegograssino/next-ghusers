# Data Layer Architecture

### Clean Architecture: Three-Layer Data Architecture

The project uses **Clean Architecture** with a three-layer pattern-based architecture:

1. **Repository Layer** (`features/[feature]/repository/[feature].repository.ts`) - Repository Pattern: Data Access
2. **Adapter Layer** (`features/[feature]/adapter/[feature].adapter.ts`) - Adapter Pattern: Data Transformation
3. **Service Layer** (`features/[feature]/services/`) - Service Pattern: Business Logic
   - `[feature].service.ts` - Client-side React Query hooks
   - `[feature].actions.ts` - Server-side actions

This architecture follows **Clean Architecture** principles (Robert C. Martin) and ensures:
- **Dependency Rule**: Dependencies point inward (Service → Adapter → Repository → API)
- **Independence**: Business logic independent of frameworks, databases, and external agencies
- **Testability**: Each layer can be tested independently
- **Maintainability**: Clear separation of concerns

### Repository Layer (repository/[feature].repository.ts)

**Pattern**: Repository Pattern (DDD, Clean Architecture)

**Purpose**: Data Access Layer - Abstracts data access from external sources

**Responsibilities**:
- Makes raw API calls to external systems (e.g., GitHub API)
- Handles network errors, timeouts, retries
- Returns raw API response types
- Provides a consistent interface for data access
- Hides API implementation details from business logic

**File Naming**: `[feature].repository.ts` (e.g., `users.repository.ts`)

**Location**: `features/[feature]/repository/[feature].repository.ts`

**Repository Layer Example**:

```typescript
// features/users/repository/users.repository.ts
import { FetchUsersParams } from "@/types/users";
import { GitHubUsersResponse, GitHubUser } from "@/types/users/api";
import { fetchUsers, fetchUser } from "../lib/utils"; // Relative import for same feature

export const usersRepository = {
  getUsers: async (params: FetchUsersParams): Promise<GitHubUsersResponse> => {
    // Raw API call - returns GitHub API response format
    return fetchUsers(params);
  },

  getUser: async (id: number): Promise<GitHubUser | null> => {
    // Raw API call - returns GitHub API response format
    return fetchUser(id);
  },
};
```

**Note**: Repository uses utility functions from `lib/utils.ts` for actual API calls. Repository is the abstraction layer that hides API implementation details.

### Adapter Layer (adapter/[feature].adapter.ts)

**Pattern**: Adapter Pattern (GoF, Hexagonal Architecture, Clean Architecture)

**Purpose**: Data Transformation Layer - Transforms external API models to internal domain models

**Responsibilities**:
- Transforms external API responses → internal domain models
- Converts API field names (e.g., `snake_case` → `camelCase`)
- Removes unused fields from API responses
- Provides clean, app-specific domain models
- Acts as Anti-Corruption Layer (prevents external API structure from corrupting domain models)

**File Naming**: `[feature].adapter.ts` (e.g., `users.adapter.ts`)

**Location**: `features/[feature]/adapter/[feature].adapter.ts`

**Adapter Rules - REQUIRED**:

1. **Only adapt values that are used in the app** - Do NOT adapt all API fields, only the ones actually used in components, services, or contexts
   - Check which fields are accessed in components, services, and contexts
   - Only include fields that are actively used
   - This keeps domain models lean and focused

2. **Convert snake_case to camelCase** - The service layer should receive camelCase property names, not snake_case
   - API responses use `snake_case` (e.g., `avatar_url`, `public_repos`, `html_url`)
   - Domain models use `camelCase` (e.g., `avatarUrl`, `publicRepos`, `htmlUrl`)
   - Adapters transform: `apiUser.avatar_url` → `avatarUrl`
   - This ensures consistent JavaScript/TypeScript naming conventions throughout the app

**Adapter Layer Example**:

```typescript
// features/users/adapter/users.adapter.ts
import { GitHubUser, GitHubUsersResponse } from "@/types/users/api";
import { User, FetchUsersResult } from "@/types/users"; // Types use @/ alias

export const toUserAdapter = (apiUser: GitHubUser): User => {
  return {
    id: apiUser.id,
    login: apiUser.login,
    avatarUrl: apiUser.avatar_url, // ✅ snake_case → camelCase
    followers: apiUser.followers,
    following: apiUser.following,
    publicRepos: apiUser.public_repos, // ✅ snake_case → camelCase
    bio: apiUser.bio,
    // ✅ Only fields we actually use in our app (checked in components/services)
  };
};

export const toUsersAdapter = (apiUsers: GitHubUser[]): User[] => {
  return apiUsers.map(toUserAdapter);
};

export const toFetchUsersResultAdapter = (
  apiResponse: GitHubUsersResponse
): FetchUsersResult => {
  return {
    users: toUsersAdapter(apiResponse.users),
    nextSince: apiResponse.nextSince,
    totalCount: apiResponse.totalCount,
  };
};
```

### Service Layer (services/[feature].service.ts)

**Pattern**: Service Pattern (Enterprise Application Architecture, Clean Architecture)

**Purpose**: Business Logic Layer - Contains application-specific business rules and React Query integration

**Responsibilities**:
- Implements use cases (application-specific business rules)
- Orchestrates Repository and Adapter
- Integrates React Query for caching, loading states, and error handling
- Provides computed values and helper functions
- Contains business logic (filtering, sorting, pagination, stale data checks)
- Returns UI-ready data

**File Naming**: `[feature].service.ts` (e.g., `users.service.ts`) for client-side React Query hooks

**Location**: `features/[feature]/services/[feature].service.ts`

**Service Layer Example**:

```typescript
// features/users/services/users.service.ts
import { useInfiniteQuery, useQueries } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { QueryParams, User } from "@/types/users";
import { usersRepository } from "@users/repository";
import {
  toFetchUsersResultAdapter,
  toUserAdapter,
} from "@users/adapter";
import { DEFAULT_QUERY_PARAMS } from "../lib/constants";

export const useInfiniteUsers = (
  queryParams: QueryParams = DEFAULT_QUERY_PARAMS,
  perPage = PER_PAGE_CONFIGS.desktop.items,
  initialData?: FetchUsersResult
) => {
  const { data, error, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["users", queryParams, perPage],
      queryFn: async ({ pageParam }) => {
        // 1. Repository: Get raw data from API
        const rawResponse = await usersRepository.getUsers({
          perPageParam: perPage,
          pageParam,
          queryParams,
        });

        // 2. Adapter: Transform API response → Domain model
        return toFetchUsersResultAdapter(rawResponse);
      },
      // ... other React Query options
    });

  // Business logic: Flatten paginated data
  const flattenedUsers = useMemo(() => {
    return data?.pages.map((page) => page.users).flat() || [];
  }, [data]);

  // Business logic: Computed values
  const isLoading = useMemo(() => {
    return isFetching && flattenedUsers.length === 0;
  }, [isFetching, flattenedUsers]);

  return {
    users: flattenedUsers,
    isError: error,
    isLoading,
    hasNextPage,
    handleLoadMore: useCallback(() => {
      if (hasNextPage && !isFetching) {
        fetchNextPage();
      }
    }, [hasNextPage, isFetching, fetchNextPage]),
  };
};
```

### Data Flow

```
Component
  ↓
Service Layer (users.service.ts)
  ↓ uses
Adapter Layer (users.adapter.ts)
  ↓ uses
Repository Layer (users.repository.ts)
  ↓ uses
External API (GitHub API)
```

### Benefits of This Architecture

- **Clean Architecture Compliance**: Follows Robert C. Martin's Clean Architecture principles
- **Separation of Concerns**: Each layer has a single, clear responsibility
- **Testability**: Each layer can be tested independently (mock Repository, test Adapter transformations, test Service business logic)
- **Maintainability**: Changes to API structure only affect Repository/Adapter, business logic remains stable
- **Flexibility**: Easy to swap data sources (change Repository), change APIs (change Adapter), modify business rules (change Service)
- **Type Safety**: Adapter provides type transformation, domain models are clean and focused
- **Scalability**: Can add new repositories, adapters, or services easily

### Type Definitions

- **Types should be organized by feature in the `types/` directory**
- Similar to queries and services, types are separated by feature domain
- Located in `types/[feature]/[feature].tsx` (match folder name)
- Export types from feature-specific type files

### Type Organization Example

```
types/
├── users/
│   └── users.tsx          # User-related types (User, FetchUsersResult, etc.)
├── shared/
│   └── shared.tsx         # Shared types
├── ui/
│   └── ui.tsx             # UI component types
└── index.tsx              # Main type exports (root types folder)
```

### Server Actions (users.actions.ts)

Server actions are part of the Service layer but run on the server. They use the same three-layer architecture:

**File Naming**: `[feature].actions.ts` (e.g., `users.actions.ts`)

**Location**: `features/[feature]/services/[feature].actions.ts`

**Server Actions Example**:

```typescript
// features/users/services/users.actions.ts
"use server";

import { usersRepository } from "../repository/users.repository";
import { toFetchUsersResultAdapter } from "../adapter/users.adapter";
import { FetchUsersParams, FetchUsersResult } from "@/types/users";

export const fetchUsersAction = async (
  params: FetchUsersParams
): Promise<FetchUsersResult> => {
  // 1. Repository: Get raw data from API
  const rawResponse = await usersRepository.getUsers(params);

  // 2. Adapter: Transform to domain model
  return toFetchUsersResultAdapter(rawResponse);
};
```

**Note**: Server actions use Repository + Adapter directly (no React Query, as that's client-side only). Both `users.service.ts` (client) and `users.actions.ts` (server) are part of the Service layer and orchestrate Repository + Adapter.

