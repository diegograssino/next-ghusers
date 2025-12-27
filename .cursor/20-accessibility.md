# Accessibility Standards

### Overview

- **Accessibility is enforced at commit time** - The pre-commit hook runs `eslint-plugin-jsx-a11y` to catch accessibility issues before code is committed
- **No accessibility warnings allowed** - The ESLint configuration uses `--max-warnings 0` to block commits with any accessibility issues
- **Static analysis approach** - We use `eslint-plugin-jsx-a11y` for static analysis rather than runtime libraries like React Aria to avoid SSR impact and bundle size overhead
- **Manual implementation** - Accessibility features (ARIA attributes, keyboard handlers) are implemented manually following WCAG guidelines

### ESLint Configuration

- **Plugin**: `eslint-plugin-jsx-a11y` - Provides static analysis for accessibility issues
- **Configuration**: Enabled in `eslint.config.mjs` with recommended rules
- **Exception**: `jsx-a11y/no-autofocus` is disabled - `autoFocus` is needed for search input UX where users expect immediate focus for quick typing
- **Pre-commit enforcement**: ESLint runs via `npm run lint` (Next.js ESLint) which checks all relevant files including `app`, `features`, root-level config files (middleware.ts, next.config.ts, etc.), and other TypeScript/JavaScript files, with zero warnings allowed

### Interactive Elements

#### Buttons

- **Always use `<button>` element** - Never use `<div>` or other non-interactive elements with click handlers
- **Add `type="button"`** - Prevents accidental form submission when buttons are inside forms
- **Add `aria-label`** - Required for buttons that only contain icons or when the visible text doesn't fully describe the action
- **Add keyboard handlers** - Implement `onKeyDown` handler for Enter and Space keys if using custom interactive elements (though prefer native `<button>`)
- **Handle disabled state** - Use `disabled` prop and ensure disabled buttons are properly announced to screen readers

#### Button Examples

```typescript
// ✅ CORRECT: Native button with aria-label
<button
  type="button"
  onClick={handleClick}
  aria-label="Remove filter"
>
  <IconX />
</button>

// ✅ CORRECT: Button with descriptive aria-label
<button
  type="button"
  onClick={handleSort}
  aria-label={`Sort ${sortOrder ? "ascending" : "descending"}`}
>
  <Typography>Sort {sortOrder ? "ASC" : "DESC"}</Typography>
</button>

// ✅ CORRECT: Button with dynamic aria-label based on state
const ariaLabel = isLoading
  ? "Adding to favorites..."
  : isFavorite
    ? `Remove ${user.login} from favorites`
    : `Add ${user.login} to favorites`;

<button
  onClick={handleFavorite}
  disabled={isLoading}
  aria-label={ariaLabel}
  title={ariaLabel} // Also provide title for tooltip
>
  {isFavorite ? <IconStarFilled /> : <IconStar />}
</button>

// ❌ WRONG: Using div with onClick
<div onClick={handleClick}>Click me</div>

// ❌ WRONG: Button without aria-label when text is unclear
<button onClick={handleClick}>
  <IconX /> {/* Screen reader won't know what this does */}
</button>
```

#### Form Inputs

- **Always add `aria-label`** - Required for inputs that don't have visible labels or when the label doesn't fully describe the input purpose
- **Use semantic HTML** - Prefer `<input>`, `<textarea>`, `<select>` over custom implementations
- **Associate labels properly** - Use `<label>` with `htmlFor` or wrap input in `<label>`
- **Handle disabled state** - Use `disabled` prop and ensure proper ARIA attributes

#### Input Examples

```typescript
// ✅ CORRECT: Input with aria-label
<input
  type="text"
  value={value}
  onChange={handleChange}
  aria-label="Search GitHub users by username"
  placeholder="Search users..."
/>

// ✅ CORRECT: Input with visible label
<label htmlFor="search-input">
  Search Users
</label>
<input
  id="search-input"
  type="text"
  value={value}
  onChange={handleChange}
/>

// ❌ WRONG: Input without aria-label or label
<input
  type="text"
  value={value}
  onChange={handleChange}
  placeholder="Search..." // Placeholder is not enough for screen readers
/>
```

### ARIA Attributes

#### When to Use `aria-label`

- **Icon-only buttons** - Buttons that only contain icons need descriptive `aria-label`
- **Buttons with unclear text** - When the visible text doesn't fully describe the action
- **Dynamic content** - When button text changes based on state (e.g., "Add favorite" vs "Remove favorite")
- **Form inputs without labels** - Inputs that don't have visible `<label>` elements
- **Decorative elements** - Elements that are interactive but don't have descriptive text

#### `aria-label` Guidelines

- **Be descriptive** - Describe what the element does, not just what it is
- **Include context** - Include relevant context (e.g., "Remove followers filter" not just "Remove")
- **Match user intent** - Use language that matches how users would describe the action
- **Keep it concise** - Be descriptive but concise (aim for 1-2 sentences)
- **Use dynamic labels** - Update `aria-label` based on component state when appropriate

#### `aria-label` Examples

```typescript
// ✅ CORRECT: Descriptive and contextual
<button aria-label={`Remove ${filterLabel} filter`}>
  <IconX />
</button>

// ✅ CORRECT: Includes user context
<button aria-label={`Add ${user.login} to favorites`}>
  <IconStar />
</button>

// ✅ CORRECT: Describes action and state
<button aria-label={`Sort ${sortOrder ? "ascending" : "descending"}`}>
  Sort {sortOrder ? "ASC" : "DESC"}
</button>

// ❌ WRONG: Too vague
<button aria-label="Button">
  <IconX />
</button>

// ❌ WRONG: Missing context
<button aria-label="Remove">
  <IconX />
</button>
```

### Keyboard Navigation

#### Keyboard Event Handlers

- **Use native HTML elements** - Native `<button>`, `<input>`, `<a>` elements handle keyboard events automatically
- **Custom interactive elements** - If you must use custom elements, implement keyboard handlers for Enter and Space keys
- **Prevent default behavior** - Use `e.preventDefault()` when handling keyboard events to prevent default browser behavior
- **Support standard keys** - Enter and Space for activation, Escape for cancellation, Arrow keys for navigation

#### Keyboard Handler Example

```typescript
// ✅ CORRECT: Keyboard handler for custom interactive element (prefer native button)
const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onRemove();
  }
};

<button
  type="button"
  onClick={onRemove}
  onKeyDown={handleKeyDown}
  aria-label={`Remove ${label} filter`}
>
  <IconX />
</button>
```

### Semantic HTML

#### HTML Elements

- **Use semantic elements** - Prefer `<button>`, `<nav>`, `<main>`, `<header>`, `<footer>`, `<article>`, `<section>` over generic `<div>`
- **Use proper heading hierarchy** - Use `<h1>`, `<h2>`, etc. in order (h1 → h2 → h3)
- **Use `<html lang="en">`** - Always include `lang` attribute on `<html>` element
- **Use proper form elements** - Use `<form>`, `<label>`, `<input>`, `<button>` for forms

#### Semantic HTML Examples

```typescript
// ✅ CORRECT: Semantic HTML
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Page Title</h1>
    <section>
      <h2>Section Title</h2>
    </section>
  </article>
</main>

// ❌ WRONG: Generic divs everywhere
<div>
  <div>
    <div>Home</div>
  </div>
</div>
```

### Images

- **Always provide `alt` text** - Required for all `<img>` and Next.js `Image` components
- **Descriptive alt text** - Describe the image content or purpose, not just "image" or "photo"
- **Decorative images** - Use empty `alt=""` for purely decorative images
- **Functional images** - Describe the function if the image is part of an interactive element

#### Image Examples

```typescript
// ✅ CORRECT: Descriptive alt text
<Image
  src={user.avatarUrl}
  alt={`${user.login}'s profile picture`}
  fill
/>

// ✅ CORRECT: Decorative image
<Image
  src="/decorative-pattern.png"
  alt=""
  fill
/>

// ❌ WRONG: Missing alt text
<Image src={user.avatarUrl} fill />

// ❌ WRONG: Non-descriptive alt text
<Image src={user.avatarUrl} alt="image" fill />
```

### Common Accessibility Patterns

#### Interactive Elements Checklist

When creating interactive components, ensure:

1. ✅ Uses semantic HTML element (`<button>`, `<a>`, `<input>`, etc.)
2. ✅ Has descriptive `aria-label` if text is unclear or icon-only
3. ✅ Supports keyboard navigation (Enter, Space, Arrow keys as appropriate)
4. ✅ Has proper focus management
5. ✅ Handles disabled state correctly
6. ✅ Provides visual feedback for interactions
7. ✅ Works with screen readers

#### Component Accessibility Example

```typescript
// ✅ CORRECT: Fully accessible component
const Pill = ({ label, onRemove }: PillProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onRemove();
    }
  };

  return (
    <button
      type="button"
      className={pill}
      onClick={onRemove}
      onKeyDown={handleKeyDown}
      aria-label={`Remove ${label} filter`}
    >
      <IconX />
      <Typography as="span">{label}</Typography>
    </button>
  );
};
```

### Testing Accessibility

- **ESLint catches static issues** - `eslint-plugin-jsx-a11y` catches most common accessibility issues during development
- **Manual testing recommended** - Test with keyboard navigation and screen readers
- **Automated testing** - Consider adding `jest-axe` for automated accessibility testing in test suites
- **Browser DevTools** - Use browser accessibility inspectors to verify ARIA attributes

### Accessibility vs React Aria

**Why we use `eslint-plugin-jsx-a11y` instead of React Aria:**

- ✅ **No SSR impact** - Static analysis doesn't require client components
- ✅ **No bundle size impact** - Dev dependency only, no runtime code
- ✅ **Enforced at commit time** - Prevents inaccessible code from being committed
- ✅ **Simple setup** - Easy to configure and maintain
- ✅ **Covers most cases** - Catches 90%+ of common accessibility issues

**When to consider React Aria:**

- Complex keyboard navigation (multi-select, drag-and-drop)
- Focus management (modals, dropdowns, tooltips)
- Dynamic ARIA updates
- Internationalization requirements
- Complex interactive components (combobox, autocomplete, menu)

For most use cases, manual implementation with ESLint enforcement is sufficient and more performant.
