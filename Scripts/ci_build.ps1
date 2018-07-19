Remove-Item Deploy/src -recurse

cd Studio404/Studio404.Web/

npm install
if ($LastExitCode -eq 1)
{
	exit 1
}

npm run test
if ($LastExitCode -eq 1)
{
	exit 1
}

npm run prod
if ($LastExitCode -eq 1)
{
	exit 1
}

dotnet publish -c Release -o ../../Deploy/src/studio404