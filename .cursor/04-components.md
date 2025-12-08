# Component Patterns

### Component Structure

- **Use default exports for components** - this is the current pattern and works well with Next.js
- Use named exports for hooks, utilities, types, and skeleton components
- **IMPORTANT**: Import CSS/SCSS modules and destructure styles OUTSIDE the component (before component definition) - do this only once, not inside the component
- Use functional components with TypeScript

### Export Patterns

#### Default Exports (Recommended for Components)

- **Use default exports for React components** - one component per file
- Works well with Next.js conventions (pages, layouts)
- Cleaner imports: `import Card from "./Card"`
- Barrel exports can re-export as named: `export { default as Card } from "./Card"`

#### Named Exports (Recommended for Everything Else)

- **Use named exports for hooks, utilities, functions, constants, and types**
- Better for tree-shaking and code splitting
- Better IDE support (autocomplete, refactoring)
- Can export multiple items from one file
- Easier to find usages across codebase

#### Export Pattern Examples

```typescript
// ✅ Component with default export
const Card = ({ user }: CardProps) => {
  return <article>{/* ... */}</article>;
};
export default Card;

// ✅ Named exports for skeletons, hooks, utilities
export const CardSkeleton = () => {
  /* ... */
};
export const useInfiniteUsers = () => {
  /* ... */
};
export const fetchUsersService = async () => {
  /* ... */
};
export const DEFAULT_QUERY_PARAMS = {
  /* ... */
};

// ✅ Barrel export re-exports default as named
// features/users/ui/index.tsx
export { default as Card, CardSkeleton } from "./Card/Card";
```

#### When to Use Each

- **Default exports**: React components (one per file), Next.js pages/layouts
- **Named exports**: Hooks, utilities, constants, types, multiple exports from one file, skeleton components

### Component Example

```typescript
import { CardProps } from "@/types";
import styles from "./Card.module.scss";

// Destructure styles OUTSIDE the component (do this once, not inside)
const { card, cardContent, cardImage } = styles;

const Card = ({ user }: CardProps) => {
  return (
    <article className={card} data-testid="card">
      <div className={cardContent}>{/* component content */}</div>
    </article>
  );
};

export default Card;
```

### Component Props Patterns

#### Children Prop

- **Always type `children` as `React.ReactNode`** - supports any valid React child (string, number, element, array, etc.)
- Destructure `children` from props
- Render `children` directly in JSX

#### Spread Props Pattern

- **Use `...otherProps` to forward HTML attributes** - allows components to accept standard HTML props
- **Type `otherProps` properly** - extend `HTMLAttributes<HTMLElement>` or use `Omit<HTMLAttributes<HTMLElement>, "conflictingProp">`
- **Spread `otherProps` to the root element** - enables className, onClick, data-* attributes, etc.
- **Merge className properly** - use `clsx` to combine component className with `otherProps.className`
- **Document Omit exclusions** - When using `Omit` to exclude props (e.g., `"color"`, `"ref"`), add DOC comments explaining why:
  - `// DOC Omit "color" to use variant prop instead (variant controls text color via ColorVariants)`
  - `// DOC Omit "ref" because Typography doesn't use forwardRef - refs are not supported`
  - `// DOC Omit "color" - Container is a layout component, doesn't use color styling`

#### Boolean Flag Destructuring

- **Rename boolean props with descriptive names** when destructuring
- Pattern: `propName: isPropName` or `propName: hasPropName` (follow boolean naming conventions)
- Examples: `truncate: isTruncated`, `shadow: hasShadow`, `backgroundImage: hasBackgroundImage`

### Component Props Examples

```typescript
// ✅ Children prop
interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <div>{children}</div>;
};

// ✅ Spread props pattern
interface TypographyProps extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  size?: Sizes;
  variant?: ColorVariants;
}

const Typography = ({
  children,
  size = "md",
  variant = "default",
  ...otherProps
}: TypographyProps) => {
  return (
    <p
      {...otherProps}
      className={clsx(typography, otherProps.className)}
    >
      {children}
    </p>
  );
};

// ✅ Boolean flag destructuring
const Typography = ({
  truncate: isTruncated = false,
  shadow: hasShadow = false,
  ...otherProps
}: TypographyProps) => {
  return (
    <p
      className={clsx(
        typography,
        isTruncated && ellipsis,
        hasShadow && shadow
      )}
    >
      {children}
    </p>
  );
};
```

### Event Handlers

- **Use `useCallback` for event handlers** - prevents unnecessary re-renders
- **Type event handlers properly** - `React.MouseEvent<HTMLButtonElement>`, `React.ChangeEvent<HTMLInputElement>`, etc.
- **Use `preventDefault()` when needed** - especially for buttons inside Links or forms
- **Handle errors in async event handlers** - use try-catch blocks

### Event Handler Example

```typescript
const handleClick = useCallback(
  async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await someAsyncAction();
    } catch (error) {
      console.error("Error:", error);
    }
  },
  [dependencies]
);
```

### CSS Custom Properties (CSS Variables)

- **Use CSS custom properties for dynamic values** - especially for grid columns, spacing, colors
- **Type style prop correctly** - use `React.CSSProperties` with type assertion
- **Set custom properties via inline styles** - `style={{ "--grid-cols": cols } as React.CSSProperties}`
- **Use in SCSS** - reference with `var(--grid-cols)` or `grid-template-columns: repeat(var(--grid-cols), 1fr)`

### CSS Custom Properties Example

```typescript
const CardGrid = ({ children, perPageConfig }: CardGridProps) => {
  const cols = perPageConfig?.columns || "1";

  return (
    <div
      className={cardGrid}
      style={{ "--grid-cols": cols } as React.CSSProperties}
    >
      {children}
    </div>
  );
};
```

```scss
// CardGrid.module.scss
.cardGrid {
  display: grid;
  grid-template-columns: repeat(var(--grid-cols), 1fr);
}
```

### Component Props

- Define props using interfaces from `types/` directory
- Use destructuring for props
- Support polymorphic components with `as` prop pattern when needed
- **Always use `React.ReactNode` type for `children` prop** - supports any valid React child
- **Use `...otherProps` pattern to forward HTML attributes** - allows components to accept standard HTML props
- **Type `otherProps` properly** - extend `HTMLAttributes<HTMLElement>` or use `Omit<HTMLAttributes<HTMLElement>, "color">` to exclude conflicting props

### Reusable Components with Variants, Sizes, and Weights

- **Create reusable components with configurable props** for variants, sizes, weights, and other styling options
- Use TypeScript union types for variant values (e.g., `Sizes`, `WeightVariants`, `ColorVariants`)
- Define variant types in `types/ui/ui.tsx` for shared variants, or in feature-specific type files
- Use `getStyleClass` helper for type-safe dynamic style access based on props
- Provide sensible defaults for all variant props
- Combine base class with variant classes using `clsx`
- Support polymorphic rendering with `as` prop when needed

### Reusable Component Pattern

```typescript
// types/ui/ui.tsx
export type Sizes = "xs" | "sm" | "md" | "lg" | "xl";
export type WeightVariants = "thin" | "normal" | "bold";
export type ColorVariants = "default" | "primary" | "secondary" | "accent";

export interface TypographyProps
  extends Omit<HTMLAttributes<HTMLOrSVGElement>, "color"> {
  as?: TypographyElements;
  size?: Sizes;
  weight?: WeightVariants;
  variant?: ColorVariants;
  truncate?: boolean;
}
```

```typescript
// Typography.tsx
import { getStyleClass } from "@/features/shared/lib/utils";
import { TypographyProps } from "@/types";
import clsx from "clsx";
import styles from "./Typography.module.scss";

const { typography, ellipsis } = styles;

const Typography = ({
  children,
  as: Tag = "p",
  weight = "normal",
  size = "md",
  truncate = false,
  variant = "default",
  ...otherProps
}: TypographyProps) => {
  return (
    <Tag
      {...otherProps}
      className={clsx(
        typography,
        getStyleClass(styles, variant),
        getStyleClass(styles, weight),
        getStyleClass(styles, size),
        truncate && ellipsis,
        otherProps.className
      )}
    >
      {children}
    </Tag>
  );
};
```

### Variant Type Guidelines

- **Shared variants** (used across multiple components): Define in `types/ui/ui.tsx`
  - Examples: `Sizes`, `WeightVariants`, `ColorVariants`
- **Component-specific variants**: Define in the component's props interface
- **Use descriptive names**: `ColorVariants` not `Colors`, `WeightVariants` not `Weights`
- **Use union types**: `type Sizes = "xs" | "sm" | "md" | "lg" | "xl"`
- **Provide defaults**: Always provide sensible default values for variant props

### Polymorphic Components

- Use `as` prop pattern for components that can render as different HTML elements
- Default to a sensible element (e.g., `div` for containers)
- Spread remaining props to the rendered element using `...otherProps`
- Use TypeScript to ensure type safety
- **When using `forwardRef` with polymorphic components, always set `displayName`** for better debugging

### forwardRef Pattern

- **Use `forwardRef` for reusable UI components** that render HTML elements - allows parent components to access the underlying DOM element
- **Always set `displayName`** when using `forwardRef` for better debugging experience in React DevTools
- **When to use `forwardRef`**:
  - Reusable components that render HTML elements (buttons, inputs, containers, etc.)
  - Components that might need refs for focus management, animations, measurements, or third-party library integration
  - Polymorphic components that can render as different HTML elements
- **When NOT to use `forwardRef`**:
  - Page components or feature-specific components that are not reused
  - Components that don't render HTML elements directly
  - Components where refs are never needed (e.g., `Typography` - text components typically don't need refs)
  - If refs aren't needed, exclude `ref` from the interface using `Omit<HTMLAttributes<HTMLElement>, "ref">` and document why
- **Type the ref correctly** - Use the appropriate HTML element type (e.g., `HTMLButtonElement`, `HTMLAnchorElement`, `HTMLElement`)
- **For polymorphic components**, use union types for refs (e.g., `HTMLButtonElement | HTMLAnchorElement`)
- **Document ref exclusions** - When excluding `ref` from an interface, add a DOC comment explaining why (e.g., "DOC Omit 'ref' because Typography doesn't use forwardRef - refs are not supported")

### Polymorphic Component Example

```typescript
import { forwardRef } from "react";

interface ContainerProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  [key: string]: unknown;
}

const Container = forwardRef<HTMLElement, ContainerProps>(
  ({ children, as: Tag = "div", ...otherProps }, ref) => {
    return (
      <Tag ref={ref} {...otherProps} className={container}>
        {children}
      </Tag>
    );
  }
);

Container.displayName = "Container";

export default Container;
```

### Skeleton Components

- Create skeleton/loading variants for components that display data
- Export skeleton components from the same file as the main component
- Use the same structure as the main component but with skeleton styles
- Name skeleton components with `Skeleton` suffix: `CardSkeleton`, `CardGridSkeleton`
- Export both main component and skeleton from barrel exports

### Skeleton Component Example

```typescript
// Card.tsx
const Card = ({ user }: CardProps) => {
  return <article className={card}>{/* ... */}</article>;
};

export const CardSkeleton = () => {
  return (
    <article className={clsx(card, cardSkeleton)} data-testid="card-skeleton">
      {/* Skeleton structure */}
    </article>
  );
};

export default Card;
```

### Barrel Exports

- **Use `index.tsx` files ONLY for barrel exports** - re-exporting multiple files for cleaner imports
- Export both default and named exports (including skeletons)
- This allows clean imports: `import { Card, CardSkeleton } from "@/features/users/ui"` instead of `import Card from "@/features/users/ui/Card/Card"`
- Place barrel exports in `features/[feature]/ui/index.tsx`
- **Purpose**: Short alias imports, not for single-file folders

### Barrel Export Example

```typescript
// features/users/ui/index.tsx
export { default as Card, CardSkeleton } from "./Card/Card";
export { default as CardGrid, CardGridSkeleton } from "./CardGrid/CardGrid";
export { default as Filters } from "./Filters/Filters";
```

