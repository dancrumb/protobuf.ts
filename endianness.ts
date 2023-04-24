import { Long } from "./deps.ts";

export function swapEndianness(num: Uint8Array): Uint8Array {
  return num.reverse();
}

export function removeExtraneousZeroes(le: number[]): number[] {
  if (le.length <= 1) {
    return le;
  }
  const msbs = le.slice(le.length / 2);
  return msbs.every((b) => b === 0)
    ? removeExtraneousZeroes(le.slice(0, le.length / 2))
    : le;
}

export function numberToBigEndian(num: number | Long | string): Uint8Array {
  return numberToLittleEndian(num).reverse();
}

export function numberToLittleEndian(
  num: number | Long | string,
  width = 0
): Uint8Array {
  const bytes = Long.fromValue(num).toBytesLE();
  if (width === 0) {
    return new Uint8Array(removeExtraneousZeroes(bytes));
  }
  bytes.length = width;
  return new Uint8Array(Array.from(bytes, (b) => b ?? 0));
}
