import { Long } from "./deps.ts";

/**
 * Encode a signed number or Long using zig-zag encoding
 */
export function zigZagEncode(n: number | Long | string): typeof n {
  if (typeof n === "number") {
    return n < 0 ? (-n << 1) - 1 : n << 1;
  }
  const long = Long.fromValue(n);
  return long.isNegative()
    ? long.negate().shiftLeft(1).subtract(1)
    : long.shiftLeft(1);
}
