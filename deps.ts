import DenoLong from "https://deno.land/x/long@v1.0.0/mod.ts";
import { getLongFromString } from "./get-long-from-string.ts";

class Long extends DenoLong {
  /**
   * The original implementation of Long.fromValue handles strings very poorly
   */
  static fromValue(num: string | number | Long) {
    if (typeof num === "string") {
      return getLongFromString(num);
    }
    return DenoLong.fromValue(num);
  }
}

export { Long };
