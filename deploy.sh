#!/bin/bash
set -e # exit with nonzero exit code if anything fails

# clear and re-create the dist directory
rm -rf dist || exit 0;
mkdir dist;

# run our compile script, discussed above
grunt build

# go to the dist directory and create a *new* Git repo
cd dist
git init

# inside this git repo we'll pretend to be a new user
<<<<<<< HEAD
git config user.name "petereberlecom"
git config user.email "git@peter-eberle.com"
=======
git config user.name "stefanbuck"
git config user.email "git@stefanbuck.com"
>>>>>>> be9bacd45f75971a57074b756fd955d2a0871f60

# The first and only commit to this new Git repo contains all the
# files present with the commit message "Deploy to GitHub Pages".
git add -A
git commit -m "Deploy to GitHub Pages"

# exit 0;

<<<<<<< HEAD
# Force push from the current repo's master branch to the remote
# repo's gh-pages branch. (All previous history on the gh-pages branch
# will be lost, since we are overwriting it.) We redirect any distput to
# /dev/null to hide any sensitive credential data that might otherwise be exposed.
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
=======
# Force push from the current repo's source branch to the remote
# repo's master branch. (All previous history on the master branch
# will be lost, since we are overwriting it.) We redirect any distput to
# /dev/null to hide any sensitive credential data that might otherwise be exposed.
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master > /dev/null 2>&1
>>>>>>> be9bacd45f75971a57074b756fd955d2a0871f60
