# eslint-plugin-deprecation

[![Test Workflow](https://github.com/gund/eslint-plugin-deprecation/actions/workflows/test.yml/badge.svg)](https://github.com/gund/eslint-plugin-deprecation/actions/workflows/test.yml)
[![Release Workflow](https://github.com/gund/eslint-plugin-deprecation/actions/workflows/release.yml/badge.svg)](https://github.com/gund/eslint-plugin-deprecation/actions/workflows/release.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/bfd9c6e327a267130e50/maintainability)](https://codeclimate.com/github/gund/eslint-plugin-deprecation/maintainability)
[![Npm](https://img.shields.io/npm/v/eslint-plugin-deprecation.svg)](https://www.npmjs.com/package/eslint-plugin-deprecation)
[![Npm Downloads](https://img.shields.io/npm/dt/eslint-plugin-deprecation.svg)](https://www.npmjs.com/package/eslint-plugin-deprecation)
![Size](https://badgen.net/bundlephobia/minzip/eslint-plugin-deprecation)
[![Licence](https://img.shields.io/npm/l/eslint-plugin-deprecation.svg?maxAge=2592000)](https://github.com/gund/eslint-plugin-deprecation/blob/master/LICENSE)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

> ESLint rule that reports usage of deprecated code

## Prerequisites

This plugin only works with `@typescript-eslint/parser`.

Which means that you should install dev deps:

- `@typescript-eslint/parser`
- `typescript`

Then configure ESLint to parse TypeScript and include type information:

```jsonc
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "project": "./tsconfig.json" // <-- Point to your project's tsconfig.json or create new one
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
