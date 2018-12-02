git init
git remote add origin https://github.com/devHybrid0306/Chatbot-Platform.git
Y=2018
M=12
D=02
i=4
export GIT_COMMITTER_DATE="$Y-$M-$D 12:0$i:00"
export GIT_AUTHOR_DATE="$Y-$M-$D 12:0$i:00"
git add .
git commit -m 'initial commit'
git push -u origin master