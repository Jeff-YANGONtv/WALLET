#!/bin/bash
set -e
mkdir -p dist/api
cp -r public/* dist/
cp api/index.js dist/api/
echo "Build complete"
