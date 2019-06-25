FROM mcr.microsoft.com/dotnet/core/aspnet:2.2

COPY /src/studio404admin /app
WORKDIR /app

ENV ASPNETCORE_ENVIRONMENT Production

ENTRYPOINT ["dotnet", "Studio404.Web.Admin.dll"]