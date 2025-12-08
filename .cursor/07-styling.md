# Styling Patterns

### SCSS Organization

- **Styles are organized in folders** within the `styles/` directory
- Use **Sass partials** (files starting with `_`) for modular organization
- Use `@forward` in `_index.scss` files to expose partials
- Use `@use` to import directories in main files (globals.scss, base files, layout files)
- **Component modules do NOT need imports** - abstracts are automatically available via `prependData`
- Organize styles by concern: abstracts (variables, mixins, functions), base (reset, base styles), layouts (page-specific layouts)
- Two main files: `globals.scss` (for layout) and `main.scss` (for prependData)

### SCSS Folder Structure

```
styles/
├── abstracts/               # Variables, mixins, functions (no CSS output)
│   ├── _variables.scss      # Breakpoints, spacing, transitions
│   ├── _colors.scss         # Color definitions
│   ├── _typography.scss     # Font and text styles
│   ├── _layout.scss         # Layout variables
│   ├── _mixins.scss         # Mixins (breakpoints, hover, etc.)
│   ├── _animations.scss     # Animation variables and keyframes
│   └── _index.scss          # Forwards all abstract partials
├── base/                    # Reset, normalize, base element styles
│   ├── _reset.scss          # CSS reset
│   ├── _base.scss           # Base element styles (body, :root, etc.)
│   └── _index.scss          # Forwards all base partials
├── layouts/                 # Page/section-specific layout styles
│   ├── _global-layout.scss  # Global layout styles
│   └── _index.scss          # Forwards all layout partials
├── globals.scss             # Global styles for layout: imports layouts and base
└── main.scss                # Core SCSS (abstracts): forwards abstracts/_index.scss
```

### SCSS Partial Pattern

- **Partials** (files starting with `_`): Contain specific style definitions
- **Index files** (`_index.scss`): Use `@forward` to expose all partials in a directory
- **Main files** (without `_`): Import directories using `@use` or `@forward`
- **Component modules**: No imports needed - abstracts are automatically available via `prependData` in `next.config.ts`

### File Organization

- **`globals.scss`** - Imported in `app/layout.tsx`, contains global styles (layouts and base)
- **`main.scss`** - **Single contact point** that forwards abstracts (variables, mixins, functions)
- **Component modules** - Import `main.scss` using `@use "../../../../styles/main" as *;` (adjust path as needed)
- **Important**: `main.scss` is the single contact point. If you add new folders (beyond abstracts), add them to `main.scss` - it forwards all core SCSS that modules need

### SCSS Partial Example

```scss
// styles/abstracts/_variables.scss (Partial)
$border-radius: 0.5rem;
$spacing-unit: 1rem;

// styles/abstracts/_colors.scss (Partial)
$color-primary: #3b82f6;
$color-secondary: #4a4a4a;

// styles/abstracts/_index.scss (Index file - forwards all partials)
@forward "./variables.scss";
@forward "./colors.scss";
@forward "./typography.scss";
@forward "./layout.scss";
@forward "./mixins.scss";
@forward "./animations.scss";

// styles/main.scss (Single contact point for prependData - forwards abstracts)
@forward "./abstracts/index.scss";
// DOC If you add new folders (e.g., functions, utilities), add them here:
// @forward "./new-folder/index.scss";

// styles/globals.scss (Global styles for layout - imported in app/layout.tsx)
@use "layouts";
@use "base";
```

### CSS/SCSS Modules

- **This project uses CSS Modules** - all component styles are co-located with components as `.module.scss` files
- Components are self-contained and don't need global styling
- **Import `main.scss` in component modules** using `@use "../../../../styles/main" as *;` (adjust relative path as needed)
- `main.scss` forwards all abstracts (variables, mixins, functions), so importing it gives access to everything
- **CRITICAL**: Import and destructure styles OUTSIDE the component definition (before the component), not inside
- This ensures the destructuring happens only once, improving performance
- Use camelCase for class names
- **Use `$color-*` variables (CSS custom properties) in component SCSS modules** - NOT `$base-color-*`
  - `$color-accent`, `$color-background`, `$color-foreground`, etc. - These support dynamic theming (light/dark mode)
  - `$base-color-*` variables are ONLY used in `styles/base/_base.scss` to define the CSS custom properties
  - Example: `background-color: $color-accent;` ✅ NOT `background-color: $base-color-accent;` ❌
- **Use short hex color format when possible** - Use 3-character hex codes instead of 6-character when the color allows it
  - `#000` ✅ NOT `#000000` ❌
  - `#fff` ✅ NOT `#ffffff` ❌
  - `#3b82f6` ✅ (cannot be shortened, different digits)
  - This follows the `color-hex-length` linting rule and keeps code concise
- **Never hardcode sizing values** - Always use SCSS variables for padding, font sizes, spacing, etc.
  - Create variables in `styles/abstracts/_variables.scss` for component-specific sizes (e.g., `$button-padding-*-*`, `$font-size-*-*`)
  - Use descriptive variable names that indicate the component, property, size, and breakpoint (e.g., `$button-padding-md-vertical-base`, `$font-size-sm-md`)
  - This ensures consistency across components and makes global changes easier
- Use SCSS variables from abstracts (spacing, typography, etc.)
- Mixins are part of abstracts, so importing `main.scss` gives access to all mixins

### CSS Class Naming Convention

- **Base class**: Use lowercase component name (e.g., `Card` → `.card`, `CardGrid` → `.cardGrid`)
- **Child/part classes**: Use lowercase component name + camelCase descriptor
  - `Card` → `.cardContent`, `.cardImage`, `.cardImageContainer`, `.cardOptions`
  - `SearchPage` → `.searchPageSearch`, `.searchPageAside`, `.searchPageResults`
- **Variant classes**: Use lowercase component name + variant name
  - `Card` → `.cardSkeleton`, `.cardContentSkeleton`, `.cardOptionsSkeleton`
  - `CardGrid` → `.cardGridSkeleton`
- **Naming pattern**: `{componentName}{Part/Variant}` in camelCase, all lowercase for base

### CSS Class Naming Examples

```scss
// Card.module.scss
.card {
  /* base component */
}
.cardContent {
  /* content part */
}
.cardImage {
  /* image part */
}
.cardImageContainer {
  /* image container part */
}
.cardOptions {
  /* options part */
}
.cardSkeleton {
  /* skeleton variant */
}
.cardContentSkeleton {
  /* skeleton variant for content */
}
.cardOptionsSkeleton {
  /* skeleton variant for options */
}
```

### clsx Usage

- **Use `clsx` for combining multiple classes** - especially for variants and conditional classes
- Import `clsx` from the `clsx` package: `import clsx from "clsx"`
- Use `clsx()` to combine base classes with variant classes
- Useful for skeleton components, conditional styling, and class composition

### clsx Usage Examples

```typescript
import clsx from "clsx";
import styles from "./Card.module.scss";

const { card, cardSkeleton, cardContent } = styles;

// ✅ Combining base class with variant
export const CardSkeleton = () => {
  return <article className={clsx(card, cardSkeleton)}>{/* ... */}</article>;
};

// ✅ Conditional classes
const Card = ({ isActive, user }: CardProps) => {
  return (
    <article className={clsx(card, isActive && cardActive)}>
      {/* ... */}
    </article>
  );
};

// ✅ Multiple classes
<div className={clsx(card, cardSkeleton, cardContent)}>{/* ... */}</div>;
```

### SCSS Module Example

```scss
// Component.module.scss
@use "../../../../styles/main" as *;

.card {
  display: flex;
  border-radius: $border-radius;
  background-color: $color-accent2;
  @include hover-on-non-touch(border-color, $color-accent);
}

.cardContent {
  padding: 1rem;
}
```

**Important:**
- **Always import `main.scss` in component modules** - it's the single contact point for all abstracts
- Adjust the relative path based on your component's location (e.g., `../../../styles/main` for pages, `../../../../styles/main` for features)
- `main.scss` forwards all abstracts, so importing it gives access to all variables, mixins, and functions

### Component Style Usage (Correct Pattern)

```typescript
import styles from "./Card.module.scss";

// ✅ CORRECT: Destructure OUTSIDE the component (before component definition)
const { card, cardContent } = styles;

const Card = ({ user }: CardProps) => {
  return (
    <article className={card}>
      <div className={cardContent}>{/* component content */}</div>
    </article>
  );
};
```

**Note:** Component `.module.scss` files should import `main.scss` at the top: `@use "../../../../styles/main" as *;` (adjust path as needed).

### Dynamic Style Access (When Using Props)

- **When accessing styles dynamically based on props**, use the `getStyleClass` helper from `@/features/shared/lib/utils`
- This ensures type safety and prevents runtime errors when a prop value doesn't match a class name
- **Never use type assertions like `as keyof typeof styles`** - use the helper instead

### Dynamic Style Access Example

```typescript
import { getStyleClass } from "@/features/shared/lib/utils";
import styles from "./Typography.module.scss";

const { typography, ellipsis } = styles;

const Typography = ({ variant, weight, size }: TypographyProps) => {
  return (
    <div
      className={clsx(
        typography,
        getStyleClass(styles, variant), // ✅ Type-safe dynamic access
        getStyleClass(styles, weight),
        getStyleClass(styles, size),
        ellipsis
      )}
    >
      Content
    </div>
  );
};
```

### ❌ Incorrect Pattern (Don't Do This)

```typescript
// ❌ WRONG: Don't destructure inside the component
const Card = ({ user }: CardProps) => {
  const { card, cardContent } = styles; // ❌ This runs on every render!
  return <article className={card}>...</article>;
};

// ❌ WRONG: Don't use type assertions for dynamic style access
const Typography = ({ variant }: TypographyProps) => {
  return (
    <div className={styles[variant as keyof typeof styles]}>
      {/* ❌ Type assertion is not type-safe */}
    </div>
  );
};
```

```scss
// ❌ WRONG: Don't import abstracts or mixins directly
// Component.module.scss
@use "../../../../styles/abstracts" as *; // ❌ Import main.scss instead
@use "../../../../styles/mixins" as *; // ❌ Mixins are part of abstracts, import main.scss

// ✅ CORRECT: Import main.scss (single contact point)
@use "../../../../styles/main" as *;

.card {
  // styles
}
```

