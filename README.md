# Protocol Buffer Reader/Writer

This is a simple implementation of a Reader and a Writer for sending and
receiving Protocol Buffers.

In this version, it works with `Uint8Arrays` and `Long`s (from
https://deno.land/x/long@v1.0.0/mod.ts). Future versions may add BigInt support.

## Restrictions and Limitations

- Wire Types 3 (`SGROUP`) and 4 (`EGROUP`) are not currently supported.
- `proto2` is not explicitly supported.
- Testing does not yet cover 100% of use cases (pull requests are welcome!)
