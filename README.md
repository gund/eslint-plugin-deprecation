# eslint-plugin-deprecation

> ESLint rule that reports usage of deprecated code

## Prerequisites

This plugin only works with `@typescript-eslint/parser`.

Which means that you should install dev deps:

- `@typescript-eslint/parser`
- `typescript`

Then configure your `.eslintrc` like this:

```jsonc
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "project": "./tsconfig.json" // <-- Point to your project's tsconfig.json or create new one
  },
  "settings": {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true,
        "directory": "./tsconfig.json" // <-- Same tsconfig.json must be referenced
      }
    }
  }
}
```

## Install

Install the plugin

```
npm i -D eslint-plugin-deprecation
```

## Setup

Now add deprecation plugin and rule to your `.eslintrc`:

```jsonc
{
  "plugins": ["deprecation", ...],
  "rules": {
    "deprecation/deprecation": "warn", // or "error" to have stricter rule
    ...
  }
}
```

Now eslint will report all deprecated code that you use!

---

_NOTE:_ This rule was ported from https://github.com/SonarSource/SonarJS repository.
