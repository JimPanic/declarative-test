import * as assert from 'assert'; 

import { behavior, assertion } from './test';

export default [
  behavior('1', () => {
    const someValue = 1;
    const someobject = { a: 1 };

    assert.deepEqual({ a: someValue }, someobject);
    assert(someValue === 1);
    assert(undefined);

    return [
      assertion(() => true, 'also always true'),
      assertion(() => false, 'ALWAYS FALSE HAHAHA')
    ]
  }),
  behavior('2', [
    assertion(() => true, 'always true')
  ])
];

/*
export default [
  situation('test abc', [
    foo,
    () => [false, 'sometimes false it is']
  ]),
  situation('test cba', [
    assertion('true is always true', () => true),
  ])
];
*/