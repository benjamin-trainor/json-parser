import { expect, test } from 'vitest';

import { scanner } from './lexical-analyser.mts';

test('scanner', () => {
  const tokens = scanner(JSON.stringify([{ name: 'Benjamin' }]));

  expect(tokens).toEqual([
    { type: 'LEFT_BRACKET', value: '[' },
    { type: 'LEFT_BRACE', value: '{' },
    { type: 'STRING', value: 'name' },
    { type: 'COLON', value: ':' },
    { type: 'STRING', value: 'Benjamin' },
    { type: 'RIGHT_BRACE', value: '}' },
    { type: 'RIGHT_BRACKET', value: ']' },
  ]);
});
