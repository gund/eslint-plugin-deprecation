const BC_MODE = !!process.env.BC_MODE;

module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        isolatedModules: true,
      },
    ],
  },
  testRegex: './tests/.+\\.test\\.ts$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: BC_MODE
    ? {
        '@eslint/eslintrc/universal':
          '@eslint/eslintrc/dist/eslintrc-universal.cjs',
      }
    : undefined,
};
