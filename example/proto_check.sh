#!/usr/bin/env bash

echo $1 | xxd -r -ps | ~/go/bin/protoscope
