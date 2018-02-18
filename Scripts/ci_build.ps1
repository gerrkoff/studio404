Remove-Item Deploy/src -recurse

cd Studio404/Studio404.Web/
npm install
$result = npm run build_p

if ($result.ExitCode -eq 1)
{
	Write-Output("test")
}

dotnet publish -c Release -o ../../Deploy/src