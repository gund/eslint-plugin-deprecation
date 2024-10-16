# Rule has migrated

Rule had been added to [`typescript-eslint`](https://github.com/typescript-eslint/typescript-eslint) project and the docs can be found [here](https://typescript-eslint.io/rules/no-deprecated).
This repo is no longer maintained and is archived.

# eslint-plugin-deprecation

[![Test Workflow](https://github.com/gund/eslint-plugin-deprecation/actions/workflows/test.yml/badge.svg)](https://github.com/gund/eslint-plugin-deprecation/actions/workflows/test.yml)
[![Release Workflow](https://github.com/gund/eslint-plugin-deprecation/actions/workflows/release.yml/badge.svg)](https://github.com/gund/eslint-plugin-deprecation/actions/workflows/release.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/bfd9c6e327a267130e50/maintainability)](https://codeclimate.com/github/gund/eslint-plugin-deprecation/maintainability)
[![Npm](https://img.shields.io/npm/v/eslint-plugin-deprecation.svg)](https://www.npmjs.com/package/eslint-plugin-deprecation)
[![Npm Downloads](https://img.shields.io/npm/dt/eslint-plugin-deprecation.svg)](https://www.npmjs.com/package/eslint-plugin-deprecation)
![Size](https://badgen.net/bundlephobia/minzip/eslint-plugin-deprecation)
[![License](https://img.shields.io/npm/l/eslint-plugin-deprecation.svg?maxAge=2592000)](https://github.com/gund/eslint-plugin-deprecation/blob/master/LICENSE)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

> An [ESLint](https://eslint.org/) plugin with rules reporting usage of deprecated code

## Prerequisites

If you already use [TypeScript](https://www.typescriptlang.org/) and one or more rules from the [`typescript-eslint`](https://typescript-eslint.io/) plugin, then `eslint-plugin-deprecation` will work out of the box without any additional dependencies or special configuration specified in this section. (This is because `@typescript-eslint/plugin` automatically contains `@typescript-eslint/parser` and your ESLint should already be configured with the `parserOptions` to work properly with TypeScript.)

Otherwise, in order for you to use this plugin, you must also install the following dependencies:

- `typescript`
- `@typescript-eslint/parser`

For example, if you use the `npm` package manager, then you would run the following command in the root of your project:

```sh
npm install --save-dev typescript @typescript-eslint/parser
```

Next, you must configure ESLint to parse TypeScript and include type information:

```jsonc
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "project": "./tsconfig.json" // <-- Point to your project's "tsconfig.json" or create a new one.
  }
}
```

## Install

For example, if you use the `npm` package manager, then you would run the following command in the root of your project:

```sh
npm install --save-dev eslint-plugin-deprecation
```

## Setup

### Using the `recommended` Config

The easiest way to use this plugin is to extend from the `recommended` config, like this:

```jsonc
{
  "extends": [
    "plugin:deprecation/recommended",
  ],
}
```

The `recommended` config will enable the plugin and enable the `deprecation/deprecation` rule with a value of `error`.

### Manually Enable the Plugin and Rule

If you don't want to use the `recommended` config for some reason, you can accomplish the same thing by specifying the following config:

```jsonc
{
  "plugins": [
    "deprecation",
  ],

  "rules": {
    "deprecation/deprecation": "error",
  },
}
```

## Rules

### Disallow usage of deprecated APIs (`deprecation/deprecation`)

Reports usage of any code marked with a [`@deprecated` JSDoc tag](https://jsdoc.app/tags-deprecated.html).

For example, this includes browser APIs, Node.js APIs, library APIs and any other code that is marked with this tag.

#### Rule Details

Examples of **incorrect** code for this rule:

```ts
import { parse } from 'node:url';
import cheerio from 'cheerio';

// Node.js API
const url = parse('/foo'); // ❌ 'parse' is deprecated. Use the WHATWG URL API instead. eslint(deprecation/deprecation)

// Browser API
console.log(event?.bubbles); // ❌ 'event' is deprecated. [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/event) eslint(deprecation/deprecation)

// Deprecated library API
cheerio('<h2 class="title">Hello world</h2>'); // ❌ 'cheerio' is deprecated. Use the function returned by `load` instead. eslint(deprecation/deprecation)
```

Examples of **correct** code for this rule:

```ts
import { load } from 'cheerio';
import { ChangeEvent } from 'react';

// Node.js API
const url2 = new URL('/foo', 'http://www.example.com'); // ✅ Modern Node.js API, uses `new URL()`

// Browser API
function onClick(event: ChangeEvent<HTMLInputElement>) {
  console.log(event.bubbles); // ✅ Modern browser API, does not use global
}

// Library API
load('<h2 class="title">Hello world</h2>'); // ✅ Allowed library API, uses named `load` import
```

## Credits

This rule was originally ported from the [SonarJS repository](https://github.com/SonarSource/SonarJS).
