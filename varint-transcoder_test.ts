import {
  littleEndianToVarint,
  varintToLittleEndian,
} from "./varint-transcoder.ts";
import { assertUint8ArraysEqual } from "./assert-uint8-arrays-equal.ts";

Deno.test("littleEndianToVarint", async (t) => {
  await t.step("150 (from the docs)", () => {
    const varint = littleEndianToVarint(new Uint8Array([150]));
    assertUint8ArraysEqual(varint, new Uint8Array([0x96, 0x01]));
  });

  await t.step("0", () => {
    const varint = littleEndianToVarint(new Uint8Array([0]));
    assertUint8ArraysEqual(varint, new Uint8Array([0]));
  });

  await t.step("1", () => {
    const varint = littleEndianToVarint(new Uint8Array([1]));
    assertUint8ArraysEqual(varint, new Uint8Array([1]));
  });

  await t.step("0x80", () => {
    const varint = littleEndianToVarint(new Uint8Array([0x80]));
    assertUint8ArraysEqual(varint, new Uint8Array([0x80, 0x01]));
  });

  await t.step("0x8000", () => {
    const varint = littleEndianToVarint(new Uint8Array([0x00, 0x80]));
    assertUint8ArraysEqual(varint, new Uint8Array([0x80, 0x80, 0x02]));
  });

  await t.step("0x800000", () => {
    const varint = littleEndianToVarint(new Uint8Array([0x00, 0x00, 0x80]));
    assertUint8ArraysEqual(varint, new Uint8Array([0x80, 0x80, 0x80, 0x04]));
  });

  await t.step("0x80000000", () => {
    const varint = littleEndianToVarint(
      new Uint8Array([0x00, 0x00, 0x00, 0x80])
    );
    assertUint8ArraysEqual(
      varint,
      new Uint8Array([0x80, 0x80, 0x80, 0x80, 0x08])
    );
  });
});

Deno.test("varintToLittleEndian", async (t) => {
  await t.step("150 (from the docs)", () => {
    const { value: littleEndian } = varintToLittleEndian(
      new Uint8Array([0x96, 0x01])
    );

    assertUint8ArraysEqual(littleEndian, new Uint8Array([150]));
  });

  await t.step("0", () => {
    const { value: littleEndian } = varintToLittleEndian(new Uint8Array([0]));

    assertUint8ArraysEqual(littleEndian, new Uint8Array([0]));
  });

  await t.step("1", () => {
    const { value: littleEndian } = varintToLittleEndian(new Uint8Array([1]));
    assertUint8ArraysEqual(littleEndian, new Uint8Array([1]));
  });

  await t.step("0x80", () => {
    const { value: littleEndian } = varintToLittleEndian(
      new Uint8Array([0x80, 0x01])
    );
    assertUint8ArraysEqual(littleEndian, new Uint8Array([0x80]));
  });

  await t.step("0x8000", () => {
    const { value: littleEndian } = varintToLittleEndian(
      new Uint8Array([0x80, 0x80, 0x02])
    );

    assertUint8ArraysEqual(littleEndian, new Uint8Array([0x00, 0x80]));
  });

  await t.step("0x800000", () => {
    const { value: littleEndian } = varintToLittleEndian(
      new Uint8Array([0x80, 0x80, 0x80, 0x04])
    );

    assertUint8ArraysEqual(littleEndian, new Uint8Array([0x00, 0x00, 0x80]));
  });

  await t.step("0x80000000", () => {
    const { value: littleEndian } = varintToLittleEndian(
      new Uint8Array([0x80, 0x80, 0x80, 0x80, 0x08])
    );

    assertUint8ArraysEqual(
      littleEndian,
      new Uint8Array([0x00, 0x00, 0x00, 0x80])
    );
  });
});
