# Path Aliases Configuration

### TypeScript Path Mapping

- Configure path aliases in `tsconfig.json` for short import paths
- Use `@/*` to map to the project root
- Use feature-specific aliases for cleaner imports
- This allows clean imports without relative path navigation

### tsconfig.json Example

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@users/repository": ["./features/users/repository/users.repository"],
      "@users/adapter": ["./features/users/adapter/users.adapter"],
      "@users/services": ["./features/users/services/users.service"],
      "@users/actions": ["./features/users/services/users.actions"]
    }
  }
}
```

**Note**: Add similar aliases for other features as needed (e.g., `@posts/repository`, `@posts/adapter`, etc.)
