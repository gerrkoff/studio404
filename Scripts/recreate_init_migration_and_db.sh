#!/usr/bin/env bash
cd ../Studio404/Studio404.Dal/
dotnet ef database drop

echo "_________migrations removing..."
dotnet ef migrations remove

echo "_________init migration creating..."
dotnet ef migrations add Init

echo "_________db updating..."
dotnet ef database update