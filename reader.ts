import { Long } from "./deps.ts";
import { littleEndianToLong, littleEndianToNumber } from "./endianness.ts";
import { varintToLittleEndian } from "./varint-transcoder.ts";
import { zigZagDecode } from "./zig-zag-encoding.ts";

enum WireType {
  VARINT = 0,
  I64 = 1,
  LEN = 2,
  SGROUP = 3,
  EGROUP = 4,
  I32 = 5,
}

const leIsSigned = (le: Uint8Array) => {
  const lastByte = le[le.length - 1];
  return (lastByte & 0x80) === 0x80;
};

/**
 * Protocol Buffer wire format reader
 *
 * Currently, this can only read from a Uint8Array buffer; future iterations will be able to read from a Stream
 */
export class Reader {
  private buf: Uint8Array;
  /**
   * Constructs a new reader instance using the specified buffer.
   * @param buffer Buffer to read from
   */
  private constructor(buf: Uint8Array) {
    this.buf = Uint8Array.from(buf);
  }

  private _pos = 0;

  /** Current buffer position. */
  get pos() {
    return this._pos;
  }

  /** Length of buffer */
  get len() {
    return this.buf.length;
  }

  /**
   * Creates a new reader using the specified buffer.
   * @param buffer Buffer to read from
   */
  public static create(buffer: Uint8Array): Reader {
    return new Reader(buffer);
  }

  private getSubBuffer(length: number) {
    const view = new DataView(this.buf.buffer, this.pos, length);
    this._pos += length;
    const buffer = new Uint8Array(length);
    for (let index = 0; index < length; index++) {
      buffer[index] = view.getUint8(index);
    }
    return buffer;
  }

  private getVarint(): Uint8Array {
    const { bytesRead, value } = varintToLittleEndian(
      this.buf.subarray(this._pos),
    );
    this._pos += bytesRead;
    return value;
  }

  /**
   * Reads a varint as an unsigned 32 bit value.
   * @returns Value read
   */
  public uint32(): number {
    const value = this.getVarint();

    return littleEndianToNumber(value, false);
  }

  /**
   * Reads a varint as a signed 32 bit value.
   * @returns Value read
   */
  public int32(): number {
    const value = this.getVarint();
    if (leIsSigned(value)) {
      const number = littleEndianToNumber(value);
      return -((~number & 0xffffffff) + 1);
    }
    return littleEndianToNumber(value, true);
  }

  /**
   * Reads a zig-zag encoded varint as a signed 32 bit value.
   * @returns Value read
   */
  public sint32(): number {
    const value = this.getVarint();
    const long = Long.fromBytesLE([...value], true);
    const zigZagLong = zigZagDecode(long);
    return zigZagLong.toNumber();
  }

  /**
   * Reads a varint as an unsigned 64 bit value.
   * @returns Value read
   */
  public uint64(): Long {
    const value = this.getVarint();
    return littleEndianToLong(value, false);
  }

  /**
   * Reads a varint as a signed 64 bit value.
   * @returns Value read
   */
  public int64(): Long {
    const value = this.getVarint();
    return littleEndianToLong(value, true);
  }

  /**
   * Reads a zig-zag encoded varint as a signed 64 bit value.
   * @returns Value read
   */
  public sint64(): Long {
    const value = this.getVarint();
    const long = Long.fromBytesLE([...value], true);
    const zigZagLong = zigZagDecode(long);
    return zigZagLong;
  }

  /**
   * Reads a varint as a boolean.
   * @returns Value read
   */
  public bool(): boolean {
    const value = this.getVarint();
    return value[0] !== 0;
  }

  /**
   * Reads fixed 32 bits as an unsigned 32 bit integer.
   * @returns Value read
   */
  public fixed32(): number {
    const fixed = this.getSubBuffer(4);
    return littleEndianToNumber(fixed, true);
  }

  /**
   * Reads fixed 32 bits as a signed 32 bit integer.
   * @returns Value read
   */
  public sfixed32(): number {
    const fixed = this.getSubBuffer(4);
    return zigZagDecode(littleEndianToNumber(fixed));
  }

  /**
   * Reads fixed 64 bits.
   * @returns Value read
   */
  public fixed64(): Long {
    const fixed = this.getSubBuffer(8);
    return littleEndianToLong(fixed, true);
  }

  /**
   * Reads zig-zag encoded fixed 64 bits.
   * @returns Value read
   */
  public sfixed64(): Long {
    const fixed = this.getSubBuffer(8);
    return zigZagDecode(littleEndianToLong(fixed));
  }

  /**
   * Reads a float (32 bit) as a number.
   * @returns Value read
   */
  public float(): number {
    const floatBuffer = this.getSubBuffer(4);
    return new DataView(floatBuffer.buffer).getFloat32(0, true);
  }

  /**
   * Reads a double (64 bit float) as a number.
   * @returns Value read
   */
  public double(): number {
    const doubleBuffer = this.getSubBuffer(8);
    return new DataView(doubleBuffer.buffer).getFloat64(0, true);
  }

  /**
   * Reads a sequence of bytes preceded by its length as a varint.
   * @returns Value read
   */
  public bytes(): Uint8Array {
    const length = this.uint32();
    return this.getSubBuffer(length);
  }

  /**
   * Reads a string preceded by its byte length as a varint.
   * @returns Value read
   */
  public string(): string {
    return [...this.bytes()].map((byte) => String.fromCharCode(byte)).join("");
  }

  /**
   * Skips the specified number of bytes if specified, otherwise skips a varint.
   * @param [length] Length if known, otherwise a varint is assumed
   * @returns `this`
   */
  public skip(length?: number): Reader {
    if (length === undefined) {
      while ((this.buf[this._pos] & 0x80) !== 0) {
        this._pos++;
      }
      this._pos++;
    } else {
      this._pos += length;
    }
    this._pos = Math.min(this._pos, this.len);
    return this;
  }

  /**
   * Skips the next element of the specified wire type.
   * @param wireType Wire type received
   * @returns `this`
   */
  public skipType(wireType: number): Reader {
    switch (wireType) {
      case WireType.VARINT:
        this.skip();
        break;
      case WireType.I32:
        this.skip(4);
        break;
      case WireType.I64:
        this.skip(8);
        break;
      case WireType.SGROUP:
      case WireType.EGROUP:
        this.skip(0);
        break;
      case WireType.LEN:
        console.warn("Unexpected request to skip based on a LEN type");
        this.skip(0);
        break;
      default:
        console.error(`Unknown wire type: ${wireType}`);
        throw new Error("Unknown wire type");
    }

    return this;
  }
}
