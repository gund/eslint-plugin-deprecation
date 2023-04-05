import { TSESLint, ESLintUtils } from '@typescript-eslint/utils';
import rule, { MessageIds, Options } from '../../src/rules/deprecation';
import * as path from 'path';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
    tsconfigRootDir: path.resolve(__dirname, '..'),
    project: './tsconfig.test.json', // relative to tsconfigRootDir
  },
});

ruleTester.run('deprecation', rule, {
  // Don't warn at the spot where the deprecated thing is declared
  valid: [
    // Variables (var/const/let are the same from ESTree perspective)
    getValidTestCase(`
      /** @deprecated */ var v1 = 3;
      /** @deprecated */ var v2;
      /** @deprecated */ let l1 = 3;
      /** @deprecated */ let l2;
      /** @deprecated */ const c1 = 3;
      /** @deprecated */ declare const c2: any;
      `),
    // Variables with array initializers
    getValidTestCase(`
      const [/** @deprecated */ c1] = [foo];
      const [/** @deprecated */ c2] = foo;
      `),
    // Enums
    // (deprecated member MUST be on its own line for tag to be detected)
    getValidTestCase(`
      /** @deprecated */ enum Enum1 {}
      /** @deprecated */ declare enum Enum2 {}
      enum Enum3 {
        /** @deprecated */ member3,
        /** @deprecated */ member4 = 3
      }
      `),
    // Modules/namespaces (same from ESTree perspective)
    getValidTestCase(`
      /** @deprecated */ namespace ns1 {}
      /** @deprecated */ module mod1 {}
      /** @deprecated */ declare namespace ns2 {}
      /** @deprecated */ declare module mod2 {}
      `),
    // Functions
    getValidTestCase(`
      /** @deprecated */ function func1() {}
      /** @deprecated */ declare function func2();
      /** @deprecated */ function func3();
      const func4 = /** @deprecated */ function() {}
      const func5 = /** @deprecated */ function func6() {}
      /** @deprecated */ const func7 = function() {}
      /** @deprecated */ const func8 = function func9() {}
      `),
    // Function parameters
    getValidTestCase(`
      function func1(/** @deprecated */ param1);
      function func2(/** @deprecated */ param2) {}
      function func3(/** @deprecated */ param3 = foo) {}
      declare function func4(/** @deprecated */ param4);
      `),
    // Arrow functions + parameters
    getValidTestCase(`
      const arrow1 = /** @deprecated */ () => {};
      /** @deprecated */ const arrow2 = () => {};
      const arrow3 = (/** @deprecated */ param) => {};
      const arrow4 = (/** @deprecated */ param = foo) => {};
      `),
    // Interfaces
    // (prop MUST be on its own line for tag to be detected)
    getValidTestCase(`
      /** @deprecated */ interface Interface1 {}
      interface Interface2 {
        /** @deprecated */ prop: any;
        /** @deprecated */ method();
        /** @deprecated */ method();
      }
      interface Type3 {
        /** @deprecated */ (): any;
      }
      `),
    // Types
    // (prop MUST be on its own line for tag to be detected)
    getValidTestCase(`
      /** @deprecated */ type Type1 = {};
      type Type2 = {
        /** @deprecated */ prop: any;
        /** @deprecated */ method(): any;
      };
      type Type3 = {
        /** @deprecated */ (): any;
      };
      `),
    // Type parameters
    // (currently can't find a case where the rule *does* warn about these)
    getValidTestCase(`
      type Type1</** @deprecated */ T> = {}
      type Type2</** @deprecated */ T = string> = {}
      `),
    // Classes
    getValidTestCase(`
      /** @deprecated */ class Class1 {}
      /** @deprecated */ declare class Class2 {}
      /** @deprecated */ const Class3 = class {}
      const Class4 = /** @deprecated */ class {}
      `),
    // Class properties (static is same as non-static for this purpose)
    getValidTestCase(`
      class Class1 {
        /** @deprecated */ prop1: any;
        /** @deprecated */ prop2 = foo;
      }
      `),
    // Class methods and property getters/setters (handled as methods)
    getValidTestCase(`
      class Class1 {
        /** @deprecated */ get prop1();
        /** @deprecated */ set prop1(value: any);
        /** @deprecated */ get prop2() {}
        /** @deprecated */ set prop2(value: any) {}
        /** @deprecated */ method();
        /** @deprecated */ method() {}
      }
      `),
    // Class method parameters
    getValidTestCase(`
      class Class1 {
        method1(/** @deprecated */ param1);
        method2(/** @deprecated */ param2) {}
        method3(/** @deprecated */ param3 = foo) {}
      }
      `),
    // Constructor and class parameter properties
    getValidTestCase(`
      class Class1 {
        /** @deprecated */
        constructor() {}
      }
      class Class2 {
        constructor(
          /** @deprecated */ public prop1,
          /** @deprecated */ public prop2 = foo
          ) {}
      }
      `),
    // Deprecated prop on a variable (inline)
    // Documenting "validity" for now. Could be changed later if desired.
    getValidTestCase(`
      const c1 = { /** @deprecated */ prop1: 3 };
      console.log(c1);
      console.log(c1.prop1);
      const { prop1 } = c1;
      const { prop1 = 5 } = c1;
      const { prop1: thing1 } = c1;
      const c2 = c1.prop1;
      `),
    // Imports and exports (import path relative to ../fixtures)
    getValidTestCase(`
      import { Interface1, def1, Component } from './deprecatedExports';
      import def3 from './deprecatedExports';
      `),
    getValidTestCase(`
      const component = <Component/>;
    `),
    // Method overloads in classes
    getValidTestCase(`
    class Class {
      method(param: string): void;
      /** @deprecated */ method(param: number): void;

      method(param: any): void {}
    }
    new Class().method('');
    const obj = new Class();
    obj.method('');
  `),
    // Method overloads in interfaces extending a class
    // This notation used to be mentioned in the TypeScript handbook
    // See https://www.typescriptlang.org/docs/handbook/classes.html#using-a-class-as-an-interface
    getValidTestCase(`
    class Class {}
    interface Interface extends Class {
      method(param: string): void;
      /** @deprecated */ method(param: number): void;
    }
    const obj: Interface = { method(args: any) {} };
    obj.method('');
  `),
  ],
  // Error cases. `// ERROR: x` marks the spot where the error occurs.
  invalid: [
    // Deprecated variable with standard and destructuring access
    getInvalidTestCase(`
      /** @deprecated */ const c1 = { prop1: 3 };
      const c2 = c1;                    // ERROR: c1
      console.log(c1);                  // ERROR: c1
      console.log(c1.prop1);            // ERROR: c1
      const c3 = c1.prop1;              // ERROR: c1
      const { prop1 } = c1;             // ERROR: c1
      const { prop1 = 5 } = c1;         // ERROR: c1
      const { prop1: thing1 } = c1;     // ERROR: c1

      const [/** @deprecated */ c4] = [foo];
      console.log(c4);                  // missed

      /** @deprecated */ const c5 = [1, 2];
      const [c6, c7] = c5;              // ERROR: c5

      /** @deprecated */
      const c8 = 3;
      console.log(c8 + 9);              // ERROR: c8
      `),
    // Deprecated prop from an interface with standard and destructuring access
    // (prop MUST be on its own line for tag to be detected)
    getInvalidTestCase(`
      export interface Props {
        /** @deprecated */ prop1?: number;
      };
      const c1: Props = { prop1: 3 }; // missed
      console.log(c1.prop1);          // ERROR: prop1
      const { prop1 } = c1;           // ERROR: prop1
      const { prop1 = 5 } = c1;       // ERROR: prop1
      const { prop1: thing1 } = c1;   // ERROR: prop1
      `),
    // Enums
    // (member2 MUST be on its own line for tag to be detected)
    getInvalidTestCase(`
      /** @deprecated */ enum Enum1 { member1 }
      console.log(Enum1.member1);               // ERROR: Enum1
      const c1: Enum1;                          // ERROR: Enum1

      enum Enum2 {
        /** @deprecated */ member2
      }
      console.log(Enum2.member2);               // ERROR: member2
      `),
    // Namespaces (`module`s are the same from ESTree perspective)
    getInvalidTestCase(`
      /** @deprecated */ namespace ns1 {
        export const c1 = 3;
        export interface Interface1 {};
      }
      console.log(ns1.c1);              // ERROR: ns1
      const c2: ns1.Interface1 = {};    // ERROR: ns1
      `),
    // Functions
    getInvalidTestCase(`
      /** @deprecated */ function func1() {}
      func1();                              // ERROR: func1

      /** @deprecated */ function func2();
      function func2() {}
      func2();                              // ERROR: func2

      const func3 = /** @deprecated */ function() {}
      func3();                              // ERROR: func3

      const func4 = /** @deprecated */ function func5() {}
      func4();                              // ERROR: func4

      /** @deprecated */ const func6 = function() {}
      func6();                              // ERROR: func6

      /** @deprecated */ const func7 = function func8() {}
      func7();                              // ERROR: func7
      `),
    // Functions with multiple signatures
    getInvalidTestCase(`
      /** @deprecated */
      function func1();
      function func1(param1: any);
      function func1(param1?: any) {}

      func1();                              // ERROR: func1
      func1(3);

      /** @deprecated */
      function func2();
      /** @deprecated */
      function func2(param1: any);
      function func2(param1?: any) {}

      func2();                              // ERROR: func2
      func2(3);                             // ERROR: func2
      `),
    // Function parameters
    getInvalidTestCase(`
      function func1(/** @deprecated */ param1) {
        console.log(param1);                // ERROR: param1
      }
      func1(3);                             // missed

      function func2(/** @deprecated */ param2);
      function func2(param2) {
        console.log(param2);                // missed
      }
      func2(3);                             // missed
      `),
    // Arrow functions + parameters
    getInvalidTestCase(`
      const arrow1 = /** @deprecated */ () => {};
      arrow1();                             // ERROR: arrow1

      /** @deprecated */ const arrow2 = () => {};
      arrow2();                             // ERROR: arrow2

      const arrow3 = (/** @deprecated */ param) => {
        console.log(param);                 // ERROR: param
      };
      arrow3(3);                            // missed
      `),
    // Interfaces
    getInvalidTestCase(`
      /** @deprecated */ interface Interface1 {}
      const c1: Interface1 = {};                // ERROR: Interface1
      console.log(c1);

      interface Interface2 {
        /** @deprecated */ prop2: any;
        /** @deprecated */ method(): void;
      }
      const c2: Interface2 = { prop2: 3, method: () => {} }; // missed
      console.log(c2.prop2);                    // ERROR: prop2
      console.log(c2.method);                   // ERROR: method
      c2.method();                              // ERROR: method

      interface Type3 {
        /** @deprecated */ (): any;
      }
      const c3: Type3 = () => 3;
      c3();                                     // ERROR: c3
      `),
    // Interfaces - destructuring
    getInvalidTestCase(`
      interface Interface1 {
        /** @deprecated */ prop1: any;
      }
      const c1: Interface1 = { prop1: 3 };  // missed
      const { prop1 = 5 } = c1;             // ERROR: prop1
      const { prop1 } = c1;                 // ERROR: prop1
      const { prop1: c2 } = c1;             // ERROR: prop1
      const { prop1: c3 = 5 } = c1;         // ERROR: prop1
      `),
    // Types
    getInvalidTestCase(`
      /** @deprecated */ type Type1 = {};
      const c1: Type1 = {};                // ERROR: Type1
      console.log(c1);

      type Type2 = {
        /** @deprecated */ prop2: any;
        /** @deprecated */ method(): void;
      };
      const c2: Type2 = { prop2: 3, method: () => {} }; // missed
      console.log(c2.prop2);               // ERROR: prop2
      console.log(c2.method);              // ERROR: method
      c2.method();                         // ERROR: method

      type Type3 = {
        /** @deprecated */ (): any;
      }
      const c3: Type3 = () => 3;
      c3();                                // ERROR: c3
      `),
    // Types - destructuring
    getInvalidTestCase(`
      type Type1 = {
        /** @deprecated */ prop1: any;
      }
      const c1: Type1 = { prop1: 3 };       // missed
      const { prop1 = 5 } = c1;             // ERROR: prop1
      const { prop1 } = c1;                 // ERROR: prop1
      const { prop1: c2 } = c1;             // ERROR: prop1
      const { prop1: c3 = 5 } = c1;         // ERROR: prop1
      `),
    // Classes
    getInvalidTestCase(`
      /** @deprecated */ class Class1 {}
      const c1 = new Class1();            // ERROR: Class1
      console.log(c1);
      new Class1();                       // ERROR: Class1
      Class1();                           // ERROR: Class1
      const c2: Class1;                   // ERROR: Class1

      /** @deprecated */ const Class2 = class {}
      new Class2();                       // ERROR: Class2

      const Class3 = /** @deprecated */ class {}
      new Class3();                       // missed
      `),
    // Class properties
    getInvalidTestCase(`
      class Class1 {
        /** @deprecated */ static prop1;
        /** @deprecated */ prop2;

        method1() {
          console.log(Class1.prop1);  // ERROR: prop1
          console.log(this.prop2);    // ERROR: prop2
        }
      }

      console.log(Class1.prop1);      // ERROR: prop1
      const c1 = new Class1();
      console.log(c1.prop2);          // ERROR: prop2
      const { prop2 } = c1;           // ERROR: prop2
      `),
    // Class methods and property getters/setters (handled as methods)
    getInvalidTestCase(`
      class Class1 {
        /** @deprecated */ get prop1() {}
        /** @deprecated */ set prop1(value: any) {}
        /** @deprecated */ method() {
          console.log(this.prop1);      // ERROR: prop1
          this.prop1 = 3;               // ERROR: prop1
          this.method();                // ERROR: method
        }
      }

      const c1 = new Class1();
      console.log(c1.prop1);            // ERROR: prop1
      c1.prop1 = 3;                     // ERROR: prop1
      c1.method();                      // ERROR: method
      `),
    // Class method parameters
    getInvalidTestCase(`
      class Class1 {
        method1(/** @deprecated */ param1) {
          console.log(param1);            // ERROR: param1
        }
      }
      const c1 = new Class1();
      c1.method1(3);                      // missed
      `),
    // Class constructor and parameter properties
    getInvalidTestCase(`
      class Class1 {
        /** @deprecated */
        constructor() {}
      }
      const c1 = new Class1();              // ERROR: Class1

      class Class2 {
        constructor(
          /** @deprecated */ public prop2
          ) {}
      }
      const c2 = new Class2(3);             // missed
      console.log(c2.prop2);                // ERROR: prop2
      `),
    getInvalidTestCase(`
      /** @deprecated */
      const Component = () => <div/>;

      const component = <Component/>        // ERROR: Component
    `),
    // Mark deprecation on opening tag only
    getInvalidTestCase(`
      /** @deprecated */
      const Component = () => <div/>;

      const component = (
        <Component>                    {/* ERROR: Component */}
          hello
        </Component>
      );
    `),
    // Imports and exports (import path relative to ../fixtures)
    getInvalidTestCase(`
      import { Interface1, def1, Component } from './deprecatedExports';
      import def3 from './deprecatedExports';

      console.log(def1);              // ERROR: def1
      console.log(def3);              // ERROR: def3

      const def4: Interface1 = {};    // ERROR: Interface1
      const component = <Component/>  // ERROR: Component
      `),
    // Method overloads in interfaces
    getInvalidTestCase(`
      interface Interface {
        method(param: string): void;
        /** @deprecated */ method(): void;
        /** @deprecated */ method(param: number): void;
      }
      const obj: Interface = { method(args: any) {} };
      obj.method('valid');
      obj.method();  // ERROR: method
      obj.method(1); // ERROR: method
    `),
    // Method overloads in classes
    getInvalidTestCase(`
      class Class {
        method(param: string): void;
        /** @deprecated */ method(): void;
        /** @deprecated */ method(param: number): void;
      }
      const obj = new Class();
      obj.method('valid');
      obj.method();  // ERROR: method
      obj.method(1); // ERROR: method
    `),
  ],
});

function getValidTestCase(code: string): TSESLint.ValidTestCase<Options> {
  return {
    code,
    filename: 'fixtures/file.react.tsx',
  };
}

/**
 * Instead of hardcoding the line and column numbers of errors, calculate them
 * based on the position of "ERROR: someName" markers in the code.
 */
function getInvalidTestCase(
  code: string,
): TSESLint.InvalidTestCase<MessageIds, Options> {
  const lines = code.split(/\r?\n/g);
  const errors = [] as TSESLint.TestCaseError<MessageIds>[];

  lines.forEach((line, i) => {
    const errorInfo = /ERROR: (\w+)/.exec(line);
    if (errorInfo) {
      errors.push({
        line: i + 1,
        column: line.indexOf(errorInfo[1]) + 1,
        messageId: 'deprecated',
      });
    }
  });

  if (!errors.length) {
    throw new Error(
      'No ERROR: indications found in supposedly invalid code:\n' + code,
    );
  }

  return {
    code,
    errors,
    filename: 'fixtures/file.react.tsx',
  };
}
