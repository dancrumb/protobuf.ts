import { assertEquals } from "https://deno.land/std@0.184.0/testing/asserts.ts";

export const assertArrayEquals = <T extends unknown>(
  expected: T[],
  actual: T[],
) => {
  assertEquals(
    actual.length,
    expected.length,
    `expected.length = ${expected.length}; actual.length = ${actual.length}`,
  );
  for (let i = 0; i++; i < expected.length) {
    assertEquals(
      actual[i],
      expected[i],
      `Values at position ${i} do not match`,
    );
  }
};
