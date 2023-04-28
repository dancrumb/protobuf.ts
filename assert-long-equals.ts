import { assert } from "https://deno.land/std@0.184.0/testing/asserts.ts";
import { Long } from "./deps.ts";
import { getLongFromString } from "./get-long-from-string.ts";

export const assertLongEquals = (
  a: Long | number | string,
  b: Long | number | string,
  message: string,
  signed = false
) => {
  const aLong =
    typeof a === "string" ? getLongFromString(a, signed) : Long.fromValue(a);
  const bLong =
    typeof b === "string" ? getLongFromString(b, signed) : Long.fromValue(b);

  return assert(aLong.equals(bLong), message);
};
