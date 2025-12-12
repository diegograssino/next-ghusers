# Next.js Patterns

### App Router

- Use Next.js 15 App Router structure
- Server components by default, use `"use client"` when needed
- Use `async` for server components that fetch data
- Export `metadata` from layout and page files

### Page Components vs Next.js Pages

- **Next.js Pages** (`app/` directory): Handle routing, data fetching, and server-side logic
- **Page Components** (`features/pages/`): Reusable page-level components that contain the UI
- Next.js pages should be thin wrappers that fetch data and render page components
- Page components should be client components if they need interactivity
- **DO NOT add `<main>` tags in page components** - The main HTML tag is already provided by the layout client component, adding it in page components will create nested main tags which is invalid HTML
- **DO NOT add `<header>` or `<footer>` tags in page components or other places** - Header and Footer components are already provided by the layout client component, adding them elsewhere will create duplicate header/footer tags which is invalid HTML and causes SEO issues
- **Page-specific components should be added inside page components** - Components like hero sections, carousels, promo banners, or other page-specific features should be added within their respective page components. This keeps page singularities and unique features within their respective page components, not in the global layout

### Page Component Pattern Example

```typescript
// app/page.tsx (Next.js Page - Server Component)
import SearchPage from "@/features/pages/SearchPage/SearchPage";
import { fetchUsersAction } from "@users/actions";

const Home = async (pageParams: PageParamsProps) => {
  const initialUsers = await fetchUsersAction({
    /* ... */
  });
  return <SearchPage initialUsers={initialUsers} />;
};

export default Home;

// features/pages/SearchPage/SearchPage.tsx (Page Component - Client Component)
("use client");
const SearchPage = ({ initialUsers }: SearchPageProps) => {
  // Interactive UI logic
  return <div>{/* ... */}</div>;
};
```

### Server Actions

- Use server actions for server-side data fetching and mutations
- Place server actions in `features/[feature]/services/[feature].actions.ts`
- Name server actions with `Action` suffix: `fetchUsersAction`, `fetchUserAction`
- Server actions should use Repository + Adapter (same as client services, but without React Query)
- Use `async/await` for server actions
- Include `"use server"` directive at the top of the file

### Server Actions Example

```typescript
// features/users/services/users.actions.ts
"use server";

import { usersRepository } from "../repository/users.repository";
import { toFetchUsersResultAdapter } from "../adapter/users.adapter";
import { FetchUsersParams, FetchUsersResult } from "@/types/users";

// ✅ CORRECT: Arrow function
export const fetchUsersAction = async (
  params: FetchUsersParams
): Promise<FetchUsersResult> => {
  // 1. Repository: Get raw data from API
  const rawResponse = await usersRepository.getUsers(params);

  // 2. Adapter: Transform to domain model
  return toFetchUsersResultAdapter(rawResponse);
};
```

### Error Handling in Server Components

- Handle errors gracefully in server components
- Return appropriate error UI when data fetching fails
- Use conditional rendering to check for data existence
- Provide user-friendly error messages

### Error Handling Example

```typescript
const UserPage = async ({ params }: UserPageProps) => {
  const user = await fetchUserAction(id);

  if (!user) {
    return (
      <Typography weight="bold" size="xl" as="h2">
        An error has occurred while fetching users. Try again later.
      </Typography>
    );
  }

  return <UserDetailPage user={user} />;
};
```

### Data Fetching

- Use React Query (`@tanstack/react-query`) for client-side data fetching
- Use server actions for server-side data fetching
- Use `useInfiniteQuery` for paginated data
- Handle loading, error, and success states

### Image Optimization

- Always use Next.js `Image` component for images
- Use `fill` prop with positioned parent containers (parent must have `position: relative`)
- Set `priority` for above-the-fold images (improves LCP)
- Provide appropriate `sizes` prop for responsive images
- Use `placeholder="blur"` with `blurDataURL` for better UX
- Export blur data constants from feature constants files
- **Parent container must have `position: relative`** when using `fill` prop
- **Always provide `alt` text** for accessibility

### Image Optimization Example

```typescript
import Image from "next/image";
import { genericBlurData } from "../../lib/constants";

// Parent container with position: relative
<div className={cardImageContainer}>
  {" "}
  {/* position: relative in SCSS */}
  <Image
    src={user.avatarUrl}
    alt={user.login}
    fill
    priority
    sizes="(min-width: 48rem) 9.375rem, 19.4375rem"
    placeholder="blur"
    blurDataURL={genericBlurData}
    className={cardImage}
  />
</div>;
```

### Next.js Link Component

- **Always use Next.js `Link` component for internal navigation** - provides client-side transitions and prefetching
- **Wrap interactive elements** (like cards, buttons) with `Link` when they navigate
- **Spread props to Link** - use `...otherProps` to forward HTML attributes
- **Use `href` prop** - can be string or template literal for dynamic routes
- **Link children** - Can wrap other components or elements
- **External links** - Next.js `Link` automatically handles external URLs by rendering a regular `<a>` tag, so it can be used for both internal and external navigation
- **Button component for links** - Use `Button` component with `unstyled` variant and `as={Link}` or `href` prop instead of creating separate anchor/link components - this provides consistent styling and behavior

### Link Component Example

```typescript
import Link from "next/link";

const Card = ({ user }: CardProps) => {
  return (
    <Link href={`/${user.id}`} data-testid="card">
      <article className={card}>{/* Card content */}</article>
    </Link>
  );
};
```

### Provider Pattern

- Use Context Providers to wrap feature-specific functionality
- Place providers in `features/[feature]/contexts/`
- Export provider components with `Provider` suffix: `FavsProvider`, `FiltersProvider`
- Use providers in Next.js pages or layout files
- Keep providers close to where they're used

### Provider Pattern Example

```typescript
// app/page.tsx
import { FiltersProvider } from "@users/contexts";

const Home = async () => {
  return (
    <FiltersProvider initialFilters={initialFilters}>
      <SearchPage />
    </FiltersProvider>
  );
};
```
