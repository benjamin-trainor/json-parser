import { CreateToken } from '../types/types.mts';

export const createToken: CreateToken = (type, value) => ({
  type,
  value,
});

export const isBooleanTrue = (value: string): boolean => value === 'true';
export const isBooleanFalse = (value: string): boolean => value === 'false';
export const isNull = (value: string): boolean => value === 'null';
export const isNumber = (value: string): boolean => !isNaN(Number(value));
