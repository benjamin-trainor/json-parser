import { REGEX, Scanner, Token, TOKEN_TYPES } from '../types/types.mts';
import {
  createToken,
  isBooleanFalse,
  isBooleanTrue,
  isNull,
  isNumber,
} from '../utils/utils.mts';

const CharacterHandlers = [
  { type: TOKEN_TYPES.LEFT_BRACE, value: '{' },
  { type: TOKEN_TYPES.RIGHT_BRACE, value: '}' },
  { type: TOKEN_TYPES.LEFT_BRACKET, value: '[' },
  { type: TOKEN_TYPES.RIGHT_BRACKET, value: ']' },
  { type: TOKEN_TYPES.COLON, value: ':' },
  { type: TOKEN_TYPES.COMMA, value: ',' },
];

export const scanner: Scanner = (stringifiedInput) => {
  let currentIndex = 0;
  const tokens: Token[] = [];

  while (currentIndex < stringifiedInput.length) {
    // console.log('currentIndex: ', currentIndex);
    // console.log('length of stringified input: ', stringifiedInput.length);
    let char = stringifiedInput[currentIndex];

    // WHITESPACE
    if (REGEX.WHITESPACE.test(char)) {
      currentIndex += 1;
      continue;
    }

    // NUMBER, BOOLEAN, and NULL values
    if (REGEX.REGEX.test(char)) {
      let value = '';
      while (REGEX.REGEX.test(char) && currentIndex < stringifiedInput.length) {
        value += char;
        char = stringifiedInput[++currentIndex];
      }

      if (isNumber(value)) tokens.push(createToken(TOKEN_TYPES.NUMBER, value));
      else if (isBooleanTrue(value))
        tokens.push(createToken(TOKEN_TYPES.TRUE, value));
      else if (isBooleanFalse(value))
        tokens.push(createToken(TOKEN_TYPES.FALSE, value));
      else if (isNull(value)) tokens.push(createToken(TOKEN_TYPES.NULL, value));
      else throw new Error(`Unexpected value: ${value}`);

      continue;
    }

    // STRING
    if (char === '"') {
      let value = '';
      char = stringifiedInput[++currentIndex];
      while (char !== '"') {
        value += char;
        char = stringifiedInput[++currentIndex];
      }
      currentIndex += 1;
      tokens.push(createToken(TOKEN_TYPES.STRING, value));
      continue;
    }

    CharacterHandlers.forEach(({ type, value }) => {
      if (char === value) {
        tokens.push(createToken(type, value));
        currentIndex += 1;
        return;
      }
    });

    continue;
  }

  return tokens;
};
