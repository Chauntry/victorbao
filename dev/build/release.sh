msg='release'

if [ -n "$1" ]
then
    msg=$msg$1
fi

npm run lint
if [ $? -eq 0 ]
then
  echo "$(tput setaf 3)eslint ok, you code is cool\!"
  npm run build
  git add ../static/ ../index.html ./
  git commit -m $msg
  git rebase master
  git push origin dev
  git checkout master
  git merge dev
  git push origin master
  git checkout dev
else
  echo "$(tput setaf 1)eslint fail, check you code!\!"
fi
