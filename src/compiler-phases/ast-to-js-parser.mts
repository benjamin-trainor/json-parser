import {
  AST_TYPES,
  ASTNode,
  JS_OBJECT,
  JS_TYPES,
  ParseASTArray,
  ParseASTObject,
} from '../types/types.mts';

export const astToJSParser = (astData: ASTNode) => {
  // recursively navigate our way down the AST tree to create a JS object

  const parseASTValue = (data: ASTNode) => {
    switch (data.type) {
      case AST_TYPES.STRING_LITERAL:
        return data.value;
      case AST_TYPES.NUMBER_LITERAL:
        return data.value;
      case AST_TYPES.BOOLEAN_LITERAL:
        return data.value;
      case AST_TYPES.NULL:
        return null;
      case AST_TYPES.OBJECT_EXPRESSION:
        return parseASTObject(data);
      case AST_TYPES.ARRAY_EXPRESSION:
        return parseASTArray(data);
      default:
        throw new Error(`Unexpected AST value: ${data}`);
    }
  };

  const parseASTObject: ParseASTObject = (data) => {
    let node: JS_OBJECT = {};

    if (data.type === AST_TYPES.OBJECT_EXPRESSION) {
      data.properties.forEach((keyValue) => {
        const { key, value } = keyValue;
        const keyName = key.value;

        node[keyName] = parseASTValue(value);
      });

      return node;
    }

    throw new Error(`Unexpected Object value: ${data}`);
  };

  const parseASTArray: ParseASTArray = ({ type, value }) => {
    if (type === AST_TYPES.ARRAY_EXPRESSION) {
      let node: JS_TYPES[] = value.map((data) => parseASTValue(data));

      return node;
    }

    throw new Error(`Unexpected Object type: ${type} value: ${value}`);
  };

  return parseASTValue(astData);
};
