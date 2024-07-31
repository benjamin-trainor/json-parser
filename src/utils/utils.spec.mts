import { expect, it, describe } from 'vitest';

import { TOKEN_TYPES } from '../types/types.mts';
import {
  createToken,
  isBooleanTrue,
  isBooleanFalse,
  isNumber,
  isNull,
} from './utils.mts';

describe('validToken', () => {
  it('creates a valid token', () => {
    const token = createToken(TOKEN_TYPES.STRING, 'Benjamin');

    expect(token).toEqual({ type: TOKEN_TYPES.STRING, value: 'Benjamin' });
  });
});

describe('isNumber', () => {
  it('returns true with: 2345', () => {
    const isTrue = isNumber('2345');

    expect(isTrue).toEqual(true);
  });

  it('returns true with: 23.67', () => {
    const isTrue = isNumber('23.67');

    expect(isTrue).toEqual(true);
  });

  it('returns false with: a237363', () => {
    const isFalse = isNumber('a237363');

    expect(isFalse).toEqual(false);
  });
});

describe('isBooleanTrue', () => {
  it('returns true', () => {
    const isTrue = isBooleanTrue('true');

    expect(isTrue).toEqual(true);
  });

  it('returns false', () => {
    const isFalse = isBooleanTrue('false');

    expect(isFalse).toEqual(false);
  });
});

describe('isBooleanFalse', () => {
  it('returns true', () => {
    const isTrue = isBooleanFalse('false');

    expect(isTrue).toEqual(true);
  });

  it('returns false', () => {
    const isFalse = isBooleanFalse('true');

    expect(isFalse).toEqual(false);
  });
});

describe('isNull', () => {
  it('returns true', () => {
    const isTrue = isNull('null');

    expect(isTrue).toEqual(true);
  });

  it('returns false', () => {
    const isFalse = isNull('true');

    expect(isFalse).toEqual(false);
  });
});
