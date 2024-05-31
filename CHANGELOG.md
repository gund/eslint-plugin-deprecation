# Changelog

# [3.0.0](https://github.com/gund/eslint-plugin-deprecation/compare/v2.0.0...v3.0.0) (2024-05-31)


### Features

* add plugin meta and support typescript-eslint@7 ([#86](https://github.com/gund/eslint-plugin-deprecation/issues/86)) ([1365f7f](https://github.com/gund/eslint-plugin-deprecation/commit/1365f7f14ae529210b812aad78c1c0e0e26c6e1f))


### BREAKING CHANGES

* Dropped support for ESLint v7.

* feat: add plugin meta and support typescript-eslint@7

* Update package.json

Co-authored-by: Alex Malkevich <3644678+gund@users.noreply.github.com>

* Updated lockfile and other dependencies

* skipLibCheck too

* Goodbye, ESLint v7

# [2.0.0](https://github.com/gund/eslint-plugin-deprecation/compare/v1.5.0...v2.0.0) (2023-09-13)


### Features

* migrate to typescript-eslint/utils 6.x ([#71](https://github.com/gund/eslint-plugin-deprecation/issues/71)) ([5a32ce0](https://github.com/gund/eslint-plugin-deprecation/commit/5a32ce0c761782902c07ec9df4dee5150f7b5c4c))


### BREAKING CHANGES

* Dropped support for ESLint v6 and Typescript v3.7.5, please make sure to use at least ESLint v7 with Typescript v4.2 or downgrade to a previous major version.

# [1.5.0](https://github.com/gund/eslint-plugin-deprecation/compare/v1.4.1...v1.5.0) (2023-07-27)


### Features

* add `deprecation/recommended` configuration ([#69](https://github.com/gund/eslint-plugin-deprecation/issues/69)) ([4b482c0](https://github.com/gund/eslint-plugin-deprecation/commit/4b482c09a5af43fb80531980ffc95a592e8421d5)), closes [#68](https://github.com/gund/eslint-plugin-deprecation/issues/68)
* recommended config ([33a1888](https://github.com/gund/eslint-plugin-deprecation/commit/33a18886f48e395c4afa86ed10448c207c79d5dd))

## [1.4.1](https://github.com/gund/eslint-plugin-deprecation/compare/v1.4.0...v1.4.1) (2023-04-05)


### Bug Fixes

* **deps:** use `@typescript-eslint/utils` instead of experimental ([448004c](https://github.com/gund/eslint-plugin-deprecation/commit/448004cc0f5a330369db93b6a81a60714b9a04e7))

# [1.4.0](https://github.com/gund/eslint-plugin-deprecation/compare/v1.3.3...v1.4.0) (2023-04-01)


### Features

* add support for Typescript v5 ([a9683d9](https://github.com/gund/eslint-plugin-deprecation/commit/a9683d9261b8466667653e94b042e0ec02a51ebf))

# [1.4.0-next.2](https://github.com/gund/eslint-plugin-deprecation/compare/v1.4.0-next.1...v1.4.0-next.2) (2023-03-31)


### Bug Fixes

* update to typescript v5 ([9416799](https://github.com/gund/eslint-plugin-deprecation/commit/94167994d47ce8ba49bc6cece6d8da0549ecb520)), closes [/github.com/typescript-eslint/typescript-eslint/issues/5457#issuecomment-1210617414](https://github.com//github.com/typescript-eslint/typescript-eslint/issues/5457/issues/issuecomment-1210617414)

# [1.4.0-next.1](https://github.com/gund/eslint-plugin-deprecation/compare/v1.3.3...v1.4.0-next.1) (2023-02-22)


### Features

* **deps:** add Typescript v5 beta support ([0d7e2a4](https://github.com/gund/eslint-plugin-deprecation/commit/0d7e2a4805075f36f05e18b6efeb663b00e6bdfb))

## [1.3.3](https://github.com/gund/eslint-plugin-deprecation/compare/v1.3.2...v1.3.3) (2022-11-14)


### Bug Fixes

* **rule:** optimize rule checks ([bcffb64](https://github.com/gund/eslint-plugin-deprecation/commit/bcffb64a3521354c5c5a20d7555ca41eaba97e2d))

## [1.3.2](https://github.com/gund/eslint-plugin-deprecation/compare/v1.3.1...v1.3.2) (2021-12-15)


### Bug Fixes

* **rule:** restore compatibility with ESLint <=v7 ([daace2a](https://github.com/gund/eslint-plugin-deprecation/commit/daace2acc0e53a77ea1ac06f375cc9cd15660357))

## [1.3.1](https://github.com/gund/eslint-plugin-deprecation/compare/v1.3.0...v1.3.1) (2021-12-14)


### Bug Fixes

* print deprecation reason correctly on ts 4.3+ ([e3c3c47](https://github.com/gund/eslint-plugin-deprecation/commit/e3c3c47885c44cd48dddf744868102fcf3dff6e7))

# [1.3.0](https://github.com/gund/eslint-plugin-deprecation/compare/v1.2.1...v1.3.0) (2021-12-14)


### Features

* **deps:** update deps, support of eslint 8 ([6cb798c](https://github.com/gund/eslint-plugin-deprecation/commit/6cb798caf09c60f29dc07151878e6e90c426591a))

## [1.2.1](https://github.com/gund/eslint-plugin-deprecation/compare/v1.2.0...v1.2.1) (2021-05-04)


### Bug Fixes

* don't flag JSX closing tags ([ea60c3d](https://github.com/gund/eslint-plugin-deprecation/commit/ea60c3dd3131946f792e895816447e3e317bc73b))

# [1.2.0](https://github.com/gund/eslint-plugin-deprecation/compare/v1.1.1...v1.2.0) (2020-12-07)


### Features

* add ability to show rule for JSX usage ([f60558c](https://github.com/gund/eslint-plugin-deprecation/commit/f60558c40892363b2936ac4cb13448bba714920b)), closes [#8](https://github.com/gund/eslint-plugin-deprecation/issues/8)

## [1.1.1](https://github.com/gund/eslint-plugin-deprecation/compare/v1.1.0...v1.1.1) (2020-12-06)


### Bug Fixes

* **package:** allow Typescript v4 as a peer dependency ([0e31d0c](https://github.com/gund/eslint-plugin-deprecation/commit/0e31d0c66bbf9e6b8dd5aafdae39f9df1923a640))

# [1.1.0](https://github.com/gund/eslint-plugin-deprecation/compare/v1.0.1...v1.1.0) (2020-06-03)


### Bug Fixes

* add back eslint peer dep ([88a3a42](https://github.com/gund/eslint-plugin-deprecation/commit/88a3a424dfbb1525dcf814502285930695f21eae))
* add back some dependencies ([10994ed](https://github.com/gund/eslint-plugin-deprecation/commit/10994eddbc4df99f7eaee9028e52e45c39a59d2c))
* address PR feedback ([2714330](https://github.com/gund/eslint-plugin-deprecation/commit/27143300b3232bfb9881d5c7caa3f4135f4f4255))


### Features

* catch more deprecation cases and add tests ([33eecd6](https://github.com/gund/eslint-plugin-deprecation/commit/33eecd68566e36546a9f2271b005292e99ffb5c1))

## [1.0.1](https://github.com/gund/eslint-plugin-deprecation/compare/v1.0.0...v1.0.1) (2020-05-04)


### Bug Fixes

* **build:** remove typescript from dependencies and keep it as peer dependency only ([b724caf](https://github.com/gund/eslint-plugin-deprecation/commit/b724cafbf6783b6dc9f98cdb34138503b47a3333)), closes [#3](https://github.com/gund/eslint-plugin-deprecation/issues/3)

# 1.0.0 (2020-02-16)


### Features

* **rule:** implement ([607a932](https://github.com/gund/eslint-plugin-deprecation/commit/607a932efe68056a94f634efaf8d4b3b01b2f58a))
