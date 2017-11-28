#!/usr/bin/env bash
dotnet ef database drop

echo "_________migrations removing..."
dotnet ef migrations remove

echo "_________init migration creating..."
dotnet ef migrations add N000_Init

echo "_________db updating..."
dotnet ef database update N000_Init