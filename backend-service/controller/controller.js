const getMessage = require('../service/watson-service').getMessage;
const dialog = require('../dialog-manage/dialog-manager')
var before = function(params){
    return new Promise(resolve => {
        resolve(params);
    });
}

function sendToService(params, session){
    return new Promise(function(resolve, reject){
        var message = JSON.parse(params);
        var out = {};
    session.getContext(message.userid).then(context => {
        if (context === undefined || context === null) {
            var currdate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            context = {
                "userid":message.userid,
                "created_at":currdate,
                "entities":[]
            }
            out["context"] = context;
           }else{
            out["context"] = context;
           }
           out.context.input = message.input;
        getMessage(message)
        .then(output => {
            context.entities = session.mergeEntities(context.entities, output.entities,"entity")
            out["watsonData"] = {};
            out["watsonData"]["intents"] = output.intents;
            out["watsonData"]["entities"] = output.entities;
            out["watsonData"]["input"] = output.input;
            if(output.intents.length>0){
                context["intents"] = output.intents;
            }
            
            
            session.setContext(message.userid,context).then(function(res){
                resolve(out)
            });
            
            })
    })
    
    })
}
var after = function(dialogresponse){
    return new Promise(resolve =>{
        resolve(dialogresponse);
    })
}

exports.before = function(custombefore){
    before = custombefore;
}

exports.after = function(customafter){
    after = customafter;
}

exports.ask = async(params, session, bot) => {
        params = await before(params);
        var out = await sendToService(params, session)
        
        var dialogresponse = await dialog.dialog(out);
        var message = await after(dialogresponse);
        if(message.message.response.forward_node !== undefined && message.message.response.forward_node !== null){
           dialogresponse = await dialog.gothruDialog(message.message.response.forward_node, out);
           dialogresponse.context.dialog_id = message.message.response.forward_node;
           dialogresponse.context.ongoingNode = dialogresponse.ongoingStatus;
           message = await after({"message":dialogresponse});
        }
        
        await session.setContext(message.message.context.userid,message.message.context);
        await multisend(bot, message);
        
    
};

async function multisend(bot, message){
    let msg = message;
    let textmessage = msg.message.response.en;
    let textarr = textmessage.split(":br:");
    var x;
    
   
    for(x=0;x<textarr.length;x++){
        let resp = {
            "message":{
                "response":{
                    "en":"",
                    "ar":""
                    }
                
                }
            };
        resp.message.response.en = textarr[x];
        bot.sendUTF(JSON.stringify(resp));
    }
    
    if(msg.message.response.attachments!=undefined){
        var att = {
            "message":{
                "response":{
                    "en":"",
                    "ar":"",
                    "attachments":[]
                    }
                
                }
            };
        att.message.response.attachments = msg.message.response.attachments;
        bot.sendUTF(JSON.stringify(att));
    }

    if(msg.message.response.quick_replies!=undefined){
        var qr = {
            "message":{
                "response":{
                    "en":"",
                    "ar":"",
                    "quick_replies":[]
                    }
                
                }
            };

        qr.message.response.quick_replies = msg.message.response.quick_replies;
        bot.sendUTF(JSON.stringify(qr));
    }
    
    
}