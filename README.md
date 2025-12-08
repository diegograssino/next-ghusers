# Next GitHub Users

A Next.js application for exploring GitHub users with infinite scroll and real-time search capabilities.

## Features

- 🔍 **Real-time search** with debounced input
- ♾️ **Infinite scroll** for seamless user browsing
- ⭐ **Favorites system** with local storage persistence
- 🎨 **Modern design** with Sass and CSS custom properties
- 📱 **Responsive layout** for mobile and desktop
- 🔄 **Loading states** with animated spinners
- 🌓 **Theme support** with CSS custom properties
- ⚡ **Server-side rendering** with Next.js
- 🧪 **Full test coverage** with Jest and Testing Library
- 🔒 **Type-safe SCSS** with automatic type generation for CSS Modules
- 🎯 **Code quality** with Stylelint for SCSS linting and Husky Git hooks
- 📝 **Structured logging** with Pino for better debugging and monitoring
- ♿ **Accessibility first** with ESLint accessibility checks enforced at commit time
- 🧩 **Reusable UI components** with polymorphic Button component supporting both button and Link rendering
- 🏗️ **Clean Architecture** with Repository, Adapter, and Service layers for maintainable data flow

## Requirements

- Node.js >= 18.x
- npm >= 9.x

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/diegograssino/next-github-users.git
   cd next-github-users
   ```

2. **Install dependencies:**

```sh
npm install
```

3. **Configure GitHub token (optional, recommended to avoid rate limits):**

   Create a `.env.local` file in the project root and add your personal access token:

```sh
NEXT_PUBLIC_GITHUB_TOKEN=your_github_personal_token
```

4. **Start the development server:**

```sh
npm run dev
```

5. **Open http://localhost:3000 in your browser.**

## Live Demo

The application is deployed at: https://next-ghusers.vercel.app

## Tech Stack

### Core Technologies

- **Next.js 15.3.3** - React framework with SSR and SSG capabilities
- **TypeScript** - Static typing for JavaScript
- **React 18** - UI library with modern features
- **Sass** - CSS preprocessor with variables and nesting

### State Management & Data Fetching

- **TanStack Query (React Query)** - Powerful data fetching and caching
- **React Context** - Global state management for favorites and loading states

### UI & Styling

- **CSS Custom Properties** - Dynamic theming support
- **Clsx** - Conditional CSS class names
- **Responsive Design** - Mobile-first approach

### Development Tools

- **ESLint & Prettier** - Code linting and formatting
- **eslint-plugin-jsx-a11y** - Accessibility linting enforced at commit time
- **Stylelint** - SCSS/CSS linting with standard rules and Prettier integration
- **typed-scss-modules** - Automatic TypeScript type generation for CSS Modules
- **Husky** - Git hooks for pre-commit and pre-push checks
- **Jest** - JavaScript testing framework
- **Testing Library** - React component testing utilities
- **Istanbul/NYC** - Code coverage reporting
- **Concurrently** - Run multiple development tasks in parallel

### Additional Libraries

- **Pino** - Fast and structured logging library
- **Pino Pretty** - Pretty printer for Pino logs in development
- **usehooks-ts** - Collection of useful React hooks for TypeScript (debouncing, media queries)
- **react-infinite-scroller** - Seamless infinite scrolling implementation
- **Clsx** - Utility for constructing className strings conditionally

## Available Scripts

### Development

- `npm run dev` — Start the development server with Turbopack
- `npm run start` — Start the app in production mode

### Building

- `npm run build` — Build the app for production (includes SCSS type generation)

### Code Quality

- `npm run lint` — Run ESLint for code linting
- `npm run lint:scss` — Run Stylelint for SCSS/CSS linting and auto-fix
- `npm run lint:scss:check` — Run Stylelint for SCSS/CSS linting (check only)

### Type Safety

- `npm run type-check:scss` — Generate TypeScript types for SCSS Modules (watch mode)
- `npm run type-check:scss:build` — Generate TypeScript types for SCSS Modules (one-time)

### Testing

- `npm test` — Run the test suite
- `npm run test:watch` — Run tests in watch mode
- `npm run test:coverage` — Generate and display test coverage report

## Project Structure

```
├── app/                    # Next.js 13+ app directory
│   ├── [id]/              # Dynamic user detail pages
│   ├── favs/              # Favorites page
│   └── layout.tsx         # Root layout
├── features/              # Feature-based organization
│   ├── pages/             # Page components
│   ├── shared/            # Shared contexts and utilities
│   ├── ui/                # Reusable UI components
│   └── users/             # User-related features
├── styles/                # Global styles and Sass variables
├── types/                 # TypeScript type definitions
└── __mocks__/             # Test mocks
```

## Architecture Highlights

- **Feature-based architecture** - Code organized by business domains for better maintainability
- **Clean Architecture** - Three-layer data architecture (Repository, Adapter, Service) following Clean Architecture principles
- **Component composition** - Reusable UI components with consistent APIs and design patterns
- **Polymorphic components** - Flexible components like Button that can render as different HTML elements or Next.js Links
- **Type safety** - Full TypeScript coverage ensuring runtime reliability, including type-safe SCSS Modules
- **Modern CSS** - Sass with CSS custom properties enabling dynamic theming
- **Performance optimized** - Server-side rendering, code splitting, and optimized bundle size
- **Accessibility enforced** - ESLint accessibility checks prevent inaccessible code from being committed
- **Test-driven development** - Comprehensive test coverage with unit and integration tests
- **Code quality automation** - Git hooks ensure type generation, linting, and accessibility checks before commits and builds before pushes
- **Structured logging** - Pino-based logging for better debugging and production monitoring

## Code Quality & Automation

### Git Hooks (Husky)

The project uses Husky to enforce code quality standards:

- **Pre-commit hook**: Automatically runs SCSS type generation, Stylelint checks, and ESLint (including accessibility checks) before each commit
- **Pre-push hook**: Runs the full build process before pushing to ensure everything compiles correctly

These hooks ensure that:

- SCSS Module types are always up-to-date
- Code follows Stylelint rules
- Accessibility standards are enforced (no accessibility warnings allowed)
- The project builds successfully before pushing

### Type-Safe SCSS Modules

The project uses `typed-scss-modules` to automatically generate TypeScript types for all CSS Modules. This provides:

- **Type safety** - Catch typos and missing class names at compile time
- **IntelliSense** - Autocomplete for CSS class names in your IDE
- **Refactoring safety** - Rename classes with confidence

Types are automatically generated during the build process and can be watched during development.

### Stylelint Configuration

Stylelint is configured with:

- **Standard SCSS rules** - Enforces best practices for SCSS/CSS
- **Prettier integration** - Prevents conflicts between Stylelint and Prettier
- **Custom rules** - Enforces camelCase class naming convention
- **Smart defaults** - Disabled rules are documented with reasons

The configuration is in `.stylelintrc.js` with inline documentation explaining any disabled rules.

### Accessibility Standards

The project enforces accessibility standards through:

- **ESLint accessibility plugin** - `eslint-plugin-jsx-a11y` catches accessibility issues during development
- **Pre-commit enforcement** - Accessibility checks run automatically before commits with zero warnings allowed
- **Manual implementation** - Accessibility features (ARIA attributes, keyboard handlers) are implemented manually following WCAG guidelines
- **Static analysis approach** - Uses ESLint for static analysis rather than runtime libraries to avoid SSR impact and bundle size overhead

This ensures that all interactive components are accessible by default, with proper semantic HTML, ARIA labels, and keyboard navigation support.

## License

This project is open source and available under the [MIT License](LICENSE).
