#!/usr/bin/env bash
cd ../Deploy/artifacts || exit $?
docker build -t studio404-web -f dockerfile-run-web .
docker rm -f studio404-web
docker run -p 5000:80 --name studio404-web studio404-web
