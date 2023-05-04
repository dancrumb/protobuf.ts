# Protocol Buffer Reader/Writer

This is a simple implementation of a Reader and a Writer for sending and
receiving Protocol Buffers.

In this version, it works with `Uint8Arrays` and `Long`s (from
https://deno.land/x/long@v1.0.0/mod.ts). Future versions may add BigInt support.

# Purpose

This is designed to help users of
[`ts-proto`](https://github.com/stephenh/ts-proto).

If you us this plugin to generate code, you'll see that it relies on
`protobufjs`, which doesn't work great with Deno.

This module provides a `Writer` and `Reader` which _do_ work with Deno.

## Using this module with ts-proto

First, generate your code with `protoc`. Be sure to include this
`--ts_proto_opt=forceLong=long` option, to use the
[`long`](https://deno.land/x/long@v1.0.0/mod.ts) module. You also need
`--ts_proto_opt=esModuleInterop=true` so that `Long` is imported correctly.

Create a directory called `protobufjs` and create a file called `minimal.ts`
that looks like this:

```
// deno-lint-ignore-file no-namespace
import _Long from "long";
import * as protobuf from "protobuf_ts";

namespace _m0 {
  export const Reader = protobuf.Reader;
  export const Writer = protobuf.Writer;
  export type Reader = protobuf.Reader;
  export type Writer = protobuf.Writer;

  export const Long = _Long;

  export const util = { Long };

  export const configure = () => {};
}

export default _m0;
```

It's not pretty, but it's the only way I have found to get it working.

Update your import map to include these:

```
{
    ...,
    "long": "https://deno.land/x/long@v1.0.0/mod.ts",
    "protobufjs/": "./protobufjs/",
    "protobuf_ts": "https://deno.land/x/protobuf_ts/mod.ts",
    ...
}

Now, you should be good to go!


## Restrictions and Limitations

- Wire Types 3 (`SGROUP`) and 4 (`EGROUP`) are not currently supported.
- `proto2` is not explicitly supported.
- Testing does not yet cover 100% of use cases (pull requests are welcome!)
```
