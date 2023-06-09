import { Writer } from "./writer.ts";
import { assertEquals } from "https://deno.land/std@0.184.0/testing/asserts.ts";

const assertUint8ArraysEqual = (actual: Uint8Array, expect: Uint8Array) => {
  assertEquals(actual.length, expect.length, "Uint8Array lengths are equal");
  actual.every((value, index) => {
    assertEquals(value, expect[index], `Array pos ${index} are equal`);
    return value === expect[index];
  });
};

Deno.test("Writer", async (t) => {
  await t.step("basic writer has length 0", () => {
    const writer = Writer.create();
    assertEquals(writer.len, 0);
  });

  await t.step("uint32", async (tt) => {
    await tt.step("150", () => {
      const writer = Writer.create();
      const encoded = writer.uint32(150).finish();
      assertUint8ArraysEqual(encoded, new Uint8Array([0x96, 0x01]));
    });
  });

  await t.step("uint64", async (tt) => {
    await tt.step("0x1234567890", () => {
      const writer = Writer.create();
      const encoded = writer.uint64("0x1234567890").finish();
      assertUint8ArraysEqual(
        encoded,
        new Uint8Array([0x90, 0xf1, 0xd9, 0xa2, 0xa3, 0x02]),
      );
    });
  });

  await t.step("int64", async (tt) => {
    await tt.step("0x1234567890", () => {
      const writer = Writer.create();
      const encoded = writer.int64("0x1234567890").finish();
      assertUint8ArraysEqual(
        encoded,
        new Uint8Array([0x90, 0xf1, 0xd9, 0xa2, 0xa3, 0x02]),
      );
    });

    await tt.step("-150", () => {
      const writer = Writer.create();
      const encoded = writer.int64(-150).finish();
      assertUint8ArraysEqual(
        encoded,
        new Uint8Array([
          0xea,
          0xfe,
          0xff,
          0xff,
          0xff,
          0xff,
          0xff,
          0xff,
          0xff,
          0x01,
        ]),
      );
    });
  });

  await t.step("sint64", async (tt) => {
    await tt.step("0x1234567890", () => {
      const writer = Writer.create();
      const encoded = writer.sint64("0x1234567890").finish();
      assertUint8ArraysEqual(
        encoded,
        new Uint8Array([0xa0, 0xe2, 0xb3, 0xc5, 0xc6, 0x04]),
      );
    });
    await tt.step("-0x1234567890", () => {
      const writer = Writer.create();
      const encoded = writer.sint64("-0x1234567890").finish();
      assertUint8ArraysEqual(
        encoded,
        new Uint8Array([0x9f, 0xe2, 0xb3, 0xc5, 0xc6, 0x04]),
      );
    });
  });

  await t.step("int32", async (tt) => {
    await tt.step("150", () => {
      const writer = Writer.create();
      const encoded = writer.int32(150).finish();
      assertUint8ArraysEqual(encoded, new Uint8Array([0x96, 0x01]));
    });
    await tt.step("-150", () => {
      const writer = Writer.create();
      const encoded = writer.int32(-150).finish();
      assertUint8ArraysEqual(
        encoded,
        new Uint8Array([0xea, 0xfe, 0xff, 0xff, 0x0f]),
      );
    });
  });

  await t.step("boolean", async (tt) => {
    await tt.step("true", () => {
      const writer = Writer.create();
      const encoded = writer.bool(true).finish();
      assertUint8ArraysEqual(encoded, new Uint8Array([0x01]));
    });

    await tt.step("false", () => {
      const writer = Writer.create();
      const encoded = writer.bool(false).finish();
      assertUint8ArraysEqual(encoded, new Uint8Array([0x0]));
    });
  });

  await t.step("sint32", async (tt) => {
    await tt.step("-1", () => {
      const writer = Writer.create();
      const encoded = writer.sint32(-1).finish();
      assertUint8ArraysEqual(encoded, new Uint8Array([0x1]));
    });
    await tt.step("75", () => {
      const writer = Writer.create();
      const encoded = writer.sint32(75).finish();
      assertUint8ArraysEqual(encoded, new Uint8Array([0x96, 0x01]));
    });
  });

  await t.step("string", async (tt) => {
    await tt.step("'testing'", () => {
      const writer = Writer.create();
      const encoded = writer.string("testing").finish();
      assertUint8ArraysEqual(
        encoded,
        new Uint8Array([0x07, 0x74, 0x65, 0x73, 0x74, 0x69, 0x6e, 0x67]),
      );
    });
  });

  await t.step("fixed32", async (tt) => {
    await tt.step("0", () => {
      const writer = Writer.create();
      const encoded = writer.fixed32(0).finish();
      assertUint8ArraysEqual(encoded, new Uint8Array([0x00, 0x00, 0x00, 0x00]));
    });
    await tt.step("1", () => {
      const writer = Writer.create();
      const encoded = writer.fixed32(1).finish();
      assertUint8ArraysEqual(encoded, new Uint8Array([0x01, 0x00, 0x00, 0x00]));
    });
  });

  await t.step("sfixed32", async (tt) => {
    await tt.step("0", () => {
      const writer = Writer.create();
      const encoded = writer.sfixed32(0).finish();
      assertUint8ArraysEqual(encoded, new Uint8Array([0x00, 0x00, 0x00, 0x00]));
    });
    await tt.step("1", () => {
      const writer = Writer.create();
      const encoded = writer.sfixed32(1).finish();
      assertUint8ArraysEqual(encoded, new Uint8Array([0x02, 0x00, 0x00, 0x00]));
    });
    await tt.step("-1", () => {
      const writer = Writer.create();
      const encoded = writer.sfixed32(-1).finish();
      assertUint8ArraysEqual(encoded, new Uint8Array([0x01, 0x00, 0x00, 0x00]));
    });
  });
  await t.step("fixed64", async (tt) => {
    await tt.step("0", () => {
      const writer = Writer.create();
      const encoded = writer.fixed64(0).finish();
      assertUint8ArraysEqual(
        encoded,
        new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]),
      );
    });
    await tt.step("1", () => {
      const writer = Writer.create();
      const encoded = writer.fixed64(1).finish();
      assertUint8ArraysEqual(
        encoded,
        new Uint8Array([0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]),
      );
    });
  });

  await t.step("sfixed64", async (tt) => {
    await tt.step("0x1234567890", () => {
      const writer = Writer.create();
      const encoded = writer.sfixed64("0x1234567890").finish();
      assertUint8ArraysEqual(
        encoded,
        new Uint8Array([0x20, 0xf1, 0xac, 0x68, 0x24, 0x00, 0x00, 0x00]),
      );
    });
    await tt.step("-0x1234567890", () => {
      const writer = Writer.create();
      const encoded = writer.sfixed64("-0x1234567890").finish();
      assertUint8ArraysEqual(
        encoded,
        new Uint8Array([0x1f, 0xf1, 0xac, 0x68, 0x24, 0x00, 0x00, 0x00]),
      );
    });
  });

  await t.step("double", async (tt) => {
    await tt.step("0", () => {
      const writer = Writer.create();
      const encoded = writer.double(0).finish();
      assertUint8ArraysEqual(
        encoded,
        new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]),
      );
    });
    await tt.step("1", () => {
      const writer = Writer.create();
      const encoded = writer.double(1).finish();
      assertUint8ArraysEqual(
        encoded,
        new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf0, 0x3f]),
      );
    });
    await tt.step("0.0", () => {
      const writer = Writer.create();
      const encoded = writer.double(0).finish();
      assertUint8ArraysEqual(
        encoded,
        new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]),
      );
    });
    await tt.step("1.0", () => {
      const writer = Writer.create();
      const encoded = writer.double(1).finish();
      assertUint8ArraysEqual(
        encoded,
        new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf0, 0x3f]),
      );
    });
    await tt.step("0.25", () => {
      const writer = Writer.create();
      const encoded = writer.double(0.25).finish();
      assertUint8ArraysEqual(
        encoded,
        new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xd0, 0x3f]),
      );
    });
    await tt.step("-0.25", () => {
      const writer = Writer.create();
      const encoded = writer.double(-0.25).finish();
      assertUint8ArraysEqual(
        encoded,
        new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xd0, 0xbf]),
      );
    });
    await tt.step("1/3", () => {
      const writer = Writer.create();
      const encoded = writer.double(1 / 3).finish();
      assertUint8ArraysEqual(
        encoded,
        new Uint8Array([0x55, 0x55, 0x55, 0x55, 0x55, 0x55, 0xd5, 0x3f]),
      );
    });
    await tt.step("π", () => {
      const writer = Writer.create();
      const encoded = writer.double(Math.PI).finish();
      assertUint8ArraysEqual(
        encoded,
        new Uint8Array(
          [0x40, 0x09, 0x21, 0xfb, 0x54, 0x44, 0x2d, 0x18].reverse(),
        ),
      );
    });
  });
  await t.step("float", async (tt) => {
    await tt.step("0", () => {
      const writer = Writer.create();
      const encoded = writer.float(0).finish();
      assertUint8ArraysEqual(encoded, new Uint8Array([0x00, 0x00, 0x00, 0x00]));
    });
    await tt.step("1", () => {
      const writer = Writer.create();
      const encoded = writer.float(1).finish();
      assertUint8ArraysEqual(encoded, new Uint8Array([0x00, 0x00, 0x80, 0x3f]));
    });
    await tt.step("0.0", () => {
      const writer = Writer.create();
      const encoded = writer.float(0).finish();
      assertUint8ArraysEqual(encoded, new Uint8Array([0x00, 0x00, 0x00, 0x00]));
    });
    await tt.step("1.0", () => {
      const writer = Writer.create();
      const encoded = writer.float(1).finish();
      assertUint8ArraysEqual(encoded, new Uint8Array([0x00, 0x00, 0x80, 0x3f]));
    });
    await tt.step("0.25", () => {
      const writer = Writer.create();
      const encoded = writer.float(0.25).finish();
      assertUint8ArraysEqual(encoded, new Uint8Array([0x00, 0x00, 0x80, 0x3e]));
    });
    await tt.step("-0.25", () => {
      const writer = Writer.create();
      const encoded = writer.float(-0.25).finish();
      assertUint8ArraysEqual(encoded, new Uint8Array([0x00, 0x00, 0x80, 0xbe]));
    });
    await tt.step("1/3", () => {
      const writer = Writer.create();
      const encoded = writer.float(1 / 3).finish();
      assertUint8ArraysEqual(encoded, new Uint8Array([0xab, 0xaa, 0xaa, 0x3e]));
    });
    await tt.step("π", () => {
      const writer = Writer.create();
      const encoded = writer.float(Math.PI).finish();
      assertUint8ArraysEqual(encoded, new Uint8Array([0xdb, 0x0f, 0x49, 0x40]));
    });
  });

  await t.step("bytes", async (tt) => {
    await tt.step("[0,1,2]", () => {
      const writer = Writer.create();
      const encoded = writer.bytes(new Uint8Array([0, 1, 2])).finish();
      assertUint8ArraysEqual(encoded, new Uint8Array([0, 1, 2]));
    });
    await tt.step("'YWJj'", () => {
      const writer = Writer.create();
      const encoded = writer.bytes("YWJj").finish();
      assertUint8ArraysEqual(encoded, new Uint8Array([0x61, 0x62, 0x63]));
    });
  });
});
