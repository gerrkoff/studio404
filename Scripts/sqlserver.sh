#!/usr/bin/env bash
docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=Password1' -p 1401:1433 -v sqlvolume:/var/opt/mssql --name sql -d microsoft/mssql-server-linux
