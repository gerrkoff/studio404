#!/usr/bin/env bash
cd ..
rm -rf Deploy/artifacts
docker build -t studio404-builder -f Deploy/dockerfile-build .
docker rm -f studio404-builder 
docker run -v "$(pwd)"/Deploy/artifacts:/app/Deploy/artifacts --name studio404-builder studio404-builder
docker rm -f studio404-builder 
