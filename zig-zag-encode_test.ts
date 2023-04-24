import { assertEquals } from "https://deno.land/std@0.184.0/testing/asserts.ts";
import { zigZagEncode } from "./zig-zag-encode.ts";
import { Long } from "./deps.ts";
import { assertLongEquals } from "./assert-long-equals.ts";

Deno.test("0", () => assertEquals(zigZagEncode(0), 0));
Deno.test("-1", () => assertEquals(zigZagEncode(-1), 1));
Deno.test("1", () => assertEquals(zigZagEncode(1), 2));
Deno.test("-2", () => assertEquals(zigZagEncode(-2), 3));
Deno.test("2", () => assertEquals(zigZagEncode(2), 4));
Deno.test("-3", () => assertEquals(zigZagEncode(-3), 5));
Deno.test("0x7fffffff", () =>
  assertLongEquals(
    zigZagEncode(Long.fromValue("0x7fffffff", true)),
    "0xfffffffe",
    "0xfffffffe",
  ));

Deno.test("-0x80000000", () =>
  assertLongEquals(
    zigZagEncode(Long.fromValue("-0x80000000", true)),
    "0xffffffff",
    "0xffffffff",
  ));
