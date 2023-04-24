import { Reader } from "./reader.ts";
import { assertEquals } from "https://deno.land/std@0.184.0/testing/asserts.ts";

Deno.test("basic reader has length 0", () => {
  const reader = Reader.create(new Uint8Array(0));
  assertEquals(reader.len, 0);
});

Deno.test("Reader", async (t) => {
  await t.step("skip", async (tt) => {
    await tt.step("handles varints", () => {
      const reader = Reader.create(
        new Uint8Array([0x80, 0x82, 0x03, 0x80, 0x01])
      );
      assertEquals(reader.pos, 0, "reader starts at 0");
      reader.skip();
      assertEquals(reader.pos, 3, "reader skipped varint");
    });
    await tt.step("0", () => {
      const reader = Reader.create(
        new Uint8Array([0x80, 0x82, 0x03, 0x80, 0x01])
      );
      assertEquals(reader.pos, 0, "reader starts at 0");
      reader.skip(0);
      assertEquals(reader.pos, 0, "reader skipped nothing");
    });
    await tt.step("4", () => {
      const reader = Reader.create(
        new Uint8Array([0x80, 0x82, 0x03, 0x80, 0x01])
      );
      assertEquals(reader.pos, 0, "reader starts at 0");
      reader.skip(4);
      assertEquals(reader.pos, 4, "reader skipped 4 bytes");
    });
    await tt.step("len+2", () => {
      const reader = Reader.create(
        new Uint8Array([0x80, 0x82, 0x03, 0x80, 0x01])
      );
      assertEquals(reader.pos, 0, "reader starts at 0");
      reader.skip(7);
      assertEquals(reader.pos, 5, "reader skipped 5 bytes");
    });
  });
});
