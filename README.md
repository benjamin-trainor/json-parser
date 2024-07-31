### Lexical Analysis

uses Regex for identifiers
ie: { } " " , :

scans the string from one index to the next
takes Lexemes as inpuut and produces Tokens

Tokens
indentifiers
key names and their value

Two steps:

- scanning -> (eliminate Non-Token Elements ie whitespace)
- analysing -> Tokens

# Analysing Phase

inite state machines for identifying specific Tokens
ie true, false, null, undefined

# JSON Abstract Syntax Tree (AST)
