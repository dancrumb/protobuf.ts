import { assertEquals } from "https://deno.land/std@0.184.0/testing/asserts.ts";

export const assertUint8ArraysEqual = (
  first: Uint8Array | unknown[],
  second: Uint8Array | unknown[],
) => {
  assertEquals(first.length, second.length, "Uint8Array lengths");
  first.every((value, index) => {
    assertEquals(value, second[index], `Array pos ${index}`);
    return value === second[index];
  });
};
