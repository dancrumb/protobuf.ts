import { assert } from "https://deno.land/std@0.184.0/testing/asserts.ts";
import { Long } from "./deps.ts";

export const assertLongEquals = (
  actual: Long | number | string,
  expected: Long | number | string,
) => {
  const aLong = expected instanceof Long ? expected : Long.fromValue(expected);
  const bLong = actual instanceof Long ? actual : Long.fromValue(actual);

  return assert(aLong.equals(bLong), `expected: ${aLong}, got: ${bLong}`);
};
