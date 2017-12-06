# Declarative testing for JavaScript

This is a proof of concept of a few ideas floating around in my head for
quite some time now.

The idea is to treat tests like data and for modules to export this data for
a test runner to execute:

```javascript
const { behavior, assertion } = 'declarative-test';

module.exports = [
  behavior('1 is 1', [assertion(() => 1 == 1)])
  behavior('something completely different', () => {
    const a = 1;
    const b = 2;

    return [
      assertion(() => a === b - 1),
      assertion(() => a + 1 === b)
    ];
  })
];
```

A module represents a Test, which is a collection of behaviors (test cases),
which in turn are either an array of assertions or a function returning an
array of assertions. (NOTE: There is a *very* high chance this will change
*very* soon. But it's getting late and I have to provide a README…)

The idea is in contrast to the way popular test frameworks
act: the ones I know tend to make the test modules either a very special module
that can only be required by the test runner, or a test runner itself.

## Usage

```
$ git clone …
$ cd …
$ npm install
$ node ./node_modules/typescript/bin/tsc
$ node
> test = { moduleName: 'built/example', behaviors: require('./built/example').default }
{ moduleName: 'built/example',
  behaviors: [ [ '1', [Function] ], [ '2', [Array] ] ] }
> require('./built/run').run(test).results
[ { test: { moduleName: 'built/example', behaviors: [Array] },
    behavior: [ '1', [Function] ],
    assertion: [Function],
    success: false,
    message:
     { AssertionError [ERR_ASSERTION]: undefined == true
    at exports.default.test_1.behavior (/Users/apanek/panek/declaratest/built/example.js:11:9)
    at /Users/apanek/panek/declaratest/built/run.js:33:15
    at Array.reduce (<anonymous>)
    at Object.exports.run (/Users/apanek/panek/declaratest/built/run.js:49:26)
    at repl:1:24
    at ContextifyScript.Script.runInThisContext (vm.js:50:33)
    at REPLServer.defaultEval (repl.js:240:29)
    at bound (domain.js:301:14)
    at REPLServer.runBound [as eval] (domain.js:314:12)
    at REPLServer.onLine (repl.js:441:10)
       generatedMessage: true,
       name: 'AssertionError [ERR_ASSERTION]',
       code: 'ERR_ASSERTION',
       actual: undefined,
       expected: true,
       operator: '==' } },
  { test: { moduleName: 'built/example', behaviors: [Array] },
    behavior: [ '2', [Array] ],
    assertion: { description: 'always true', expression: [Function] },
    success: true } ]
```