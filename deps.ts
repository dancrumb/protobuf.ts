import DenoLong from "https://deno.land/x/long@v1.0.0/mod.ts";
import { getLongFromString } from "./get-long-from-string.ts";

class Long extends DenoLong {
  /**
   * The original implementation of Long.fromValue handles strings very poorly
   */
  static fromValue(num: string | number | Long, signed?: undefined | boolean) {
    if (typeof num === "string") {
      const isExplicitlySigned = num.charAt(0) === "+" || num.charAt(0) === "-";
      return getLongFromString(num, signed ?? isExplicitlySigned);
    }
    return DenoLong.fromValue(num, !(signed ?? true));
  }
}

export { Long };
