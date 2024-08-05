const WHITESPACE_REGEX = /\s/;

export const REGEX = {
  REGEX: /[a-zA-Z0-9.]/,
  WHITESPACE: WHITESPACE_REGEX,
};

export enum TOKEN_TYPES {
  LEFT_BRACE = 'LEFT_BRACE',
  RIGHT_BRACE = 'RIGHT_BRACE',
  LEFT_BRACKET = 'LEFT_BRACKET',
  RIGHT_BRACKET = 'RIGHT_BRACKET',
  COLON = 'COLON',
  COMMA = 'COMMA',
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  TRUE = 'TRUE',
  FALSE = 'FALSE',
  NULL = 'NULL',
}

export enum AST_TYPES {
  PROGRAM = 'Program',
  ARRAY_EXPRESSION = 'ArrayExpression',
  OBJECT_EXPRESSION = 'ObjectExpression',
  PROPERTY = 'Property',
  STRING_LITERAL = 'StringLiteral',
  NUMBER_LITERAL = 'NumberLiteral',
  BOOLEAN_LITERAL = 'BooleanLiteral',
  NULL = 'Null',
}

type Property = {
  type: AST_TYPES.PROPERTY;
  key: { type: TOKEN_TYPES.STRING; value: string };
  value: ASTNode;
};

export type ASTNode =
  | {
      type: AST_TYPES.OBJECT_EXPRESSION;
      properties: Property[];
    }
  | { type: AST_TYPES.ARRAY_EXPRESSION; value: ASTNode[] }
  | { type: AST_TYPES.STRING_LITERAL; value: string }
  | { type: AST_TYPES.NUMBER_LITERAL; value: number }
  | { type: AST_TYPES.BOOLEAN_LITERAL; value: boolean }
  | { type: AST_TYPES.NULL; value: null };

export type JS_OBJECT = { [key: string]: JS_TYPES };

export type JS_TYPES =
  | string
  | number
  | boolean
  | null
  | JS_OBJECT
  | JS_TYPES[];

export type Token = {
  type: TOKEN_TYPES;
  value: string;
};

export type CreateToken = (type: TOKEN_TYPES, value: string) => Token;

export type Scanner = (stringifiedInput: string) => Token[];

export type Parser = (tokens: Token[]) => ASTNode;

export type ParsedObject = () => ASTNode;

export type ParsedArray = () => ASTNode;

export type JSONParserObject = {
  tokeniser: (input: string) => Token[];
  generateAST: (tokens: Token[]) => ASTNode;
  jsonToJSParser: (input: string) => JS_TYPES;
};

export type ParseASTObject = (data: {
  type: AST_TYPES.OBJECT_EXPRESSION;
  properties: Property[];
}) => { [key: string]: JS_TYPES };

export type ParseASTArray = (data: {
  type: AST_TYPES.ARRAY_EXPRESSION;
  value: ASTNode[];
}) => JS_TYPES[];
