#!/usr/bin/env bash
cd ..

cp Studio404/Studio404.Web.Admin/settings/appsettings.Development.json Studio404/Studio404.Web.Admin/settings/appsettings.Production.json || exit $?

docker rm -f studio404-admin
docker run -t \
    -p 5000:80 \
    -v "$(pwd)"/Studio404/DarkDeeds.Web.Admin/settings:/app/settings \
    --name studio404-admin \
    gerrkoff/studio404-admin:latest