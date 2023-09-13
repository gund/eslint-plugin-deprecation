let RuleTester: any;
try {
  ({ RuleTester } = require('@typescript-eslint/rule-tester'));
} catch {
  const { ESLintUtils } = require('typescript-eslint-utils-5');
  RuleTester = ESLintUtils.RuleTester;
}

export { RuleTester };
