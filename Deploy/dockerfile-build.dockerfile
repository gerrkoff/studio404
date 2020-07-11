FROM mcr.microsoft.com/dotnet/core/sdk:2.2

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g npm

COPY Studio404 /app/Studio404
COPY Deploy /app/Deploy
WORKDIR /app

ENTRYPOINT ["/bin/sh", "-c", "cd Deploy && ./build.sh"]