 #!/usr/bin/env sh

rm -rf dist &&
yarn build &&
serve dist
#cd dist &&
#git init &&
#git add . &&
#git commit -m "update" &&
#git branch -M master &&
#git remote add origin git@github.com:adekang/vue_beans-ui-web.git &&
#git push -f -u origin master &&
#cd -
