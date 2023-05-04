/* eslint-disable */
import { Long } from "../deps.ts";
import _m0 from "./protobuf_shim.ts";

export const protobufPackage = "";

export interface ExampleMessage {
  myIntPos: number;
  myIntNeg: number;
  myLongPos: Long;
  myLongNeg: Long;
  myUint: number;
  myUlong: Long;
  mySintPos: number;
  mySintNeg: number;
  mySlongPos: Long;
  mySlongNeg: Long;
  myFixed32: number;
  myFixed64: Long;
  mySfixed32Pos: number;
  mySfixed32Neg: number;
  mySfixed64Pos: Long;
  mySfixed64Neg: Long;
  myFloat: number;
  myDouble: number;
  myBool: boolean;
  myString: string;
  myBytes: Uint8Array;
  myRepeatedFixed32: number[];
  myRepeatedUint: number[];
  myRepeatedLong: Long[];
}

function createBaseExampleMessage(): ExampleMessage {
  return {
    myIntPos: 0,
    myIntNeg: 0,
    myLongPos: Long.ZERO,
    myLongNeg: Long.ZERO,
    myUint: 0,
    myUlong: Long.UZERO,
    mySintPos: 0,
    mySintNeg: 0,
    mySlongPos: Long.ZERO,
    mySlongNeg: Long.ZERO,
    myFixed32: 0,
    myFixed64: Long.UZERO,
    mySfixed32Pos: 0,
    mySfixed32Neg: 0,
    mySfixed64Pos: Long.ZERO,
    mySfixed64Neg: Long.ZERO,
    myFloat: 0,
    myDouble: 0,
    myBool: false,
    myString: "",
    myBytes: new Uint8Array(),
    myRepeatedFixed32: [],
    myRepeatedUint: [],
    myRepeatedLong: [],
  };
}

export const ExampleMessage = {
  encode(
    message: ExampleMessage,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.myIntPos !== 0) {
      writer.uint32(8).int32(message.myIntPos);
    }
    if (message.myIntNeg !== 0) {
      writer.uint32(16).int32(message.myIntNeg);
    }
    if (!message.myLongPos.isZero()) {
      writer.uint32(24).int64(message.myLongPos);
    }
    if (!message.myLongNeg.isZero()) {
      writer.uint32(32).int64(message.myLongNeg);
    }
    if (message.myUint !== 0) {
      writer.uint32(40).uint32(message.myUint);
    }
    if (!message.myUlong.isZero()) {
      writer.uint32(48).uint64(message.myUlong);
    }
    if (message.mySintPos !== 0) {
      writer.uint32(56).sint32(message.mySintPos);
    }
    if (message.mySintNeg !== 0) {
      writer.uint32(64).sint32(message.mySintNeg);
    }
    if (!message.mySlongPos.isZero()) {
      writer.uint32(72).sint64(message.mySlongPos);
    }
    if (!message.mySlongNeg.isZero()) {
      writer.uint32(80).sint64(message.mySlongNeg);
    }
    if (message.myFixed32 !== 0) {
      writer.uint32(93).fixed32(message.myFixed32);
    }
    if (!message.myFixed64.isZero()) {
      writer.uint32(97).fixed64(message.myFixed64);
    }
    if (message.mySfixed32Pos !== 0) {
      writer.uint32(109).sfixed32(message.mySfixed32Pos);
    }
    if (message.mySfixed32Neg !== 0) {
      writer.uint32(117).sfixed32(message.mySfixed32Neg);
    }
    if (!message.mySfixed64Pos.isZero()) {
      writer.uint32(121).sfixed64(message.mySfixed64Pos);
    }
    if (!message.mySfixed64Neg.isZero()) {
      writer.uint32(129).sfixed64(message.mySfixed64Neg);
    }
    if (message.myFloat !== 0) {
      writer.uint32(141).float(message.myFloat);
    }
    if (message.myDouble !== 0) {
      writer.uint32(145).double(message.myDouble);
    }
    if (message.myBool === true) {
      writer.uint32(152).bool(message.myBool);
    }
    if (message.myString !== "") {
      writer.uint32(162).string(message.myString);
    }
    if (message.myBytes.length !== 0) {
      writer.uint32(170).bytes(message.myBytes);
    }
    writer.uint32(178).fork();
    for (const v of message.myRepeatedFixed32) {
      writer.fixed32(v);
    }
    writer.ldelim();
    writer.uint32(186).fork();
    for (const v of message.myRepeatedUint) {
      writer.uint32(v);
    }
    writer.ldelim();
    writer.uint32(194).fork();
    for (const v of message.myRepeatedLong) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExampleMessage {
    const reader = input instanceof _m0.Reader
      ? input
      : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExampleMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.myIntPos = reader.int32();
          continue;
        case 2:
          if (tag != 16) {
            break;
          }

          message.myIntNeg = reader.int32();
          continue;
        case 3:
          if (tag != 24) {
            break;
          }

          message.myLongPos = reader.int64() as Long;
          continue;
        case 4:
          if (tag != 32) {
            break;
          }

          message.myLongNeg = reader.int64() as Long;
          continue;
        case 5:
          if (tag != 40) {
            break;
          }

          message.myUint = reader.uint32();
          continue;
        case 6:
          if (tag != 48) {
            break;
          }

          message.myUlong = reader.uint64() as Long;
          continue;
        case 7:
          if (tag != 56) {
            break;
          }

          message.mySintPos = reader.sint32();
          continue;
        case 8:
          if (tag != 64) {
            break;
          }

          message.mySintNeg = reader.sint32();
          continue;
        case 9:
          if (tag != 72) {
            break;
          }

          message.mySlongPos = reader.sint64() as Long;
          continue;
        case 10:
          if (tag != 80) {
            break;
          }

          message.mySlongNeg = reader.sint64() as Long;
          continue;
        case 11:
          if (tag != 93) {
            break;
          }

          message.myFixed32 = reader.fixed32();
          continue;
        case 12:
          if (tag != 97) {
            break;
          }

          message.myFixed64 = reader.fixed64() as Long;
          continue;
        case 13:
          if (tag != 109) {
            break;
          }

          message.mySfixed32Pos = reader.sfixed32();
          continue;
        case 14:
          if (tag != 117) {
            break;
          }

          message.mySfixed32Neg = reader.sfixed32();
          continue;
        case 15:
          if (tag != 121) {
            break;
          }

          message.mySfixed64Pos = reader.sfixed64() as Long;
          continue;
        case 16:
          if (tag != 129) {
            break;
          }

          message.mySfixed64Neg = reader.sfixed64() as Long;
          continue;
        case 17:
          if (tag != 141) {
            break;
          }

          message.myFloat = reader.float();
          continue;
        case 18:
          if (tag != 145) {
            break;
          }

          message.myDouble = reader.double();
          continue;
        case 19:
          if (tag != 152) {
            break;
          }

          message.myBool = reader.bool();
          continue;
        case 20:
          if (tag != 162) {
            break;
          }

          message.myString = reader.string();
          continue;
        case 21:
          if (tag != 170) {
            break;
          }

          message.myBytes = reader.bytes();
          continue;
        case 22:
          if (tag == 181) {
            message.myRepeatedFixed32.push(reader.fixed32());
            continue;
          }

          if (tag == 178) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.myRepeatedFixed32.push(reader.fixed32());
            }

            continue;
          }

          break;
        case 23:
          if (tag == 184) {
            message.myRepeatedUint.push(reader.uint32());
            continue;
          }

          if (tag == 186) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.myRepeatedUint.push(reader.uint32());
            }

            continue;
          }

          break;
        case 24:
          if (tag == 192) {
            message.myRepeatedLong.push(reader.uint64() as Long);
            continue;
          }

          if (tag == 194) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.myRepeatedLong.push(reader.uint64() as Long);
            }

            continue;
          }

          break;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExampleMessage {
    return {
      myIntPos: isSet(object.myIntPos) ? Number(object.myIntPos) : 0,
      myIntNeg: isSet(object.myIntNeg) ? Number(object.myIntNeg) : 0,
      myLongPos: isSet(object.myLongPos)
        ? Long.fromValue(object.myLongPos)
        : Long.ZERO,
      myLongNeg: isSet(object.myLongNeg)
        ? Long.fromValue(object.myLongNeg)
        : Long.ZERO,
      myUint: isSet(object.myUint) ? Number(object.myUint) : 0,
      myUlong: isSet(object.myUlong)
        ? Long.fromValue(object.myUlong)
        : Long.UZERO,
      mySintPos: isSet(object.mySintPos) ? Number(object.mySintPos) : 0,
      mySintNeg: isSet(object.mySintNeg) ? Number(object.mySintNeg) : 0,
      mySlongPos: isSet(object.mySlongPos)
        ? Long.fromValue(object.mySlongPos)
        : Long.ZERO,
      mySlongNeg: isSet(object.mySlongNeg)
        ? Long.fromValue(object.mySlongNeg)
        : Long.ZERO,
      myFixed32: isSet(object.myFixed32) ? Number(object.myFixed32) : 0,
      myFixed64: isSet(object.myFixed64)
        ? Long.fromValue(object.myFixed64)
        : Long.UZERO,
      mySfixed32Pos: isSet(object.mySfixed32Pos)
        ? Number(object.mySfixed32Pos)
        : 0,
      mySfixed32Neg: isSet(object.mySfixed32Neg)
        ? Number(object.mySfixed32Neg)
        : 0,
      mySfixed64Pos: isSet(object.mySfixed64Pos)
        ? Long.fromValue(object.mySfixed64Pos)
        : Long.ZERO,
      mySfixed64Neg: isSet(object.mySfixed64Neg)
        ? Long.fromValue(object.mySfixed64Neg)
        : Long.ZERO,
      myFloat: isSet(object.myFloat) ? Number(object.myFloat) : 0,
      myDouble: isSet(object.myDouble) ? Number(object.myDouble) : 0,
      myBool: isSet(object.myBool) ? Boolean(object.myBool) : false,
      myString: isSet(object.myString) ? String(object.myString) : "",
      myBytes: isSet(object.myBytes)
        ? bytesFromBase64(object.myBytes)
        : new Uint8Array(),
      myRepeatedFixed32: Array.isArray(object?.myRepeatedFixed32)
        ? object.myRepeatedFixed32.map((e: any) => Number(e))
        : [],
      myRepeatedUint: Array.isArray(object?.myRepeatedUint)
        ? object.myRepeatedUint.map((e: any) => Number(e))
        : [],
      myRepeatedLong: Array.isArray(object?.myRepeatedLong)
        ? object.myRepeatedLong.map((e: any) => Long.fromValue(e))
        : [],
    };
  },

  toJSON(message: ExampleMessage): unknown {
    const obj: any = {};
    message.myIntPos !== undefined &&
      (obj.myIntPos = Math.round(message.myIntPos));
    message.myIntNeg !== undefined &&
      (obj.myIntNeg = Math.round(message.myIntNeg));
    message.myLongPos !== undefined &&
      (obj.myLongPos = (message.myLongPos || Long.ZERO).toString());
    message.myLongNeg !== undefined &&
      (obj.myLongNeg = (message.myLongNeg || Long.ZERO).toString());
    message.myUint !== undefined && (obj.myUint = Math.round(message.myUint));
    message.myUlong !== undefined &&
      (obj.myUlong = (message.myUlong || Long.UZERO).toString());
    message.mySintPos !== undefined &&
      (obj.mySintPos = Math.round(message.mySintPos));
    message.mySintNeg !== undefined &&
      (obj.mySintNeg = Math.round(message.mySintNeg));
    message.mySlongPos !== undefined &&
      (obj.mySlongPos = (message.mySlongPos || Long.ZERO).toString());
    message.mySlongNeg !== undefined &&
      (obj.mySlongNeg = (message.mySlongNeg || Long.ZERO).toString());
    message.myFixed32 !== undefined &&
      (obj.myFixed32 = Math.round(message.myFixed32));
    message.myFixed64 !== undefined &&
      (obj.myFixed64 = (message.myFixed64 || Long.UZERO).toString());
    message.mySfixed32Pos !== undefined &&
      (obj.mySfixed32Pos = Math.round(message.mySfixed32Pos));
    message.mySfixed32Neg !== undefined &&
      (obj.mySfixed32Neg = Math.round(message.mySfixed32Neg));
    message.mySfixed64Pos !== undefined &&
      (obj.mySfixed64Pos = (message.mySfixed64Pos || Long.ZERO).toString());
    message.mySfixed64Neg !== undefined &&
      (obj.mySfixed64Neg = (message.mySfixed64Neg || Long.ZERO).toString());
    message.myFloat !== undefined && (obj.myFloat = message.myFloat);
    message.myDouble !== undefined && (obj.myDouble = message.myDouble);
    message.myBool !== undefined && (obj.myBool = message.myBool);
    message.myString !== undefined && (obj.myString = message.myString);
    message.myBytes !== undefined &&
      (obj.myBytes = base64FromBytes(
        message.myBytes !== undefined ? message.myBytes : new Uint8Array(),
      ));
    if (message.myRepeatedFixed32) {
      obj.myRepeatedFixed32 = message.myRepeatedFixed32.map((e) =>
        Math.round(e)
      );
    } else {
      obj.myRepeatedFixed32 = [];
    }
    if (message.myRepeatedUint) {
      obj.myRepeatedUint = message.myRepeatedUint.map((e) => Math.round(e));
    } else {
      obj.myRepeatedUint = [];
    }
    if (message.myRepeatedLong) {
      obj.myRepeatedLong = message.myRepeatedLong.map((e) =>
        (e || Long.UZERO).toString()
      );
    } else {
      obj.myRepeatedLong = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExampleMessage>, I>>(
    base?: I,
  ): ExampleMessage {
    return ExampleMessage.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExampleMessage>, I>>(
    object: I,
  ): ExampleMessage {
    const message = createBaseExampleMessage();
    message.myIntPos = object.myIntPos ?? 0;
    message.myIntNeg = object.myIntNeg ?? 0;
    message.myLongPos =
      object.myLongPos !== undefined && object.myLongPos !== null
        ? Long.fromValue(object.myLongPos)
        : Long.ZERO;
    message.myLongNeg =
      object.myLongNeg !== undefined && object.myLongNeg !== null
        ? Long.fromValue(object.myLongNeg)
        : Long.ZERO;
    message.myUint = object.myUint ?? 0;
    message.myUlong = object.myUlong !== undefined && object.myUlong !== null
      ? Long.fromValue(object.myUlong)
      : Long.UZERO;
    message.mySintPos = object.mySintPos ?? 0;
    message.mySintNeg = object.mySintNeg ?? 0;
    message.mySlongPos =
      object.mySlongPos !== undefined && object.mySlongPos !== null
        ? Long.fromValue(object.mySlongPos)
        : Long.ZERO;
    message.mySlongNeg =
      object.mySlongNeg !== undefined && object.mySlongNeg !== null
        ? Long.fromValue(object.mySlongNeg)
        : Long.ZERO;
    message.myFixed32 = object.myFixed32 ?? 0;
    message.myFixed64 =
      object.myFixed64 !== undefined && object.myFixed64 !== null
        ? Long.fromValue(object.myFixed64)
        : Long.UZERO;
    message.mySfixed32Pos = object.mySfixed32Pos ?? 0;
    message.mySfixed32Neg = object.mySfixed32Neg ?? 0;
    message.mySfixed64Pos =
      object.mySfixed64Pos !== undefined && object.mySfixed64Pos !== null
        ? Long.fromValue(object.mySfixed64Pos)
        : Long.ZERO;
    message.mySfixed64Neg =
      object.mySfixed64Neg !== undefined && object.mySfixed64Neg !== null
        ? Long.fromValue(object.mySfixed64Neg)
        : Long.ZERO;
    message.myFloat = object.myFloat ?? 0;
    message.myDouble = object.myDouble ?? 0;
    message.myBool = object.myBool ?? false;
    message.myString = object.myString ?? "";
    message.myBytes = object.myBytes ?? new Uint8Array();
    message.myRepeatedFixed32 = object.myRepeatedFixed32?.map((e) => e) || [];
    message.myRepeatedUint = object.myRepeatedUint?.map((e) => e) || [];
    message.myRepeatedLong =
      object.myRepeatedLong?.map((e) => Long.fromValue(e)) || [];
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long
  : T extends Array<infer U> ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : 
    & P
    & { [K in keyof P]: Exact<P[K], I[K]> }
    & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
    };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
