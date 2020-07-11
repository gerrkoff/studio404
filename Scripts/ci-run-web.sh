#!/usr/bin/env bash
cd ..

cp Studio404/Studio404.Web/settings/appsettings.Development.json Studio404/Studio404.Web/settings/appsettings.Production.json || exit $?

docker rm -f studio404-web
docker run -t \
    -p 5000:80 \
    -v "$(pwd)"/Studio404/Studio404.Web/settings:/app/settings \
    --name studio404-web \
    gerrkoff/studio404-web:latest