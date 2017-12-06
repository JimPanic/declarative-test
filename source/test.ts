export interface Assertion {
  description?: string
  expression:   Function
}

export interface BehaviorExpression {
  (): Assertion[]
}

export type Behavior = [string, BehaviorExpression | Assertion[]];

export interface Test {
  behaviors:  Behavior[]
  moduleName: string
}

export interface Result {
  assertion: Assertion | BehaviorExpression
  behavior:  Behavior
  test:      Test
  success:   boolean
  message?:  string | Error
}

export interface Report {
  results:    Result[]
  moduleName: string
}

export const behavior = (description: string, assertions: BehaviorExpression | Assertion[]): Behavior => [
  description,
  assertions
];

export const assertion = (expression: Function, description?: string): Assertion => ({
  description, expression
});
