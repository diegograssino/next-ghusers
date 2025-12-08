# Git Hooks & Quality Gates

### Husky Configuration

- **Use Husky for Git hooks** - Ensures code quality checks run automatically before commits and pushes
- **Hooks are configured in `.husky/` directory** - Commit this directory to version control
- **Husky setup**: The `prepare` script in `package.json` automatically sets up husky on `npm install`

### Pre-commit Hooks

- **Purpose**: Run fast checks before code is committed to catch issues early
- **Configuration**: `.husky/pre-commit` file
- **Checks performed**:
  - SCSS type generation (`npm run type-check:scss:build`) - Ensures SCSS module types are up-to-date
  - SCSS linting (`npm run lint:scss:check`) - Validates SCSS code quality and style
- **Performance**: These checks should be fast (< 10 seconds) to not slow down development workflow
- **Failure behavior**: Commit is blocked if any check fails

### Pre-push Hooks

- **Purpose**: Run comprehensive checks before code is pushed to remote repository
- **Configuration**: `.husky/pre-push` file
- **Checks performed**:
  - Full build (`npm run build`) - Includes:
    - SCSS type generation
    - Next.js build (TypeScript compilation, type checking, production build)
- **Performance**: These checks can take longer (30+ seconds) as they run less frequently
- **Failure behavior**: Push is blocked if build fails

### Hook Configuration Best Practices

- **Keep pre-commit hooks fast** - Only include quick checks (linting, type generation, formatting)
- **Use pre-push for comprehensive checks** - Full builds, tests, and expensive operations
- **Document all hooks** - List what each hook does and why it's needed
- **Make hooks idempotent** - Running a hook multiple times should produce the same result
- **Provide clear error messages** - When hooks fail, show actionable error messages

### Adding New Hooks

- **Add hook files in `.husky/` directory** - Use descriptive names (e.g., `pre-commit`, `pre-push`)
- **Hook files should be executable** - Use `chmod +x .husky/hook-name`
- **Use npm scripts** - Reference npm scripts from `package.json` rather than inline commands
- **Test hooks locally** - Verify hooks work correctly before committing
- **Update documentation** - Document new hooks in project README or `.cursorrules`

### Hook File Example

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run type-check:scss:build
npm run lint:scss:check
```

### Current Hook Configuration

**Pre-commit** (`.husky/pre-commit`):
- `npm run type-check:scss:build` - Generate SCSS module types
- `npm run lint:scss:check` - Check SCSS code quality
- `npm run lint` - **ESLint checks** - Runs Next.js ESLint (includes accessibility checks via `eslint-plugin-jsx-a11y`), blocks commits with linting or accessibility warnings to prevent code quality issues and inaccessible code from being committed

**Pre-push** (`.husky/pre-push`):
- `npm run build` - Full production build (includes type checking and Next.js build)

