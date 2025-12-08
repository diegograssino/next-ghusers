# File Structure & Organization

### Feature-Based Architecture

- Organize code by features in the `features/` directory
- Each feature should have its own `ui/`, `lib/`, `contexts/`, `repository/`, `adapter/`, and `services/` subdirectories as needed
- Shared code goes in `features/shared/`
- Use `types/` directory for TypeScript type definitions organized by domain

### Example Folder Structure

```
project-root/
├── app/                          # Next.js App Router
│   ├── [id]/                    # Dynamic routes
│   │   └── page.tsx
│   ├── favs/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx
│
├── features/                     # Feature-based organization
│   ├── pages/                   # Page components
│   │   ├── SearchPage/
│   │   │   ├── SearchPage.tsx
│   │   │   └── SearchPage.module.scss
│   │   └── FavsPage/
│   │       ├── FavsPage.tsx
│   │       └── FavsPage.module.scss
│   │
│   ├── shared/                  # Shared across features
│   │   ├── constants/
│   │   │   └── constants.tsx    # Single file folder → match folder name
│   │   ├── contexts/
│   │   │   └── SharedContext.tsx
│   │   ├── hooks/
│   │   │   └── hooks.ts         # Single file folder → match folder name
│   │   ├── lib/
│   │   │   ├── logger.ts
│   │   │   └── utils.ts
│   │   └── ui/                  # Shared UI components
│   │       ├── Header/
│   │       │   ├── Header.tsx
│   │       │   ├── Header.module.scss
│   │       │   └── Header.spec.tsx
│   │       ├── Container/
│   │       │   ├── Container.tsx
│   │       │   ├── Container.module.scss
│   │       │   └── Container.spec.tsx
│   │       └── index.tsx        # Barrel export
│   │
│   └── users/                   # User feature domain
│       ├── contexts/
│       │   ├── FavsContext.tsx
│       │   └── FavsContext.spec.tsx
│       ├── lib/
│       │   ├── constants.ts
│       │   └── utils.ts         # Utility functions (helper functions for repository/adapter)
│       ├── repository/
│       │   └── users.repository.ts  # Repository Pattern: Data Access Layer
│       ├── adapter/
│       │   └── users.adapter.ts     # Adapter Pattern: Data Transformation Layer
│       ├── services/
│       │   ├── users.service.ts     # Service Pattern: Business Logic Layer (React Query hooks - client)
│       │   └── users.actions.ts     # Service Pattern: Business Logic Layer (Server actions - server)
│       └── ui/                  # User-specific UI components
│           ├── Card/
│           │   ├── Card.tsx
│           │   ├── Card.module.scss
│           │   └── Card.spec.tsx
│           ├── CardGrid/
│           │   ├── CardGrid.tsx
│           │   ├── CardGrid.module.scss
│           │   └── CardGrid.spec.tsx
│           └── index.tsx        # Barrel export
│
├── types/                       # TypeScript type definitions
│   ├── pages/
│   │   └── pages.tsx            # Single file folder → match folder name
│   ├── shared/
│   │   └── shared.tsx           # Single file folder → match folder name
│   ├── ui/
│   │   └── ui.tsx               # Single file folder → match folder name
│   ├── users/
│   │   └── users.tsx            # Single file folder → match folder name
│   └── index.tsx               # Main type exports (root types folder)
│
├── styles/                      # Global styles
│   ├── abstracts/              # SCSS variables and constants (organized in partials)
│   │   ├── _variables.scss
│   │   ├── _colors.scss
│   │   ├── _typography.scss
│   │   └── ...
│   ├── mixins/                 # SCSS mixins (organized in partials)
│   │   ├── _breakpoints.scss
│   │   ├── _hover.scss
│   │   └── ...
│   ├── abstracts.scss          # Main file: imports all abstract partials
│   ├── mixins.scss             # Main file: imports all mixin partials
│   ├── globals.scss            # Global styles
│   └── reset.scss              # CSS reset
│
├── __mocks__/                  # Test mocks
│   └── users.ts
│
├── .cursorrules                # Cursor AI rules (this file)
├── tsconfig.json               # TypeScript config with path aliases
├── next.config.ts              # Next.js config
└── package.json
```

### Component Folder Pattern

Each component should follow this structure:

```
ComponentName/
  ├── ComponentName.tsx              # Component file (PascalCase)
  ├── ComponentName.module.scss      # Styles (CSS Modules)
  ├── ComponentName.spec.tsx         # Tests (same name + .spec)
  └── ComponentName.constants.ts     # Optional: Component-specific constants
```

**Component-specific constants files**:
- Use `ComponentName.constants.ts` when a component has its own constants (e.g., message mappings, configuration objects)
- Export named constants (camelCase for objects, UPPER_SNAKE_CASE for primitive values)
- Import in component: `import { componentConstants } from "./ComponentName.constants"`
- Example: `PageMessage.constants.ts` exports `pageMessages` object

### File Naming

- Components: PascalCase (e.g., `Card.tsx`, `Header.tsx`)
- Hooks: camelCase starting with `use` (e.g., `useInfiniteUsers.ts`, `useUrl.ts`)
- Utilities: camelCase (e.g., `utils.ts`, `constants.ts`)
- Types: camelCase (e.g., `index.tsx`)
- **Test files: Use `.spec.tsx` extension with the same name as the component** (e.g., `Card.spec.tsx` for `Card.tsx`, `Header.spec.tsx` for `Header.tsx`)
- Styles: `.module.scss` matching component name (e.g., `Card.module.scss` for `Card.tsx`)
- **Repository files: `[feature].repository.ts`** (e.g., `users.repository.ts`)
- **Adapter files: `[feature].adapter.ts`** (e.g., `users.adapter.ts`)
- **Service files: `[feature].service.ts`** (e.g., `users.service.ts`) - Client-side React Query hooks
- **Actions files: `[feature].actions.ts`** (e.g., `users.actions.ts`) - Server-side actions

### Single File Folders: Match Folder Name

- **If a folder contains only one file, match the folder name**
- Use the folder name as the file name: `constants/` → `constants.ts`, `types/` → `types.ts`
- **Exceptions** (these folders have their own naming conventions):
  - `app/` folder - Next.js App Router has its own conventions (pages, layouts, etc.)
  - `styles/` folder - Has its own SCSS organization rules
  - `repository/` folder - Uses `[feature].repository.ts` (e.g., `users.repository.ts`)
  - `adapter/` folder - Uses `[feature].adapter.ts` (e.g., `users.adapter.ts`)
  - `services/` folder - Uses `[feature].service.ts` and `[feature].actions.ts`
- Examples:
  - `features/shared/constants/constants.ts` (matches folder name)
  - `types/users/users.ts` (matches folder name)
  - `features/users/lib/constants.ts` (matches folder name if it's the only file)

### Barrel Exports: Use `index.ts` for Short Alias Imports

- **`index.ts` (or `index.tsx`) files are ONLY for barrel exports** - re-exporting multiple files for cleaner imports
- Barrel exports allow short alias imports: `import { Card } from "@/features/users/ui"` instead of `import { Card } from "@/features/users/ui/Card/Card"`
- **Do NOT use `index.ts` for single-file folders** - use the folder name instead
- Common barrel export locations:
  - `features/[feature]/ui/index.tsx` - Re-exports all UI components
  - `types/index.tsx` - Re-exports all type definitions (root types folder)
- Examples:
  - `features/users/ui/index.tsx` - Barrel export: `export { default as Card } from "./Card/Card";`
  - `types/index.tsx` - Barrel export: `export * from "./users/users";`

