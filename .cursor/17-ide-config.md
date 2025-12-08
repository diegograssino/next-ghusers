# IDE Configuration

### VS Code Settings

- **All IDE and extension settings should be in `.vscode/` folder** - This ensures consistent development environment across the team
- **Extension recommendations** should be in `.vscode/extensions.json` - Team members will be prompted to install recommended extensions
- **Workspace settings** should be in `.vscode/settings.json` - Editor settings, format on save, code actions, and extension-specific configurations
- **Commit `.vscode/` folder to version control** - This ensures all team members have the same development setup

### VS Code Configuration Examples

#### `.vscode/extensions.json`

```json
{
  "recommendations": [
    "Gruntfuggly.todo-tree",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint"
  ]
}
```

#### `.vscode/settings.json`

```json
{
  "editor.formatOnSave": true,
  "files.autoSave": "onFocusChange",
  "editor.codeActionsOnSave": {
    "source.fixAll": "always",
    "source.organizeImports": "always"
  },
  "todo-tree.highlights.customHighlight": {
    "TODO": {
      "icon": "checklist",
      "type": "text",
      "foreground": "#000000",
      "background": "#FFF9C4",
      "iconColour": "#F9A825"
    },
    "FIX": {
      "icon": "alert",
      "type": "text",
      "foreground": "#000000",
      "background": "#FFCDD2",
      "iconColour": "#C62828"
    },
    "DOC": {
      "icon": "book",
      "type": "text",
      "foreground": "#000000",
      "background": "#C8E6C9",
      "iconColour": "#2E7D32"
    }
  },
  "todo-tree.regex.regex": "(//|#|<!--|;|/\\*|^|^\\s*\\*)\\s*($TAGS)(.*)",
  "todo-tree.regex.regexCaseSensitive": false,
  "todo-tree.general.tags": ["TODO", "FIX", "DOC"]
}
```

### Extension Configuration Guidelines

- **List all required extensions** in `extensions.json` - Any extension needed for development, linting, formatting, or task management should be listed
- **Configure extension settings** in `settings.json` - Extension-specific settings that affect code quality or development workflow should be configured
- **Use workspace settings** for project-specific configurations - User-specific preferences should remain in user settings, but project requirements should be in workspace settings
- **Document extension purposes** - If an extension has a specific purpose (e.g., TODO Tree for task management), document it in comments or project README

