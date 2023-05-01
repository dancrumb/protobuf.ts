import { Long } from "./deps.ts";

export function swapEndianness(num: Uint8Array): Uint8Array {
  return num.reverse();
}

export function removeExtraneousZeroes(le: number[]): number[] {
  const result = [...le];
  while (result[result.length - 1] === 0) {
    result.length--;
  }
  if (result.length === 0) {
    return [0];
  }
  return result;
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

export function littleEndianToNumber(le: Uint8Array, signed = false): number {
  if (le.length > 4) {
    throw new Error(`Got TypedArray of length ${le.length} for a number`);
  }
  const long = Long.fromBytesLE([...le], !signed);
  return long.toNumber();
}

export function littleEndianToLong(le: Uint8Array, signed = false): Long {
  if (le.length > 8) {
    throw new Error(`Got TypedArray of length ${le.length} for a Long`);
  }
  const long = Long.fromBytesLE([...le], !signed);
  return long;
}
