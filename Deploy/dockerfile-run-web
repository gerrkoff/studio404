FROM mcr.microsoft.com/dotnet/core/aspnet:2.2

COPY /src/studio404 /app
WORKDIR /app

ENV ASPNETCORE_ENVIRONMENT Production

ENTRYPOINT ["dotnet", "Studio404.Web.dll"]