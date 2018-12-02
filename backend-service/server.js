

const fs = require('fs');
const path = require('path');
__dirname = path.resolve();
const dir = path.join(__dirname, 'dialogue');

let finalContent = { "dialog": []};
const read_directory = async dir =>
    fs.readdirSync(dir).reduce((finalContent, file) => {
        filePath = path.join(dir, file);
        let content = require(filePath);
        finalContent.dialog = finalContent.dialog.concat(content.dialog);
        return finalContent;
    }, { "dialog": [] });

read_directory(dir).then(data => {
    fs.writeFileSync('./compiled-dialog/dialog.json', JSON.stringify(data));
    startup();
});

function startup(){
  var WebSocketServer = require('websocket').server;
  var http = require('http');
  const controller = require('./controller/controller');
  const after = require('./skills/after-service').after
  controller.after(after);
  var server = http.createServer(function(request, response) {
  });
  const session = require('./session-management/session-service').session;
  
  
  
  
  server.listen(443, function() {
    console.log("Connected..")
   });
  
  // create the server
  wsServer = new WebSocketServer({
    httpServer: server
  });
  
  wsServer.on('request', function(request) {
    var bot = request.accept(null, request.origin);
  
  
    bot.on('message', function(message) {
   
      if (message.type === 'utf8') {
        //console.log("****" + message.utf8Data)
          controller.ask(message.utf8Data, session, bot)
        
      }
    });
  
    bot.on('close', function(connection) {
       // console.log(bot)
      // close user connection
    });
  });
}

