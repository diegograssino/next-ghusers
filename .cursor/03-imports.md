# Import Organization

### Import Order

1. External libraries (React, Next.js, third-party)
2. Internal imports using `@/` path alias (features, types, styles)
3. Feature-specific short aliases (e.g., `@users/repository`, `@users/adapter`)
4. Relative imports (same directory or nearby)
5. Type-only imports should use `import type` when appropriate

**Note**: Import ordering is automatically enforced via ESLint (`eslint-plugin-simple-import-sort`). Imports are automatically sorted on save (via VS Code's `source.fixAll`) and can be manually fixed with `npm run lint -- --fix`.

### Import Examples

```typescript
// External libraries first
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Internal imports with @/ alias
import { useSharedContext } from "@/features/shared/contexts/SharedContext";
import { User, QueryParams } from "@/types";
import "@/styles/globals.scss";

// Feature-specific layer imports (using short aliases)
import { usersRepository } from "@users/repository";
import { toUserAdapter, toUsersAdapter } from "@users/adapter";
import { useInfiniteUsers } from "@users/services";
import { fetchUsersAction } from "@users/actions";

// Relative imports last (for same directory or nearby files)
import styles from "./Card.module.scss";
```

### Import Strategy for Data Layer

**Use short aliases for data layer imports**:

```typescript
// ✅ PREFERRED: Short aliases for data layer
import { usersRepository } from "@users/repository";
import { toUserAdapter } from "@users/adapter";
import { useInfiniteUsers } from "@users/services";
import { fetchUsersAction } from "@users/actions";

// ⚠️ ACCEPTABLE: Full path (if alias not configured)
import { usersRepository } from "@/features/users/repository/users.repository";
import { toUserAdapter } from "@/features/users/adapter/users.adapter";
import { useInfiniteUsers } from "@/features/users/services/users.service";
import { fetchUsersAction } from "@/features/users/services/users.actions";

// ❌ AVOID: Relative paths for data layer (harder to maintain)
import { usersRepository } from "../../repository/users.repository";
import { toUserAdapter } from "../../adapter/users.adapter";
```
