Remove-Item Deploy/TestResults -recurse

cd Studio404/Studio404.Services.Tests/
dotnet test "--logger:trx;LogFileName=results.trx" --results-directory ../../Deploy/TestResults