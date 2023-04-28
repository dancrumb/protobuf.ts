import { Long } from "./deps.ts";

const getRadix = (num: string) => {
  const start = num.charAt(0) === "-" ? 1 : 0;
  if (num.substring(start, start + 2) === "0x") {
    return 16;
  }
  if (num.substring(start, start + 2) === "0b") {
    return 2;
  }
  if (num.substring(start, start + 1) === "0") {
    return 8;
  }
  return 10;
};

export const getLongFromString = (n: string, signed = false) => {
  const radix = getRadix(n);
  return Long.fromString(n, !signed, radix);
};
