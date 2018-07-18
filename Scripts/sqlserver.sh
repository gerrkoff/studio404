sudo docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=Password1' \
   -p 1433:1433 --name sql \
   -v sqlvolume:/var/opt/mssql \
   -d microsoft/mssql-server-linux:2017-latest