import { assert } from "https://deno.land/std@0.184.0/testing/asserts.ts";
import { Long } from "./deps.ts";

export const assertLongEquals = (
  a: Long | number | string,
  b: Long | number | string,
  message: string,
) => {
  return assert(Long.fromValue(a).equals(Long.fromValue(b)), message);
};
