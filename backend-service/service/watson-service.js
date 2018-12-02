var  AssistantV1 = require('ibm-watson/assistant/v1');
require('dotenv').config();

const assistant = new AssistantV1({
    iam_apikey: process.env.WATSON_IAM_KEY,
    url: process.env.WATSON_URL,
    version: process.env.WATSON_VERSION
});

console.log(assistant._options);
console.log("WORKSPACEID: " + process.env.WATSON_WORKSPACE_ID);
console.log("SESSIONURL: " + process.env.SESSION_URL);
console.log("MONGODBURL: " + process.env.DB_SERVICE_URL);

exports.getMessage = body =>
  new Promise((resolve, reject) => {
    assistant.message(
      {
        input:{
            text:body.input
        },
        workspace_id: process.env.WATSON_WORKSPACE_ID
     
        
      },
      
      function(err, response) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(response);
        }
      }
      
    );

  });
