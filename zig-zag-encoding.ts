import { Long } from "./deps.ts";
import { getLongFromString } from "./get-long-from-string.ts";

/**
 * Encode a signed number or Long using zig-zag encoding
 */
export function zigZagEncode(n: number | Long | string): typeof n {
  if (typeof n === "number") {
    return (n >> 31) ^ (n << 1);
  }
  let long: Long;
  if (typeof n === "string") {
    long = getLongFromString(n, true);
  } else {
    long = n;
  }
  return long.shiftRight(63).xor(long.shiftLeft(1));
}

export function zigZagDecode(n: number): number;
export function zigZagDecode(n: Long | string): Long;
export function zigZagDecode(n: number | Long | string): number | Long {
  if (typeof n === "number") {
    return (n >>> 1) ^ -(n & 1);
  }
  let long: Long;
  if (typeof n === "string") {
    long = getLongFromString(n, true);
  } else {
    long = n;
  }

  return long.shiftRightUnsigned(1).xor(long.and(1).negate()).toSigned();
}
