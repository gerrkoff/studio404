#!/usr/bin/env bash

cd ../Deploy
rm -rf src

cd ../Studio404/Studio404.Web/
npm run build_p
dotnet publish -c Release -o ../../Deploy/src