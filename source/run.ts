import {
  Test,
  Behavior,
  Assertion,
  Result,
  Report
} from './test';

const executeAssertion = (test: Test, behavior: Behavior) => (assertion: Assertion) => {
  try {
    const [success, message] = [].concat(
      typeof assertion === 'function'
      ? assertion()
      : assertion.expression()
    );

    const result: Result = {
      test,
      behavior,
      assertion,
      success
    };

    if (message !== undefined) {
      result.message = message;
    }

    return result;

  } catch (error) {
    return {
      test,
      behavior,
      assertion,
      success: false,
      message: <Error>error
    }
  }
};

const executeSituation = (test: Test) => (results: Result[], behavior: Behavior): Result[] => {
  const assertionsOrExpression = behavior[1];

  try {
    const assertions = typeof assertionsOrExpression === 'function'
                      ? assertionsOrExpression()
                      : [].concat(<any>assertionsOrExpression);

    return results.concat(assertions.map(executeAssertion(test, behavior)));
  } catch (error) {
    return results.concat(<Result>{
      test,
      behavior,
      assertion: assertionsOrExpression,
      success:   false,
      message:   error
    });
  }
};

export const run = (test: Test): Report => ({
  results:    test.behaviors.length > 0
              ? test.behaviors.reduce(executeSituation(test), [])
              : [],
  moduleName: test.moduleName
});
