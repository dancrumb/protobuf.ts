import { assertUint8ArraysEqual } from "./assert-uint8-arrays-equal.ts";
import { numberToBigEndian, removeExtraneousZeroes } from "./endianness.ts";

Deno.test("handles 0", () => {
  const numberArray = numberToBigEndian(0);
  assertUint8ArraysEqual(numberArray, new Uint8Array([0]));
});

Deno.test("handles 1", () => {
  const numberArray = numberToBigEndian(1);
  assertUint8ArraysEqual(numberArray, new Uint8Array([1]));
});

Deno.test("handles 0xFF", () => {
  const numberArray = numberToBigEndian(0xff);
  assertUint8ArraysEqual(numberArray, new Uint8Array([0xff]));
});

Deno.test("handles 0x1FF", () => {
  const numberArray = numberToBigEndian(0x1ff);
  console.log({ numberArray });
  assertUint8ArraysEqual(numberArray, new Uint8Array([0x1, 0xff]));
});

Deno.test("handles 0xFFF", () => {
  const numberArray = numberToBigEndian(0xfff);
  assertUint8ArraysEqual(numberArray, new Uint8Array([0xf, 0xff]));
});

Deno.test("handles 0x1FFFF", () => {
  const numberArray = numberToBigEndian(0x1ffff);
  assertUint8ArraysEqual(numberArray, new Uint8Array([0x00, 0x01, 0xff, 0xff]));
});

Deno.test("handles 0x123456", () => {
  const numberArray = numberToBigEndian(0x123456);
  assertUint8ArraysEqual(numberArray, new Uint8Array([0x00, 0x12, 0x34, 0x56]));
});

Deno.test("handles 0xCAAC", () => {
  const numberArray = numberToBigEndian(0xcaac);
  assertUint8ArraysEqual(numberArray, new Uint8Array([0b11001010, 0b10101100]));
});

Deno.test("handles 150", () => {
  const numberArray = numberToBigEndian(150);
  assertUint8ArraysEqual(numberArray, new Uint8Array([150]));
});

Deno.test("removeExtraneousZeroes: 0", () => {
  assertUint8ArraysEqual(removeExtraneousZeroes([1]), [1]);
});
Deno.test("removeExtraneousZeroes: 0x0100", () => {
  assertUint8ArraysEqual(removeExtraneousZeroes([0x01, 0x00]), [0x01]);
});
Deno.test("removeExtraneousZeroes: 0x0102", () => {
  assertUint8ArraysEqual(removeExtraneousZeroes([0x01, 0x02]), [0x01, 0x02]);
});
