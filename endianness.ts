import { Long } from "./deps.ts";

export const swapEndianness = (num: Uint8Array): Uint8Array => {
  return num.reverse();
};

export const removeExtraneousZeroes = (le: number[]): number[] => {
  if (le.length <= 1) {
    return le;
  }
  const msbs = le.slice(le.length / 2);
  return msbs.every((b) => b === 0)
    ? removeExtraneousZeroes(le.slice(0, le.length / 2))
    : le;
};

export const numberToBigEndian = (num: number | Long | string) => {
  return numberToLittleEndian(num).reverse();
};

export const numberToLittleEndian = (
  num: number | Long | string,
  width = 0
) => {
  const bytes = Long.fromValue(num).toBytesLE();
  if (width === 0) {
    return new Uint8Array(removeExtraneousZeroes(bytes));
  }
  bytes.length = width;
  return new Uint8Array(Array.from(bytes, (b) => b ?? 0));
};
