import { assertArrayEquals } from "./assert-array-equals.ts";
import { assertLongEquals } from "./assert-long-equals.ts";
import { Reader } from "./reader.ts";
import {
  assertEquals,
  assertAlmostEquals,
} from "https://deno.land/std@0.184.0/testing/asserts.ts";

Deno.test("basic reader has length 0", () => {
  const reader = Reader.create(new Uint8Array(0));
  assertEquals(reader.len, 0);
});

Deno.test("Reader", async (t) => {
  await t.step("Reader.skip()", async (tt) => {
    await tt.step("handles varints", () => {
      const reader = Reader.create(
        new Uint8Array([0x80, 0x82, 0x03, 0x80, 0x01])
      );
      assertEquals(reader.pos, 0, "reader starts at 0");
      reader.skip();
      assertEquals(reader.pos, 3, "reader skipped varint");
    });
    await tt.step("handles skip length of 0", () => {
      const reader = Reader.create(
        new Uint8Array([0x80, 0x82, 0x03, 0x80, 0x01])
      );
      assertEquals(reader.pos, 0, "reader starts at 0");
      reader.skip(0);
      assertEquals(reader.pos, 0, "reader skipped nothing");
    });
    await tt.step("skip(4)", () => {
      const reader = Reader.create(
        new Uint8Array([0x80, 0x82, 0x03, 0x80, 0x01])
      );
      assertEquals(reader.pos, 0, "reader starts at 0");
      reader.skip(4);
      assertEquals(reader.pos, 4, "reader skipped 4 bytes");
    });
    await tt.step("skip(len+2)", () => {
      const reader = Reader.create(
        new Uint8Array([0x80, 0x82, 0x03, 0x80, 0x01])
      );
      assertEquals(reader.pos, 0, "reader starts at 0");
      reader.skip(7);
      assertEquals(reader.pos, 5, "reader skipped 5 bytes");
    });
  });

  await t.step("Reader.uint32()", async (tt) => {
    await tt.step("uint32 is 0", () => {
      const reader = Reader.create(new Uint8Array([0x00]));
      const uint32 = reader.uint32();
      assertEquals(reader.pos, 1);
      assertEquals(uint32, 0);
    });
    await tt.step("uint32 is 1", () => {
      const reader = Reader.create(new Uint8Array([0x01]));
      const uint32 = reader.uint32();
      assertEquals(reader.pos, 1);
      assertEquals(uint32, 1);
    });
    await tt.step("uint32 is 512", () => {
      const reader = Reader.create(new Uint8Array([0x80, 0x04]));
      const uint32 = reader.uint32();
      assertEquals(reader.pos, 2);
      assertEquals(uint32, 512);
    });
  });

  await t.step("Reader.int32()", async (tt) => {
    await tt.step("int32 is 0", () => {
      const reader = Reader.create(new Uint8Array([0x00]));
      const uint32 = reader.int32();
      assertEquals(reader.pos, 1);
      assertEquals(uint32, 0);
    });
    await tt.step("int32 is 1", () => {
      const reader = Reader.create(new Uint8Array([0x01]));
      const uint32 = reader.int32();
      assertEquals(reader.pos, 1);
      assertEquals(uint32, 1);
    });
    await tt.step("int32 is 512", () => {
      const reader = Reader.create(new Uint8Array([0x80, 0x04]));
      const uint32 = reader.int32();
      assertEquals(reader.pos, 2);
      assertEquals(uint32, 512);
    });
  });

  await t.step("Reader.sint32()", async (tt) => {
    await tt.step("sint32 is 0", () => {
      const reader = Reader.create(new Uint8Array([0x00]));
      const sint32 = reader.sint32();
      assertEquals(reader.pos, 1);
      assertEquals(sint32, 0);
    });
    await tt.step("sint32 is 1", () => {
      const reader = Reader.create(new Uint8Array([0x02]));
      const sint32 = reader.sint32();
      assertEquals(reader.pos, 1);
      assertEquals(sint32, 1);
    });
    await tt.step("sint32 is 512", () => {
      const reader = Reader.create(new Uint8Array([0x80, 0x08]));
      const sint32 = reader.sint32();
      assertEquals(reader.pos, 2);
      assertEquals(sint32, 512);
    });
    await tt.step("sint32 is -1", () => {
      const reader = Reader.create(new Uint8Array([0x01]));
      const sint32 = reader.sint32();
      assertEquals(reader.pos, 1);
      assertEquals(sint32, -1);
    });
    await tt.step("sint32 is -512", () => {
      const reader = Reader.create(new Uint8Array([0xff, 0x7]));
      const sint32 = reader.sint32();
      assertEquals(reader.pos, 2);
      assertEquals(sint32, -512);
    });
  });

  await t.step("Reader.uint64()", async (tt) => {
    await tt.step("uint64 is 0", () => {
      const reader = Reader.create(new Uint8Array([0x00]));
      const uint64 = reader.uint64();
      assertEquals(reader.pos, 1);
      assertLongEquals(uint64, 0);
    });
    await tt.step("uint64 is 1", () => {
      const reader = Reader.create(new Uint8Array([0x01]));
      const uint64 = reader.uint64();
      assertEquals(reader.pos, 1);
      assertLongEquals(uint64, 1);
    });
    await tt.step("uint64 is 512", () => {
      const reader = Reader.create(new Uint8Array([0x80, 0x04]));
      const uint64 = reader.uint64();
      assertEquals(reader.pos, 2, "Buffer position");
      assertLongEquals(uint64, 512);
    });
    await tt.step("uint64 is 0x1234567890", () => {
      const reader = Reader.create(
        new Uint8Array([0x90, 0xf1, 0xd9, 0xa2, 0xa3, 0x02])
      );
      const uint64 = reader.uint64();
      assertEquals(reader.pos, 6, "Buffer position");
      assertLongEquals(uint64, 0x1234567890);
    });
  });

  await t.step("Reader.int64()", async (tt) => {
    await tt.step("int64 is 0", () => {
      const reader = Reader.create(new Uint8Array([0x00]));
      const int64 = reader.int64();
      assertEquals(reader.pos, 1);
      assertLongEquals(int64, 0);
    });
    await tt.step("int64 is 1", () => {
      const reader = Reader.create(new Uint8Array([0x01]));
      const int64 = reader.int64();
      assertEquals(reader.pos, 1);
      assertLongEquals(int64, 1);
    });
    await tt.step("int64 is 512", () => {
      const reader = Reader.create(new Uint8Array([0x80, 0x04]));
      const int64 = reader.int64();
      assertEquals(reader.pos, 2, "Buffer position");
      assertLongEquals(int64, 512);
    });
    await tt.step("int64 is 0x1234567890", () => {
      const reader = Reader.create(
        new Uint8Array([0x90, 0xf1, 0xd9, 0xa2, 0xa3, 0x02])
      );
      const int64 = reader.int64();
      assertEquals(reader.pos, 6, "Buffer position");
      assertLongEquals(int64, 0x1234567890);
    });
  });

  await t.step("Reader.sint64()", async (tt) => {
    await tt.step("sint64 is 0", () => {
      const reader = Reader.create(new Uint8Array([0x00]));
      const sint64 = reader.sint64();
      assertEquals(reader.pos, 1);
      assertLongEquals(sint64, 0);
    });
    await tt.step("sint64 is 1", () => {
      const reader = Reader.create(new Uint8Array([0x02]));
      const sint64 = reader.sint64();
      assertEquals(reader.pos, 1);
      assertLongEquals(sint64, 1);
    });
    await tt.step("sint64 is 512", () => {
      const reader = Reader.create(new Uint8Array([0x80, 0x08]));
      const sint64 = reader.sint64();
      assertEquals(reader.pos, 2, "Buffer position");
      assertLongEquals(sint64, 512);
    });
    await tt.step("sint64 is 0x1234567890", () => {
      const reader = Reader.create(
        new Uint8Array([0xa0, 0xe2, 0xb3, 0xc5, 0xc6, 0x04])
      );
      const sint64 = reader.sint64();
      assertEquals(reader.pos, 6, "Buffer position");
      assertLongEquals(sint64, 0x1234567890);
    });

    await tt.step("sint64 is -1", () => {
      const reader = Reader.create(new Uint8Array([0x01]));
      const sint64 = reader.sint64();
      assertEquals(reader.pos, 1);
      assertLongEquals(sint64, -1);
    });
    await tt.step("sint64 is -512", () => {
      const reader = Reader.create(new Uint8Array([0xff, 0x07]));
      const sint64 = reader.sint64();
      assertEquals(reader.pos, 2, "Buffer position");
      assertLongEquals(sint64, -512);
    });
    await tt.step("sint64 is -0x1234567890", () => {
      const reader = Reader.create(
        new Uint8Array([0x9f, 0xe2, 0xb3, 0xc5, 0xc6, 0x04])
      );
      const sint64 = reader.sint64();
      assertEquals(reader.pos, 6, "Buffer position");
      assertLongEquals(sint64, -0x1234567890);
    });
  });

  await t.step("Reader.bool()", async (tt) => {
    await tt.step("true", () => {
      const reader = Reader.create(new Uint8Array([0x01]));
      const bool = reader.bool();
      assertEquals(reader.pos, 1);
      assertEquals(bool, true);
    });
    await tt.step("false", () => {
      const reader = Reader.create(new Uint8Array([0x00]));
      const bool = reader.bool();
      assertEquals(reader.pos, 1);
      assertEquals(bool, false);
    });
  });

  await t.step("Reader.fixed32()", async (tt) => {
    await tt.step("0", () => {
      const reader = Reader.create(new Uint8Array([0x00, 0x00, 0x00, 0x00]));
      const fixed32 = reader.fixed32();
      assertEquals(reader.pos, 4);
      assertEquals(fixed32, 0);
    });
    await tt.step("1", () => {
      const reader = Reader.create(new Uint8Array([0x01, 0x00, 0x00, 0x00]));
      const fixed32 = reader.fixed32();
      assertEquals(reader.pos, 4);
      assertEquals(fixed32, 1);
    });
  });

  await t.step("Reader.sfixed32()", async (tt) => {
    await tt.step("0", () => {
      const reader = Reader.create(new Uint8Array([0x00, 0x00, 0x00, 0x00]));
      const sfixed32 = reader.sfixed32();
      assertEquals(reader.pos, 4);
      assertEquals(sfixed32, 0);
    });
    await tt.step("1", () => {
      const reader = Reader.create(new Uint8Array([0x02, 0x00, 0x00, 0x00]));
      const sfixed32 = reader.sfixed32();
      assertEquals(reader.pos, 4);
      assertEquals(sfixed32, 1);
    });
    await tt.step("-1", () => {
      const reader = Reader.create(new Uint8Array([0x01, 0x00, 0x00, 0x00]));
      const sfixed32 = reader.sfixed32();
      assertEquals(reader.pos, 4);
      assertEquals(sfixed32, -1);
    });
  });

  await t.step("Reader.fixed64()", async (tt) => {
    await tt.step("0", () => {
      const reader = Reader.create(
        new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])
      );
      const fixed64 = reader.fixed64();
      assertEquals(reader.pos, 8);
      assertLongEquals(fixed64, 0);
    });
    await tt.step("1", () => {
      const reader = Reader.create(
        new Uint8Array([0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])
      );
      const fixed64 = reader.fixed64();
      assertEquals(reader.pos, 8);
      assertLongEquals(fixed64, 1);
    });
  });

  await t.step("Reader.sfixed64()", async (tt) => {
    await tt.step("0", () => {
      const reader = Reader.create(
        new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])
      );
      const sfixed64 = reader.sfixed64();
      assertEquals(reader.pos, 8);
      assertLongEquals(sfixed64, 0);
    });
    await tt.step("1", () => {
      const reader = Reader.create(
        new Uint8Array([0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])
      );
      const sfixed64 = reader.sfixed64();
      assertEquals(reader.pos, 8);
      assertLongEquals(sfixed64, 1);
    });
    await tt.step("-1", () => {
      const reader = Reader.create(
        new Uint8Array([0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])
      );
      const sfixed64 = reader.sfixed64();
      assertEquals(reader.pos, 8);
      assertLongEquals(sfixed64, -1);
    });
  });

  await t.step("Reader.bytes()", async (tt) => {
    await tt.step("empty", () => {
      const reader = Reader.create(new Uint8Array([0x00]));
      const bytes = reader.bytes();
      assertEquals(reader.pos, 1);
      assertArrayEquals([], [...bytes]);
    });
    await tt.step("1 byte", () => {
      const reader = Reader.create(new Uint8Array([0x01, 0xad]));
      const bytes = reader.bytes();
      assertEquals(reader.pos, 2);
      assertArrayEquals([0xad], [...bytes]);
    });
    await tt.step("1 byte with additional bytes following", () => {
      const reader = Reader.create(new Uint8Array([0x01, 0xad, 0xff]));
      const bytes = reader.bytes();
      assertEquals(reader.pos, 2);
      assertArrayEquals([0xad], [...bytes]);
    });
  });

  await t.step("Reader.string()", async (tt) => {
    await tt.step('""', () => {
      const reader = Reader.create(new Uint8Array([0x00]));
      const string = reader.string();
      assertEquals(reader.pos, 1);
      assertEquals("", string);
    });
    await tt.step('"testing"', () => {
      const reader = Reader.create(
        new Uint8Array([0x07, 0x74, 0x65, 0x73, 0x74, 0x69, 0x6e, 0x67])
      );
      const string = reader.string();
      assertEquals(reader.pos, 8);
      assertEquals("testing", string);
    });
  });

  await t.step("double", async (tt) => {
    await tt.step("0", () => {
      const reader = Reader.create(
        new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])
      );
      const double = reader.double();
      assertEquals(double, 0);
    });

    await tt.step("1", () => {
      const reader = Reader.create(
        new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf0, 0x3f])
      );
      const double = reader.double();
      assertEquals(1, double);
    });
    await tt.step("0.0", () => {
      const reader = Reader.create(
        new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])
      );
      const double = reader.double();
      assertEquals(0, double);
    });
    await tt.step("1.0", () => {
      const reader = Reader.create(
        new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf0, 0x3f])
      );
      const double = reader.double();
      assertEquals(1, double);
    });
    await tt.step("0.25", () => {
      const reader = Reader.create(
        new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xd0, 0x3f])
      );
      const double = reader.double();
      assertEquals(0.25, double);
    });
    await tt.step("-0.25", () => {
      const reader = Reader.create(
        new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xd0, 0xbf])
      );
      const double = reader.double();
      assertEquals(-0.25, double);
    });
    await tt.step("1/3", () => {
      const reader = Reader.create(
        new Uint8Array([0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0xd5, 0x3f])
      );
      const double = reader.double();
      assertAlmostEquals(1 / 3, double);
    });
    await tt.step("π", () => {
      const reader = Reader.create(
        new Uint8Array(
          new Uint8Array(
            [0x40, 0x09, 0x21, 0xfb, 0x54, 0x44, 0x2d, 0x18].reverse()
          )
        )
      );
      const double = reader.double();
      assertAlmostEquals(Math.PI, double);
    });
  });

  await t.step("float", async (tt) => {
    await tt.step("0", () => {
      const reader = Reader.create(new Uint8Array([0x00, 0x00, 0x00, 0x00]));
      const float = reader.float();
      assertEquals(0, float);
    });
    await tt.step("1", () => {
      const reader = Reader.create(new Uint8Array([0x00, 0x00, 0x80, 0x3f]));
      const float = reader.float();
      assertEquals(1, float);
    });
    await tt.step("0.0", () => {
      const reader = Reader.create(new Uint8Array([0x00, 0x00, 0x00, 0x00]));
      const float = reader.float();
      assertEquals(0.0, float);
    });
    await tt.step("1.0", () => {
      const reader = Reader.create(new Uint8Array([0x00, 0x00, 0x80, 0x3f]));
      const float = reader.float();
      assertEquals(1.0, float);
    });
    await tt.step("0.25", () => {
      const reader = Reader.create(new Uint8Array([0x00, 0x00, 0x80, 0x3e]));
      const float = reader.float();
      assertEquals(0.25, float);
    });
    await tt.step("-0.25", () => {
      const reader = Reader.create(new Uint8Array([0x00, 0x00, 0x80, 0xbe]));
      const float = reader.float();
      assertEquals(-0.25, float);
    });
    await tt.step("1/3", () => {
      const reader = Reader.create(new Uint8Array([0xab, 0xaa, 0xaa, 0x3e]));
      const float = reader.float();
      assertAlmostEquals(float, 1 / 3);
    });
    await tt.step("π", () => {
      const reader = Reader.create(new Uint8Array([0xdb, 0x0f, 0x49, 0x40]));
      const float = reader.float();
      assertAlmostEquals(Math.PI, float);
    });
  });
});
