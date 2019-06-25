#!/usr/bin/env bash
cd ../Deploy/artifacts || exit $?
docker build -t studio404-admin -f dockerfile-run-admin .
docker rm -f studio404-admin
docker run -p 5000:80 --name studio404-admin studio404-admin
