#!/usr/bin/env bash

protoc --plugin=/Users/dancrumb/.nvm/versions/node/v16.13.0/bin/protoc-gen-ts_proto \
    --ts_proto_out=./ \
    --proto_path=./ \
    --ts_proto_opt=importSuffix=.ts \
    --ts_proto_opt=onlyTypes=false ./*.proto \
    --ts_proto_opt=esModuleInterop=true \
    --ts_proto_opt=forceLong=long
