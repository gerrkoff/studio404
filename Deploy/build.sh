#!/usr/bin/env bash

print () {
   printf "\n\e[46m\e[1m    $1    \e[0m\e[0m\n\n"
}

cd ..
DIR="$PWD"

# cleanup
print 'CLEAN'
rm -rf "$DIR"/Deploy/artifacts
echo cleaned

# test & build FE WEB
print 'FE WEB: GET DEPS'
cd "$DIR"/Studio404/Studio404.Web/ || exit $?
npm install || exit $?

print 'FE WEB: TEST'
npm run test || exit $?

print 'FE WEB: BUILD'
npm run prod || exit $?

# test & build FE ADMIN
print 'FE ADMIN: GET DEPS'
cd "$DIR"/Studio404/Studio404.Web.Admin/ || exit $?
npm install || exit $?

print 'FE ADMIN: LINT'
npm run lint || exit $?

print 'FE ADMIN: BUILD'
echo 'build main-app...'
node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng build --prod || exit $?
echo 'build login-app...'
node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng build login-app --prod || exit $?

# test & build BE
print 'BE: TEST'
cd "$DIR"/Studio404/Studio404.Services.Tests/ || exit $?
dotnet test "--logger:trx;LogFileName=results.trx" --results-directory "$DIR"/Deploy/artifacts/test-results || exit $?

print 'BE: SET BUILD VERSION'
if [ -z "$1" ]
    then
        echo "No BUILD_VERSION provided, skip"
    else
        cd "$DIR"/Studio404/Studio404.Web/ || exit $?
        dotnet "$DIR"/Deploy/dotnet-setversion/dotnet-setversion.dll vs $1

        cd "$DIR"/Studio404/Studio404.Web.Admin/ || exit $?
        dotnet "$DIR"/Deploy/dotnet-setversion/dotnet-setversion.dll vs $1
fi

print 'BE WEB: BUILD'
cd "$DIR"/Studio404/Studio404.Web/ || exit $?
dotnet publish -c Release -o "$DIR"/Deploy/artifacts/src/studio404 || exit $?

print 'BE ADMIN: BUILD'
cd "$DIR"/Studio404/Studio404.Web.Admin/ || exit $?
dotnet publish -c Release -o "$DIR"/Deploy/artifacts/src/studio404admin || exit $?

# misc
print 'COPY ADDITIONAL FILES'
cd "$DIR" || exit $?
cp Deploy/dockerfile-run-web.dockerfile Deploy/artifacts/ || exit $?
cp Deploy/dockerfile-run-admin.dockerfile Deploy/artifacts/ || exit $?
echo copied

print 'SUCCESS'
