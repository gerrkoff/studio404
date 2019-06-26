echo
echo "      ─▄▀─▄▀"
echo "      ──▀──▀"
echo "      █▀▀▀▀▀█▄     --------------------------------"
echo "      █░░░░░█─█    | It's time to update version! |"
echo "      ▀▄▄▄▄▄▀▀     --------------------------------"
echo
echo "Enter WEB version (PATCH) ('-' for skip): " 
read versionWeb
echo "Enter ADMIN version (PATCH) ('-' for skip): " 
read versionAdmin

echo "WEB"
if [ ! -z "$versionWeb" ] && [ $versionWeb == '-' ]
    then
        echo "Skip version"
    else
        dotnet dotnet-bumpversion/BumpVersion.dll ../Studio404/Studio404.Web/Studio404.Web.csproj $versionWeb
fi

echo "ADMIN"
if [ ! -z "$versionAdmin" ] && [ $versionAdmin == '-' ]
    then
        echo "Skip version"
    else
        dotnet dotnet-bumpversion/BumpVersion.dll ../Studio404/Studio404.Web.Admin/Studio404.Web.Admin.csproj $versionAdmin
fi
