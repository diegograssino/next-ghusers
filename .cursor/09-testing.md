# Testing Patterns

### Test Structure

- Use Jest with Testing Library
- **Test files must use `.spec.tsx` extension and match the component name**
  - `Card.tsx` → `Card.spec.tsx`
  - `Header.tsx` → `Header.spec.tsx`
  - `useInfiniteUsers.ts` → `useInfiniteUsers.spec.ts`
- Place test files in the same directory as the component/hook being tested
- **Always use `data-testid` attributes on components for testing** - this is required for all interactive and testable components
- Import `@testing-library/jest-dom` for matchers
- Group tests with `describe` blocks
- Test both main components and skeleton variants

### data-testid Requirement

- **All interactive and testable components MUST have `data-testid` attributes**
- Place `data-testid` on the root element of the component
- Use kebab-case for test IDs: `data-testid="card"`, `data-testid="card-skeleton"`, `data-testid="card-widget"`
- **Test IDs should be descriptive and match component purpose**
- Skeleton components should have `data-testid="component-name-skeleton"`

### Test File Naming Examples

```
Card/
  ├── Card.tsx
  ├── Card.module.scss
  └── Card.spec.tsx        ✅ Same name with .spec extension

Header/
  ├── Header.tsx
  ├── Header.module.scss
  └── Header.spec.tsx      ✅ Same name with .spec extension
```

### Test Example

```typescript
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Card from "./Card";

describe("Card", () => {
  test("should render", () => {
    const { getByTestId } = render(<Card user={mockUser} data-testid="card" />);
    const card = getByTestId("card");
    expect(card).toBeInTheDocument();
  });
});
```

