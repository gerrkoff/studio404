FROM microsoft/aspnetcore:2.0

COPY /Publish /app
WORKDIR /app

ENTRYPOINT ["dotnet", "Studio404.Web.dll"]