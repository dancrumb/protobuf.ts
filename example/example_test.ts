import { ExampleMessage } from "./example.ts";
import { Long } from "../deps.ts";
import {
  assertEquals,
  assertInstanceOf,
} from "https://deno.land/std@0.184.0/testing/asserts.ts";
import { assertLongEquals } from "../assert-long-equals.ts";

const example: ExampleMessage = {
  myIntPos: 1,
  myIntNeg: -1,
  myLongPos: Long.fromValue(1),
  myLongNeg: Long.fromValue(-1),
  myUint: 1,
  myUlong: Long.fromValue(1, false),
  mySintPos: 1,
  mySintNeg: -1,
  mySlongPos: Long.fromValue(1),
  mySlongNeg: Long.fromValue(-1),
  myFixed32: 1,
  myFixed64: Long.fromValue(1),
  mySfixed32Pos: 1,
  mySfixed32Neg: -1,
  mySfixed64Pos: Long.fromValue(1),
  mySfixed64Neg: Long.fromValue(-1),
  myFloat: 0.5,
  myDouble: 0.5,
  myBool: true,
  myString: "testing",
  myBytes: new Uint8Array([1, 2, 3]),
  myRepeatedFixed32: [1, 2, 3],
  myRepeatedUint: [3, 2, 1],
  myRepeatedLong: [
    Long.fromValue(1, false),
    Long.fromValue(2, false),
    Long.fromValue(3, false),
  ],
};

const encoded = ExampleMessage.encode(example).finish();

console.log(
  encoded
    .toString()
    .split(",")
    .map((s) => parseInt(s, 10).toString(16))
    .map((s) => s.padStart(2, "0"))
    .join("")
);

const decoded = ExampleMessage.decode(encoded);

Deno.test("compare decoded to original", async (t) => {
  await Object.keys(example).reduce(async (previous, key) => {
    await previous;
    return t.step(`compare ${key}`, () => {
      const actual = decoded[key as keyof ExampleMessage];
      const expected = example[key as keyof ExampleMessage];
      if (expected instanceof Long) {
        assertInstanceOf(actual, Long);
        assertLongEquals(actual, expected);
      } else {
        assertEquals(actual, expected);
      }
    });
  }, Promise.resolve(true));
});
