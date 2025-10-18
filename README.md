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

The application is deployed at: https://next-github-users-six.vercel.app/

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
- **Jest** - JavaScript testing framework
- **Testing Library** - React component testing utilities
- **Istanbul/NYC** - Code coverage reporting

### Additional Libraries

- **usehooks-ts** - Collection of useful React hooks for TypeScript (debouncing, media queries)
- **react-infinite-scroller** - Seamless infinite scrolling implementation

## Available Scripts

- `npm run dev` — Start the development server with Turbopack
- `npm run build` — Build the app for production
- `npm run start` — Start the app in production mode
- `npm run lint` — Run ESLint for code linting
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
- **Component composition** - Reusable UI components with consistent APIs and design patterns
- **Type safety** - Full TypeScript coverage ensuring runtime reliability
- **Modern CSS** - Sass with CSS custom properties enabling dynamic theming
- **Performance optimized** - Server-side rendering, code splitting, and optimized bundle size
- **Test-driven development** - Comprehensive test coverage with unit and integration tests

## License

This project is open source and available under the [MIT License](LICENSE).
