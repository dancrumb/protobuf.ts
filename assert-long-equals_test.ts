import { assertThrows } from "https://deno.land/std@0.184.0/testing/asserts.ts";
import { Long } from "./deps.ts";
import { assertLongEquals } from "./assert-long-equals.ts";

Deno.test("assertLongEquals", async (t) => {
  await t.step("0===0", () => {
    assertLongEquals(Long.fromValue(0), Long.fromValue(0));
    assertLongEquals(0, 0);
    assertLongEquals("0", "0");
  });
  await t.step("1!==0", () => {
    assertThrows(() => assertLongEquals(Long.fromValue(1), Long.fromValue(0)));
    assertThrows(() => assertLongEquals(1, 0));
    assertThrows(() => assertLongEquals("1", "0"));
  });
  await t.step("0!==1", () => {
    assertThrows(() => assertLongEquals(Long.fromValue(0), Long.fromValue(1)));
    assertThrows(() => assertLongEquals(0, 1));
    assertThrows(() => assertLongEquals("0", "1"));
  });
});
