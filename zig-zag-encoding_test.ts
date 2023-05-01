import { assertEquals } from "https://deno.land/std@0.184.0/testing/asserts.ts";
import { zigZagDecode, zigZagEncode } from "./zig-zag-encoding.ts";
import { assertLongEquals } from "./assert-long-equals.ts";
import { Long } from "./deps.ts";

Deno.test("zigZagEncode", async (t) => {
  await t.step("0", () => assertEquals(zigZagEncode(0), 0));
  await t.step("-0", () => assertEquals(zigZagEncode(-0), 0));
  await t.step("-1", () => assertEquals(zigZagEncode(-1), 1));
  await t.step("1", () => assertEquals(zigZagEncode(1), 2));
  await t.step("-2", () => assertEquals(zigZagEncode(-2), 3));
  await t.step("2", () => assertEquals(zigZagEncode(2), 4));
  await t.step("-3", () => assertEquals(zigZagEncode(-3), 5));
  await t.step(
    "0x7fffffff encodes to 0xfffffffe",
    () => assertLongEquals(zigZagEncode("0x7fffffff"), "0xfffffffe"),
  );

  await t.step(
    "-0x7fffffff encodes to 0xfffffffd",
    () => assertLongEquals(zigZagEncode("-0x7fffffff"), "0xfffffffd"),
  );
  await t.step(
    "1L encodes to 2L",
    () => assertLongEquals(zigZagEncode(Long.fromValue(1)), Long.fromValue(2)),
  );

  await t.step(
    "-1L encodes to 1L",
    () => assertLongEquals(zigZagEncode(Long.fromValue(-1)), Long.fromValue(1)),
  );
});

Deno.test("zigZagDecode", async (t) => {
  await t.step("0", () => assertEquals(zigZagDecode(0), 0));
  await t.step("-1", () => assertEquals(zigZagDecode(1), -1));
  await t.step("1", () => assertEquals(zigZagDecode(2), 1));
  await t.step("-2", () => assertEquals(zigZagDecode(3), -2));
  await t.step("2", () => assertEquals(zigZagDecode(4), 2));
  await t.step("-3", () => assertEquals(zigZagDecode(5), -3));
  await t.step("0xfffffffe -> 0x7fffffff", () => {
    assertLongEquals(zigZagDecode("0xfffffffe"), "0x7fffffff");
  });

  await t.step("0xffffffff -> -0x80000000", () => {
    assertLongEquals(zigZagDecode("0xffffffff"), "-0x80000000");
  });
  await t.step("2L decodes to 1L", () =>
    assertLongEquals(
      zigZagDecode(Long.fromValue(2, true)),
      Long.fromValue(1, true),
    ));

  await t.step("1L decodes to -1L", () =>
    assertLongEquals(
      zigZagDecode(Long.fromValue(1, true)),
      Long.fromValue(-1, true),
    ));
});
