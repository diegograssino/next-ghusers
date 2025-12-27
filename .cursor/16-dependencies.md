# Dependency Management

### Version Ranges

- **Use `^` (caret) for most dependencies** - allows patch and minor updates
- **Use exact versions (`1.2.3`) for critical dependencies** that need stability
- **Use `~` (tilde) sparingly** - only allows patch updates, more restrictive
- **Avoid `*` or `latest`** - can cause unexpected breaking changes

### Version Strategy by Dependency Type

#### Production Dependencies

- **Framework dependencies** (Next.js, React): Use `^` but pin major versions
  - Example: `"next": "^15.3.3"` or `"react": "^18.0.0"`
- **UI libraries**: Use `^` for minor updates
  - Example: `"@tabler/icons-react": "^3.35.0"`
- **Critical business logic libraries**: Consider exact versions or `~` for stability
  - Example: `"@tanstack/react-query": "^5.80.6"` (can use exact if needed)
- **Utility libraries**: Use `^` for flexibility
  - Example: `"clsx": "^2.1.1"`

#### Development Dependencies

- **Build tools**: Use `^` but be cautious with major updates
  - Example: `"typescript": "^5"`, `"sass": "^1.93.2"`
- **Testing libraries**: Use `^` for compatibility updates
  - Example: `"@testing-library/react": "^16.3.0"`
- **Linting/Formatting**: Use `^` and keep updated
  - Example: `"eslint": "^9"`, `"eslint-config-prettier": "^10.1.5"`

### Essential Dependencies for Good Practices

These dependencies are **required** for maintaining code quality, accessibility, and development workflow consistency across projects. They should be included in all projects following these rules.

#### Code Quality & Linting

- **`eslint`** - JavaScript/TypeScript linter for catching errors and enforcing code style
  - **Why**: Catches bugs early, enforces consistent code style, improves code quality
  - **Configuration**: Use framework-specific configs (e.g., `eslint-config-next` for Next.js)
  - **Version**: Use `^` for flexibility (e.g., `"eslint": "^9"`)

- **`eslint-config-prettier`** - Disables ESLint rules that conflict with Prettier
  - **Why**: Prevents conflicts between ESLint and Prettier, ensures consistent formatting
  - **Configuration**: Add to ESLint extends array after other configs
  - **Version**: Use `^` (e.g., `"eslint-config-prettier": "^10.1.5"`)
  - **Important**: Even with this config, `lines-around-comment` must be disabled for JSX/TSX files (see ESLint configuration pattern in code quality docs)

- **`prettier`** - Code formatter
  - **Why**: Ensures consistent code formatting across the project
  - **Configuration**: Create `.prettierrc.js` with formatting rules (matches `.stylelintrc.js` format)
  - **Version**: Use `^` (e.g., `"prettier": "^3.2.5"`)
  - **Auto-fix**: Runs via `lint-staged` on commit to format staged files

- **`eslint-plugin-simple-import-sort`** - ESLint plugin for automatic import sorting
  - **Why**: Enforces consistent import ordering, automatically sorts imports on save and during linting
  - **Configuration**: Configure import groups in ESLint config to match project's import organization rules
  - **Version**: Use `^` (e.g., `"eslint-plugin-simple-import-sort": "^12.0.0"`)
  - **Auto-fix**: Works with VS Code's `source.fixAll` on save and `npm run lint -- --fix`

#### Accessibility

- **`eslint-plugin-jsx-a11y`** - ESLint plugin for accessibility rules
  - **Why**: Enforces accessibility standards, catches accessibility issues before commit
  - **Configuration**: Enable recommended rules in ESLint config, add to pre-commit hook
  - **Version**: Use `^` (e.g., `"eslint-plugin-jsx-a11y": "^6.10.2"`)
  - **Enforcement**: Must be included in pre-commit hook with `--max-warnings 0`

#### Git Hooks & Quality Gates

- **`husky`** - Git hooks manager
  - **Why**: Automates code quality checks before commits/pushes, prevents bad code from being committed
  - **Setup**: Add `"prepare": "husky"` script to `package.json`
  - **Configuration**: Create hooks in `.husky/` directory (pre-commit, pre-push)
  - **Version**: Use `^` (e.g., `"husky": "^9.1.7"`)
  - **Required hooks**: Pre-commit (fast checks), pre-push (comprehensive checks)

- **`lint-staged`** - Run linters and formatters on staged files only
  - **Why**: Efficiently auto-fixes issues only on changed files before commit, much faster than linting entire codebase
  - **Setup**: Configure `lint-staged` in `package.json` with file patterns and commands
  - **Configuration**: Define file patterns (e.g., `*.{ts,tsx}`) and commands to run (e.g., `eslint --fix`, `prettier --write`)
  - **Version**: Use `^` (e.g., `"lint-staged": "^15.2.0"`)
  - **Auto-fix**: Automatically fixes issues and re-stages fixed files before commit
  - **Example configuration**:
    ```json
    {
      "lint-staged": {
        "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
        "*.{css,scss}": ["stylelint --fix", "prettier --write"],
        "*.{json,md}": ["prettier --write"]
      }
    }
    ```

#### Type Safety

- **`typescript`** - Type-safe JavaScript
  - **Why**: Catches type errors at compile time, improves code maintainability and IDE support
  - **Configuration**: Use strict mode, configure `tsconfig.json` with path aliases
  - **Version**: Use `^` for major version (e.g., `"typescript": "^5"`)

#### Testing (Recommended)

- **`jest`** - JavaScript testing framework
  - **Why**: Enables unit and integration testing, ensures code reliability
  - **Configuration**: Create `jest.config.ts` with appropriate test environment
  - **Version**: Use `^` (e.g., `"jest": "^29.7.0"`)

- **`@testing-library/react`** - React component testing utilities
  - **Why**: Encourages testing best practices, focuses on user-centric testing
  - **Configuration**: Use with Jest, configure test environment (jsdom)
  - **Version**: Use `^` (e.g., `"@testing-library/react": "^16.3.0"`)

- **`@testing-library/jest-dom`** - Custom Jest matchers for DOM testing
  - **Why**: Provides helpful matchers for DOM assertions (e.g., `toBeInTheDocument()`)
  - **Configuration**: Import in test setup file
  - **Version**: Use `^` (e.g., `"@testing-library/jest-dom": "^6.6.3"`)

#### Styling (If using CSS/SCSS)

- **`stylelint`** - CSS/SCSS linter
  - **Why**: Enforces consistent CSS/SCSS code style, catches styling errors
  - **Configuration**: Use standard configs (e.g., `stylelint-config-standard-scss`)
  - **Version**: Use `^` (e.g., `"stylelint": "^16.26.1"`)

- **`stylelint-config-prettier-scss`** - Disables Stylelint rules that conflict with Prettier
  - **Why**: Prevents conflicts between Stylelint and Prettier for CSS/SCSS
  - **Configuration**: Add to Stylelint extends array
  - **Version**: Use `^` (e.g., `"stylelint-config-prettier-scss": "^1.0.0"`)

- **`stylelint-config-standard-scss`** - Standard SCSS linting rules
  - **Why**: Enforces consistent SCSS code style and best practices
  - **Configuration**: Extend in `.stylelintrc.js`, customize rules as needed
  - **Version**: Use `^` (e.g., `"stylelint-config-standard-scss": "^16.0.0"`)
  - **Custom rules**: Configure empty line before comments (`scss/double-slash-comment-empty-line-before: "always"`) for consistency

#### Development Workflow

- **`concurrently`** - Run multiple commands concurrently in development
  - **Why**: Enables running watch-mode tools (type checking, linting) alongside the dev server for better developer experience
  - **Use case**: Run SCSS type generation in watch mode, stylelint in watch mode, or other watch tasks concurrently with `npm run dev`
  - **Configuration**: Configure in `package.json` dev script to run multiple commands in parallel
  - **Version**: Use `^` (e.g., `"concurrently": "^9.2.1"`)
  - **Example**: `"dev": "concurrently \"npm run type-check:scss\" \"next dev --turbopack\" --names \"SCSS,DEV\" --prefix-colors \"cyan,green\""`
  - **Benefits**:
    - Type checking/linting runs automatically in background during development
    - No need to manually run separate watch commands
    - Immediate feedback on type errors and linting issues
    - Better developer experience with parallel processes

#### Essential Dependencies Summary

**Minimum Required** (for all projects):

```json
{
  "devDependencies": {
    "eslint": "^9",
    "eslint-config-prettier": "^10.1.5",
    "eslint-plugin-jsx-a11y": "^6.10.2",
    "husky": "^9.1.7",
    "typescript": "^5"
  }
}
```

**Recommended** (for comprehensive code quality):

```json
{
  "devDependencies": {
    // ... minimum required above ...
    "prettier": "^3.2.5",
    "lint-staged": "^15.2.0",
    "eslint-plugin-simple-import-sort": "^12.0.0",
    "jest": "^29.7.0",
    "@testing-library/react": "^16.3.0",
    "@testing-library/jest-dom": "^6.6.3",
    "stylelint": "^16.26.1",
    "stylelint-config-standard-scss": "^16.0.0",
    "stylelint-config-prettier-scss": "^1.0.0",
    "concurrently": "^9.2.1"
  }
}
```

#### Development Scripts Pattern

- **Use `concurrently` for development workflow** - Run watch-mode tools alongside the dev server
- **Pattern**: Configure `dev` script to run multiple commands in parallel
- **Benefits**: Automatic type checking, linting, and other watch tasks during development
- **Example configuration**:

```json
{
  "scripts": {
    "dev": "concurrently \"npm run type-check:scss\" \"next dev --turbopack\" --names \"SCSS,DEV\" --prefix-colors \"cyan,green\"",
    "type-check:scss": "typed-scss-modules features --watch --logLevel error"
  }
}
```

- **When to use**:
  - Projects with type generation tools (e.g., `typed-scss-modules`)
  - Projects with watch-mode linting (e.g., `stylelint --watch`)
  - Any project where multiple watch processes improve developer experience
- **Alternative**: If not using watch-mode tools, standard `dev` script is sufficient

#### Setup Checklist

When starting a new project, ensure:

1. ✅ **ESLint configured** - Framework-specific config + Prettier integration
2. ✅ **Prettier configured** - `.prettierrc.js` with consistent formatting rules
3. ✅ **Import sorting plugin** - `eslint-plugin-simple-import-sort` configured with import order groups matching project rules
4. ✅ **Accessibility plugin** - `eslint-plugin-jsx-a11y` enabled with recommended rules
5. ✅ **Comment formatting rules** - `lines-around-comment` enabled for `.ts`/`.js` files, **disabled for `.tsx`/`.jsx` files** to avoid conflicts with Prettier in JSX attribute lists
6. ✅ **Husky installed** - Git hooks configured (pre-commit, pre-push)
7. ✅ **lint-staged configured** - Auto-fixes issues on staged files before commit
8. ✅ **TypeScript configured** - Strict mode enabled, path aliases configured
9. ✅ **Testing setup** - Jest and Testing Library configured (if testing)
10. ✅ **Stylelint configured** - For CSS/SCSS projects (if using styles) with empty line before comments rule
11. ✅ **Concurrently configured** - For running watch-mode tools alongside dev server (if using type generation or watch-mode linting)
12. ✅ **Pre-commit hook** - Runs SCSS type generation + lint-staged (ESLint, Stylelint, Prettier auto-fix)
13. ✅ **Pre-push hook** - Runs comprehensive build checks

### Best Practices

- **Review changelogs before major version updates** - check for breaking changes
- **Use `npm outdated` or `npm-check-updates`** to check for available updates
- **Test thoroughly after dependency updates** - especially for major versions
- **Lock file management**: Commit `package-lock.json` to ensure consistent installs
- **Regular updates**: Update dependencies regularly to get security patches
- **Security audits**: Run `npm audit` regularly and fix vulnerabilities

### Version Format Examples

```json
{
  "dependencies": {
    // ✅ GOOD: Caret allows minor and patch updates
    "next": "^15.3.3",
    "react": "^18.0.0",

    // ✅ GOOD: Exact version for critical stability
    "critical-library": "1.2.3",

    // ✅ GOOD: Tilde for patch-only updates (more conservative)
    "stable-library": "~1.2.3",

    // ❌ AVOID: Too permissive, can break
    "risky-library": "*",
    "risky-library-2": "latest"
  }
}
```

### Update Strategy

1. **Patch updates** (`1.2.3` → `1.2.4`): Safe to update automatically
2. **Minor updates** (`1.2.3` → `1.3.0`): Review changelog, test, then update
3. **Major updates** (`1.2.3` → `2.0.0`):
   - Read migration guide
   - Test in a separate branch
   - Update one major dependency at a time
   - Run full test suite

### Tools for Dependency Management

- **`npm outdated`**: Check which packages are outdated
- **`npm audit`**: Check for security vulnerabilities
- **`npm-check-updates`** (ncu): Interactive tool to update package.json
- **Dependabot/Renovate**: Automated dependency update PRs (GitHub)
