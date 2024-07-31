import {
  AST_TYPES,
  ASTNode,
  ParsedArray,
  ParsedObject,
  Parser,
  TOKEN_TYPES,
} from '../types/types.mts';

export const parser: Parser = (tokens) => {
  if (!tokens.length) {
    throw new Error('Nothing to parse');
  }

  let currentIndex = 0;

  const advance = () => {
    return tokens[++currentIndex];
  };

  const parseValue = (): ASTNode => {
    const currentToken = tokens[currentIndex];

    switch (currentToken.type) {
      case TOKEN_TYPES.STRING:
        return { type: AST_TYPES.STRING_LITERAL, value: currentToken.value };
      case TOKEN_TYPES.NUMBER:
        return {
          type: AST_TYPES.NUMBER_LITERAL,
          value: Number(currentToken.value),
        };
      case TOKEN_TYPES.TRUE:
        return { type: AST_TYPES.BOOLEAN_LITERAL, value: true };
      case TOKEN_TYPES.FALSE:
        return { type: AST_TYPES.BOOLEAN_LITERAL, value: false };
      case TOKEN_TYPES.NULL:
        return { type: AST_TYPES.NULL, value: null };
      case TOKEN_TYPES.LEFT_BRACE:
        return parseObject();
      case TOKEN_TYPES.LEFT_BRACKET:
        return parseArray();
      default:
        throw new Error(`Unexpected token type: ${currentToken.type}`);
    }
  };

  const parseObject: ParsedObject = () => {
    const node: ASTNode = { type: AST_TYPES.OBJECT_EXPRESSION, properties: [] };
    let token = advance();

    while (token.type !== TOKEN_TYPES.RIGHT_BRACE) {
      if (token.type === TOKEN_TYPES.STRING) {
        const key = token.value;
        token = advance();
        if (token.type !== TOKEN_TYPES.COLON)
          throw new Error('Expected : in key-value pair');
        token = advance();
        const value = parseValue(); // Recursively parse the value
        node.properties.push({
          type: AST_TYPES.PROPERTY,
          key: { type: TOKEN_TYPES.STRING, value: key },
          value: value,
        });
      } else {
        throw new Error(
          `Expected String key in object. Token type: ${token.type}`,
        );
      }
      token = advance();
      if (token.type === TOKEN_TYPES.COMMA) token = advance();
    }

    return node;
  };

  const parseArray: ParsedArray = () => {
    const node: ASTNode = { type: AST_TYPES.ARRAY_EXPRESSION, value: [] };
    let token = advance();

    while (token.type !== TOKEN_TYPES.RIGHT_BRACKET) {
      const value = parseValue(); // Recursively parse the value
      node.value.push(value);

      token = advance();
      if (token.type === TOKEN_TYPES.COMMA) token = advance();
    }

    return node;
  };

  const ast: ASTNode = parseValue();

  return ast;
};
