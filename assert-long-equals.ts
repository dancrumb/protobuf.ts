import { assert } from "https://deno.land/std@0.184.0/testing/asserts.ts";
import { Long } from "./deps.ts";

export const assertLongEquals = (
  a: Long | number | string,
  b: Long | number | string
) => {
  const aLong = a instanceof Long ? a : Long.fromValue(a);
  const bLong = b instanceof Long ? b : Long.fromValue(b);

  return assert(aLong.equals(bLong), `expected: ${aLong}, got: ${bLong}`);
};
