var config = require('./config.json');

var fs =  require("fs");
var envfile = "";
var installcommands = "";
installcommands = "#!/bin/bash\n"
//installcommands = installcommands + "git clone https://github.com/islanderz/taskerapp-master/backend-service/backend-service.git; \n";
installcommands = installcommands + "npm install ./backend-service/; \n"
if(config.redis.local === true){
    installcommands = installcommands + "git clone https://github.com/islanderz/taskerapp-master/session-service/session-service.git; \n";
    installcommands = installcommands + "cd session-service; \n"
    installcommands = installcommands + "cd redis; \n"
    installcommands = installcommands + "cd redis-4.0.9/; \n"
    installcommands = installcommands + "make; \n"
    envfile = envfile+"REDIS_HOST=127.0.0.1\n"
    envfile = envfile+"REDIS_PORT=6379\n"
}else{
    envfile = envfile+"REDIS_HOST="+config.redis.host+"\n"
    envfile = envfile+"REDIS_PORT="+config.redis.port+"\n"
}

if(config.use_watson===true){
    envfile = envfile+"WATSON_IAM_KEY="+config.NLP.watson.iam_apikey+"\n"
    envfile = envfile+"WATSON_URL="+config.NLP.watson.url+"\n"
    envfile = envfile+"WATSON_VERSION="+config.NLP.watson.version+"\n"
}

fs.writeFile("./backend-service/.env", envfile, (err)=>{
    if(err) console.log(err);
    console.log("backend env file write success");
});

fs.writeFile("install.sh", installcommands, (err)=>{
    if(err) console.log(err);
    console.log("install commands file write success");
});