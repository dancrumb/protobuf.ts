# Protocol Buffer Reader/Writer

This is a simple implementation of a Reader and a Writer for sending and
receiving Protocol Buffers.

In this version, it works with `Uint8Arrays` and `Long`s (from
https://deno.land/x/long@v1.0.0/mod.ts). Future versions may add BigInt support.

# Purpose

This is designed to help users of [`ts-proto`](https://github.com/stephenh/ts-proto).

If you us this plugin to generate code, you'll see that it relies on `protobufjs`, which doesn't work great with Deno.

This module provides a `Writer` and `Reader` which _do_ work with Deno.

## Using this module with ts-proto

First, generate your code with `protoc`. Be sure to include this `--ts_proto_opt=forceLong=long` option, to use the [`long`](https://deno.land/x/long@v1.0.0/mod.ts) module.

Create a directory called `protobufjs` and create a file called `minimal.ts` that looks like this:

```
import Long from "long";
import { Reader, Writer } from "protobuf_ts";

export { Reader, Writer };

export const util = { Long };

export const configure = () => {};
```

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
