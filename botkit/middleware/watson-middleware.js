var watson =  require('botkit-middleware-watson');
var Botkit = require('botkit');


const watsonMiddleware = new watson.WatsonMiddleware({
    iam_apikey: process.env.WATSON_API_KEY,
    url: process.env.WATSON_URL,
    workspace_id: process.env.WATSON_WORKSPACE_ID,
    version: '2018-07-10'
});

watsonMiddleware.after = (message, assistantResponse) => {
    var action = assistantResponse.output.action
    var quick_reply = assistantResponse.output.quick_reply

    if(action==="query"){
        assistantResponse.output.text = ["querying data"]
        assistantResponse.output["quick_replies"] = quick_reply;
        
    }

    return assistantResponse
}


module.exports.middleware = watsonMiddleware;