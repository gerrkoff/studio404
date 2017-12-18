#!/usr/bin/env bash
cd Studio404/Studio404.Web/
npm run build_p
dotnet publish -c Release -o ../../Publish
cd ../..
docker build -t studio404 .
docker run -p 5000:80 studio404
