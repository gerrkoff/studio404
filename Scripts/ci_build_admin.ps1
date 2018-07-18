cd Studio404/Studio404.Web.Admin/

npm install
if ($LastExitCode -eq 1)
{
	exit 1
}

npm run lint
if ($LastExitCode -eq 1)
{
	exit 1
}

npm run prod
if ($LastExitCode -eq 1)
{
	exit 1
}

dotnet publish -c Release -o ../../Deploy/src/studio404admin