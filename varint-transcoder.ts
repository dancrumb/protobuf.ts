import { Long } from "./deps.ts";

/**
 * Converts a number to binary128, returning the LSB first and then ever more significant bytes
 *
 */
function* encoder(littleEndian: Uint8Array) {
  let long = Long.fromValue(Long.fromBytesLE(Array.from(littleEndian), true));
  let byte = 0;
  while (true) {
    byte = long.and(0x7f).toInt();
    long = long.shiftRightUnsigned(7);
    if (long.ne(0)) {
      yield byte;
    } else {
      return byte;
    }
  }
}

function decoder(varint: Uint8Array) {
  const bytes = varint.values();
  let currentValue = 0;
  let bitCount = 0;
  let bytesRead = 0;
  const byteArray: number[] = [];
  while (true) {
    const { value, done } = bytes.next();
    bytesRead++;
    const continuation = (value & 0x80) !== 0;
    if (done && continuation) {
      throw new Error("Reached end of array, but continuation bit is set");
    }
    currentValue = currentValue | ((value & 0x7f) << bitCount);
    bitCount += 7;
    if (bitCount >= 8 || continuation === false) {
      const newByte = currentValue & 0xff;
      byteArray.push(newByte);
      currentValue >>>= 8;
      bitCount -= 8;
    }
    if (continuation === false) {
      return {
        bytesRead,
        value: Uint8Array.from(byteArray),
      };
    }
  }
}

export const littleEndianToVarint = (littleEndian: Uint8Array): Uint8Array => {
  const bytes = encoder(littleEndian);
  let byte;
  const result: number[] = [];
  do {
    byte = bytes.next();
    result.push(byte.value | (byte.done ? 0 : 0x80));
  } while (!byte.done);

  return Uint8Array.from(result);
};

export const varintToLittleEndian = (
  varint: Uint8Array
): { value: Uint8Array; bytesRead: number } => {
  return decoder(varint);
};
