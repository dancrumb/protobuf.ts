import { assertEquals } from "https://deno.land/std@0.184.0/testing/asserts.ts";
import { zigZagEncode, zigZagDecode } from "./zig-zag-encoding.ts";
import { Long } from "./deps.ts";
import { assertLongEquals } from "./assert-long-equals.ts";

Deno.test("zigZagEncode", async (t) => {
  await t.step("0", () => assertEquals(zigZagEncode(0), 0));
  await t.step("-0", () => assertEquals(zigZagEncode(-0), 0));
  await t.step("-1", () => assertEquals(zigZagEncode(-1), 1));
  await t.step("1", () => assertEquals(zigZagEncode(1), 2));
  await t.step("-2", () => assertEquals(zigZagEncode(-2), 3));
  await t.step("2", () => assertEquals(zigZagEncode(2), 4));
  await t.step("-3", () => assertEquals(zigZagEncode(-3), 5));
  await t.step("0x7fffffff", () =>
    assertLongEquals(
      zigZagEncode(Long.fromValue("0x7fffffff", true)),
      "0xfffffffe",
      "0xfffffffe"
    )
  );

  await t.step("-0x80000000", () =>
    assertLongEquals(
      zigZagEncode(Long.fromValue("-0x80000000", true)),
      "0xffffffff",
      "0xffffffff"
    )
  );
});

Deno.test("zigZagDecode", async (t) => {
  await t.step("0", () => assertEquals(zigZagDecode(0), 0));
  await t.step("-1", () => assertEquals(zigZagDecode(1), -1));
  await t.step("1", () => assertEquals(zigZagDecode(2), 1));
  await t.step("-2", () => assertEquals(zigZagDecode(3), -2));
  await t.step("2", () => assertEquals(zigZagDecode(4), 2));
  await t.step("-3", () => assertEquals(zigZagDecode(5), -3));
  await t.step("0x7fffffff", () =>
    assertLongEquals(
      zigZagDecode(Long.fromValue("0xfffffffe", true)),
      "0x7fffffff",
      "0x7fffffff"
    )
  );

  await t.step("0xffffffff", () =>
    assertLongEquals(
      zigZagDecode(Long.fromValue("0xffffffff", true)),
      "-0x80000000",
      "-0x80000000"
    )
  );
});
