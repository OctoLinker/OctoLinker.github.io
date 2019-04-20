#!/bin/bash
set -e # exit with nonzero exit code if anything fails

# clear and re-create the out directory
rm -rf out || exit 0;
mkdir out;

# run our compile script, discussed above
npm run build && npm run export

# go to the out directory and create a *new* Git repo
cd out
git init

# inside this git repo we'll pretend to be a new user
git config user.name "stefanbuck"
git config user.email "git@stefanbuck.com"

# The first and only commit to this new Git repo contains all the
# files present with the commit message "Deploy to GitHub Pages".
git add -A

git commit -m "Deploy to GitHub Pages"

exit 1; # REMOVE THIS !!!

# Force push from the current repo's source branch to the remote
# repo's master branch. (All previous history on the master branch
# will be lost, since we are overwriting it.) We redirect any distput to
# /dev/null to hide any sensitive credential data that might otherwise be exposed.
echo "git push"
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master > /dev/null 2>&1