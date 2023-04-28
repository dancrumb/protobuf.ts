import { littleEndianToVarint } from "./varint-transcoder.ts";
import { Long } from "./deps.ts";
import { numberToLittleEndian } from "./endianness.ts";
import { zigZagEncode } from "./zig-zag-encoding.ts";

function numberToVarInt(n: number | Long | string) {
  const littleEndian = numberToLittleEndian(n);
  return littleEndianToVarint(littleEndian);
}

function appendBuffer(buffer1: Uint8Array, buffer2: Uint8Array) {
  const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Uint8Array(buffer1), 0);
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
  return tmp;
}

/**
 * Protocol Buffer wire format writer.
 *
 * Generates a Uint8Array that can then be sent over the wire (or stored in a file)
 */
export class Writer {
  private buffer: Uint8Array;
  private stack: Uint8Array[] = [];

  /**
   * @private
   */
  private constructor() {
    this.buffer = new Uint8Array();
  }

  /**
   * Current length of buffer
   */
  public get len(): number {
    return this.buffer.length;
  }

  /**
   * Creates a new writer.
   */
  public static create(): Writer {
    return new Writer();
  }

  private appendBuffer(newBuffer: Uint8Array) {
    this.buffer = appendBuffer(this.buffer, newBuffer);
  }

  /**
   * Writes an unsigned 32 bit value as a varint.
   * @param value Value to write
   * @returns `this`
   */
  public uint32(value: number): Writer {
    this.appendBuffer(numberToVarInt(value));
    return this;
  }

  /**
   * Writes a signed 32 bit value as a varint.
   * @param value Value to write
   * @returns `this`
   */
  public int32(value: number): Writer {
    this.appendBuffer(numberToVarInt(value));
    return this;
  }

  /**
   * Writes a 32 bit value as a varint, zig-zag encoded.
   * @param value Value to write
   * @returns `this`
   */
  public sint32(value: number): Writer {
    this.appendBuffer(numberToVarInt(zigZagEncode(value)));
    return this;
  }

  /**
   * Writes an unsigned 64 bit value as a varint.
   * @param value Value to write
   * @returns `this`
   * @throws {TypeError} If `value` is a string and no long library is present.
   */
  public uint64(value: Long | number | string): Writer {
    this.appendBuffer(numberToVarInt(value));
    return this;
  }

  /**
   * Writes a signed 64 bit value as a varint.
   * @param value Value to write
   * @returns `this`
   * @throws {TypeError} If `value` is a string and no long library is present.
   */
  public int64(value: Long | number | string): Writer {
    this.appendBuffer(numberToVarInt(value));
    return this;
  }

  /**
   * Writes a signed 64 bit value as a varint, zig-zag encoded.
   * @param value Value to write
   * @returns `this`
   * @throws {TypeError} If `value` is a string and no long library is present.
   */
  public sint64(value: Long | number | string): Writer {
    this.appendBuffer(numberToVarInt(zigZagEncode(value)));
    return this;
  }

  /**
   * Writes a boolean value as a varint.
   * @param value Value to write
   * @returns `this`
   */
  public bool(value: boolean): Writer {
    const varint = littleEndianToVarint(new Uint8Array([value ? 1 : 0]));
    this.buffer = appendBuffer(this.buffer, varint);
    return this;
  }

  /**
   * Writes an unsigned 32 bit value as fixed 32 bits.
   * @param value Value to write
   * @returns `this`
   */
  public fixed32(value: number): Writer {
    const fixed = numberToLittleEndian(value, 4);
    this.appendBuffer(fixed);
    return this;
  }

  /**
   * Writes a signed 32 bit value as fixed 32 bits.
   * @param value Value to write
   * @returns `this`
   */
  public sfixed32(value: number): Writer {
    const fixed = numberToLittleEndian(zigZagEncode(value), 4);
    this.appendBuffer(fixed);
    return this;
  }

  /**
   * Writes an unsigned 64 bit value as fixed 64 bits.
   * @param value Value to write
   * @returns `this`
   * @throws {TypeError} If `value` is a string and no long library is present.
   */
  public fixed64(value: Long | number | string): Writer {
    const fixed = numberToLittleEndian(value, 8);
    this.appendBuffer(fixed);
    return this;
  }

  /**
   * Writes a signed 64 bit value as fixed 64 bits.
   * @param value Value to write
   * @returns `this`
   * @throws {TypeError} If `value` is a string and no long library is present.
   */
  public sfixed64(value: Long | number | string): Writer {
    const fixed = numberToLittleEndian(zigZagEncode(value), 8);
    this.appendBuffer(fixed);
    return this;
  }

  /**
   * Writes a float (32 bit).
   * @param value Value to write
   * @returns `this`
   */
  public float(value: number): Writer {
    const word = new ArrayBuffer(4);
    new DataView(word).setFloat32(0, value, true);
    this.appendBuffer(new Uint8Array(word));
    return this;
  }

  /**
   * Writes a double (64 bit float).
   * @param value Value to write
   * @returns `this`
   */
  public double(value: number): Writer {
    const dword = new ArrayBuffer(8);
    new DataView(dword).setFloat64(0, value, true);
    this.appendBuffer(new Uint8Array(dword));
    return this;
  }

  /**
   * Writes a sequence of bytes.
   * @param value Buffer or base64 encoded string to write
   * @returns `this`
   */
  public bytes(value: Uint8Array | string): Writer {
    const byteArray =
      typeof value === "string"
        ? Uint8Array.from(atob(value), (c) => c.charCodeAt(0))
        : value;
    this.appendBuffer(byteArray);
    return this;
  }

  /**
   * Writes a string.
   * @param value Value to write
   * @returns `this`
   */
  public string(value: string): Writer {
    const stringBuffer = [...value].map((s) => s.charCodeAt(0));
    const stringLength = numberToVarInt(stringBuffer.length);
    this.appendBuffer(new Uint8Array([...stringLength, ...stringBuffer]));
    return this;
  }

  /**
   * Forks this writer's state by pushing it to a stack.
   * Calling {@link Writer#reset|reset} or {@link Writer#ldelim|ldelim} resets the writer to the previous state.
   * @returns `this`
   */
  public fork(): Writer {
    this.stack.push(this.buffer);
    this.buffer = new Uint8Array();
    return this;
  }

  private pop(): Uint8Array {
    const previous = this.stack.pop();
    if (previous === undefined) {
      throw new Error("Reset Protobuf writer, but there's nothing to reset to");
    }
    return previous;
  }

  /**
   * Resets this instance to the last state.
   * @returns `this`
   */
  public reset(): Writer {
    this.buffer = this.pop();
    return this;
  }

  /**
   * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
   * @returns `this`
   */
  public ldelim(): Writer {
    const forkState = this.buffer;
    const forkStateLength = numberToVarInt(forkState.length);
    this.reset();
    this.appendBuffer(new Uint8Array([...forkStateLength, ...forkState]));
    return this;
  }

  /**
   * Finishes the write operation.
   * @returns Finished buffer
   */
  public finish(): Uint8Array {
    return this.buffer;
  }
}
