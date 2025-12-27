# Git Hooks & Quality Gates

### Husky Configuration

- **Use Husky for Git hooks** - Ensures code quality checks run automatically before commits and pushes
- **Hooks are configured in `.husky/` directory** - Commit this directory to version control
- **Husky setup**: The `prepare` script in `package.json` automatically sets up husky on `npm install`

### Pre-commit Hooks

- **Purpose**: Run fast checks and auto-fix issues before code is committed to catch issues early
- **Configuration**: `.husky/pre-commit` file
- **Checks performed**:
  - SCSS type generation (`npm run type-check:scss:build`) - Ensures SCSS module types are up-to-date
  - **lint-staged** - Runs linters and formatters on staged files only:
    - **ESLint** with auto-fix (`eslint --fix`) - Fixes linting issues in TypeScript/JavaScript files
    - **Stylelint** with auto-fix (`stylelint --fix`) - Fixes linting issues in CSS/SCSS files (including empty lines before comments)
    - **Prettier** (`prettier --write`) - Formats all code files consistently
- **Performance**: These checks should be fast (< 10 seconds) to not slow down development workflow
- **Failure behavior**: Commit is blocked if any unfixable errors remain after auto-fixing
- **Auto-fix behavior**: Automatically fixes issues and re-stages the fixed files before commit

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
- **Use lint-staged for efficiency** - Only process staged files, not the entire codebase
- **Auto-fix when possible** - Use `--fix` flags to automatically fix issues before commit
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
npx lint-staged
```

### Current Hook Configuration

**Pre-commit** (`.husky/pre-commit`):

- `npm run type-check:scss:build` - Generate SCSS module types
- `npx lint-staged` - Runs linters and formatters on staged files only:
  - **TypeScript/JavaScript files** (`.ts`, `.tsx`, `.js`, `.jsx`):
    - `eslint --fix` - Auto-fixes ESLint issues (including empty lines before comments)
    - `prettier --write` - Formats code
  - **CSS/SCSS files** (`.css`, `.scss`):
    - `stylelint --fix` - Auto-fixes Stylelint issues (including empty lines before comments)
    - `prettier --write` - Formats code
  - **Other files** (`.json`, `.md`):
    - `prettier --write` - Formats code

**Pre-push** (`.husky/pre-push`):

- `npm run build` - Full production build (includes type checking and Next.js build)
