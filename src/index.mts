import { scanner } from './compiler-phases/lexical-analyser.mts';
import { parser } from './compiler-phases/syntax-analyser.mts';
import { JSONParserObject } from './types/types.mts';

export const JSONParser: JSONParserObject = {
  tokeniser: (input) => scanner(input),
  generateAST: (tokens) => parser(tokens),
  // TODO: Needs one more step to convert from JSON AST to JS
  jsonToJSParser: (input) => parser(scanner(input)),
};

console.log(scanner(JSON.stringify([{ name: 'Benjamin' }])));

const dataObject = {
  name: 'John Doe',
  age: 28,
  email: 'johndoe@example.com',
  address: {
    street: '123 Elm Street',
    city: 'Springfield',
    state: 'IL',
    postalCode: '62704',
  },
  phoneNumbers: [
    {
      type: 'home',
      number: '555-1234',
    },
    {
      type: 'work',
      number: '555-5678',
    },
  ],
  isActive: true,
  preferences: {
    newsletter: false,
    notifications: true,
  },
  lastLogin: '2024-07-30T14:48:00Z',
  favoriteColors: ['red', 'blue', 'green'],
};

// console.dir(parser(scanner(JSON.stringify(dataObject))), { depth: null });

const dataArray = [
  {
    id: 1,
    name: 'Item 1',
    details: {
      description: 'Description for Item 1',
      price: 10.99,
      available: true,
      tags: ['tag1', 'tag2', 'tag3'],
    },
    variants: [
      { variantId: 101, color: 'red', size: 'M' },
      { variantId: 102, color: 'blue', size: 'L' },
    ],
  },
  {
    id: 2,
    name: 'Item 2',
    details: {
      description: 'Description for Item 2',
      price: 15.49,
      available: false,
      tags: ['tag4', 'tag5'],
    },
    variants: [
      { variantId: 201, color: 'green', size: 'S' },
      { variantId: 202, color: 'yellow', size: 'M' },
    ],
  },
  {
    id: 3,
    name: 'Item 3',
    details: {
      description: 'Description for Item 3',
      price: 8.99,
      available: true,
      tags: ['tag6', 'tag7', 'tag8', 'tag9'],
    },
    variants: [
      { variantId: 301, color: 'black', size: 'XL' },
      { variantId: 302, color: 'white', size: 'L' },
    ],
  },
  [
    {
      id: 4,
      name: 'Nested Item 1',
      details: {
        description: 'Description for Nested Item 1',
        price: 12.99,
        available: true,
        tags: ['nestedTag1', 'nestedTag2'],
      },
      variants: [
        { variantId: 401, color: 'purple', size: 'M' },
        { variantId: 402, color: 'pink', size: 'S' },
      ],
    },
    {
      id: 5,
      name: 'Nested Item 2',
      details: {
        description: 'Description for Nested Item 2',
        price: 18.75,
        available: false,
        tags: ['nestedTag3'],
      },
      variants: [
        { variantId: 501, color: 'orange', size: 'L' },
        { variantId: 502, color: 'brown', size: 'M' },
      ],
    },
  ],
];

// console.dir(parser(scanner(JSON.stringify(dataArray))), { depth: null });
