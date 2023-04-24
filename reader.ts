import { Long } from "./deps.ts";

enum WireType {
  VARINT = 0,
  I64 = 1,
  LEN = 2,
  I32 = 5,
}

export class Reader {
  /**
   * Constructs a new reader instance using the specified buffer.
   * @param buffer Buffer to read from
   */
  private constructor(public buf: Uint8Array) {
    this.len = buf.length;
  }

  /** Read buffer position. */
  public pos = 0;

  /** Read buffer length. */
  public len = 0;

  /**
   * Creates a new reader using the specified buffer.
   * @param buffer Buffer to read from
   * @returns A {@link BufferReader} if `buffer` is a Buffer, otherwise a {@link Reader}
   * @throws {Error} If `buffer` is not a valid buffer
   */
  public static create(buffer: Uint8Array): Reader {
    return new Reader(buffer);
  }

  /**
   * Reads a varint as an unsigned 32 bit value.
   * @returns Value read
   */
  public uint32(): number {
    return 0;
  }

  /**
   * Reads a varint as a signed 32 bit value.
   * @returns Value read
   */
  public int32(): number {
    return 0;
  }

  /**
   * Reads a zig-zag encoded varint as a signed 32 bit value.
   * @returns Value read
   */
  public sint32(): number {
    return 0;
  }

  /**
   * Reads a varint as a signed 64 bit value.
   * @returns Value read
   */
  public int64(): Long {
    return Long.fromInt(0);
  }

  /**
   * Reads a varint as an unsigned 64 bit value.
   * @returns Value read
   */
  public uint64(): Long {
    return Long.fromInt(0);
  }

  /**
   * Reads a zig-zag encoded varint as a signed 64 bit value.
   * @returns Value read
   */
  public sint64(): Long {
    return Long.fromInt(0, true);
  }

  /**
   * Reads a varint as a boolean.
   * @returns Value read
   */
  public bool(): boolean {
    return false;
  }

  /**
   * Reads fixed 32 bits as an unsigned 32 bit integer.
   * @returns Value read
   */
  public fixed32(): number {
    return 0;
  }

  /**
   * Reads fixed 32 bits as a signed 32 bit integer.
   * @returns Value read
   */
  public sfixed32(): number {
    return 0;
  }

  /**
   * Reads fixed 64 bits.
   * @returns Value read
   */
  public fixed64(): Long {
    return Long.fromInt(0);
  }

  /**
   * Reads zig-zag encoded fixed 64 bits.
   * @returns Value read
   */
  public sfixed64(): Long {
    return Long.fromInt(0, true);
  }

  /**
   * Reads a float (32 bit) as a number.
   * @returns Value read
   */
  public float(): number {
    return 0;
  }

  /**
   * Reads a double (64 bit float) as a number.
   * @returns Value read
   */
  public double(): number {
    return 0;
  }

  /**
   * Reads a sequence of bytes preceded by its length as a varint.
   * @returns Value read
   */
  public bytes(): Uint8Array {
    return new Uint8Array();
  }

  /**
   * Reads a string preceded by its byte length as a varint.
   * @returns Value read
   */
  public string(): string {
    return "";
  }

  /**
   * Skips the specified number of bytes if specified, otherwise skips a varint.
   * @param [length] Length if known, otherwise a varint is assumed
   * @returns `this`
   */
  public skip(length?: number): Reader {
    if (length === undefined) {
      while ((this.buf[this.pos] & 0x80) !== 0) {
        this.pos++;
      }
      this.pos++;
    } else {
      this.pos += length;
    }
    this.pos = Math.min(this.pos, this.len);
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
      case WireType.LEN:
      /* falls through */
      default:
        console.error(`Unknown wire type: ${wireType}`);
        throw new Error("Unknown wire type");
    }

    return this;
  }
}
