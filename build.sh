 #!/usr/bin/env sh

rm -rf dist &&
yarn build &&
#serve dist
cd dist &&
git init &&
git add . &&
git commit -m "update" &&
git branch -M gh-pages &&
#git remote add origin git@github.com:adekang/lu-music.git &&
#git push -f -u origin gh-pages &&
git push -f git@github.com:adekang/lu-music.git gh-pages &&
cd -
