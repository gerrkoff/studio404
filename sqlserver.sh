#!/usr/bin/env bash
sudo docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=Password1' -p 1401:1433 --name sql microsoft/mssql-server-linux:2017-latest

