#!/usr/bin/env bash
cd ..
rm -rf Deploy/artifacts

docker build -t studio404-builder -f Deploy/dockerfile-build.dockerfile .

docker rm -f studio404-builder 
docker run \
    -v "$(pwd)"/Deploy/artifacts:/app/Deploy/artifacts \
    --name studio404-builder \
    studio404-builder
docker rm -f studio404-builder 

cd Scripts
VERSION_WEB=$(sh version-get-web.sh)
VERSION_ADMIN=$(sh version-get-admin.sh)
cd ..

cd Deploy/artifacts || exit $?

docker build \
    -f dockerfile-run-web.dockerfile \
    -t gerrkoff/studio404-web:$VERSION_WEB \
    -t gerrkoff/studio404-web:latest \
    . || exit $?
docker push gerrkoff/studio404-web:$VERSION_WEB
docker push gerrkoff/studio404-web:latest

docker build \
    -f dockerfile-run-admin.dockerfile \
    -t gerrkoff/studio404-admin:$VERSION_ADMIN \
    -t gerrkoff/studio404-admin:latest \
    . || exit $?
docker push gerrkoff/studio404-admin:$VERSION_ADMIN
docker push gerrkoff/studio404-admin:latest
