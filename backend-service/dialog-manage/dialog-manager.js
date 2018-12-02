var dialogJSON = require('../compiled-dialog/dialog.json');
var jsonQuery = require('json-query');

var data = dialogJSON;


async function getDialogID(intent,ongoingID){
    if(intent===undefined || intent===null){
        return "cannot_understand";
    }
    var wildcard=""
    if(ongoingID!=null&&ongoingID!=undefined){
        wildcard='&&dialog_id~'+ongoingID+'.'
    }

    var dialogId = jsonQuery('dialog[intent = '+intent+wildcard+'].dialog_id', {data:data}).value
    if(dialogId!=null){
        return dialogId;
    }else{
        var idarr = ongoingID.split(".");
        idarr.pop();

        if(idarr.length>=1){
            return await getDialogID(intent,idarr.join("."));
        }else{
            dialogId = jsonQuery('dialog[intent = '+intent+'].dialog_id', {data:data}).value
            if(dialogId!=null){
                return dialogId;
            }else{
                return "cannot_understand";
            }
            
        }
    }
}


module.exports.dialog = async function(message){
    var dialogID = "";
    filledEntCont =  message.context.filledEnt || "";
    tobefilledEntCont = message.context.tobefilledEnt || "";

    if (message.context.ongoingNode===undefined || message.context.ongoingNode===false){
        if(message.watsonData.intents.length < 1 && (message.watsonData.entities.length < 1|| message.watsonData.entities.length > 0)){
            dialogID = "cannot_understand";
        }
       
        else if(message.context.intents[0].confidence < 0.5 ){
            dialogID = "cannot_understand";
        }else{
     
            dialogID = await getDialogID(message.context.intents[0].intent,message.context.dialog_id);
            message.context.dialog_id = dialogID;
   
        }
      
    }
    else{
        dialogID = message.context.dialog_id;
    }


    var dialogresponse = await gothruDialog(dialogID, message);

    var ifInvalidRes = jsonQuery('dialog[dialog_id = '+message.context.dialog_id+'].entities[entity = '+ filledEntCont[filledEntCont.length-1] +'].invalid_response', {data:data}).value;
    var origBotRes = jsonQuery('dialog[dialog_id = '+message.context.dialog_id+'].entities[entity = '+ filledEntCont[filledEntCont.length-1] +'].response.en', {data:data}).value;
    var followUpRes =[ifInvalidRes + "\n" + origBotRes];

    if(message.watsonData.entities.length < 1 && filledEntCont.length > 0 && message.context.ongoingNode == true){
        dialogresponse.response = ifInvalidRes;
    } 
    else if((message.watsonData.entities.length > 0 && (tobefilledEntCont.length > 0) || filledEntCont.length > 0) && message.context.ongoingNode == true){
        if (message.watsonData.entities[0].entity != filledEntCont[filledEntCont.length -1]){
            dialogresponse.response = ifInvalidRes;
        }
    }
    message.context.ongoingNode = dialogresponse.ongoingStatus;
    message.context = dialogresponse.context;
    message.response = dialogresponse.response;

    return ({"message":message})
    
}

var gothruDialog = async function(dialogID, message){
    var res;
    var input = {"input_entities":""}
    var filledEnt=[];
    var tobefilledEnt=[];
    var ongoingStatus;
    
    var context = {};
    input.input_entities = message.context.entities;

    var requiredEnt = jsonQuery('dialog[dialog_id = '+dialogID+'].entities[*].entity', {data:data}).value;
    if (requiredEnt.length > 0){
        var inputEnt =  jsonQuery('input_entities[*].entity', {data:input}).value;

        filledEnt = requiredEnt.filter(value => -1 !== inputEnt.indexOf(value));
        tobefilledEnt = requiredEnt.filter(function(obj) { return inputEnt.indexOf(obj) == -1; });

        if(tobefilledEnt.length > 0){
            res = jsonQuery('dialog[dialog_id = '+dialogID+'].entities[entity ='+tobefilledEnt[tobefilledEnt.length-1]+'].response', {data:data}).value;
            filledEnt.push(tobefilledEnt[tobefilledEnt.length-1]);
            tobefilledEnt.pop();
            ongoingStatus = true;
            
        }
        else{
            res = jsonQuery('dialog[dialog_id = '+dialogID+'].response', {data:data}).value
            ongoingStatus= false;
           
        }
        context= message.context;
    }
    else{
        res = jsonQuery('dialog[dialog_id = '+ dialogID + '].response',{data:data}).value;
        ongoingStatus=false;
        context= message.context;
    }

    context.filledEnt = filledEnt;
    context.tobefilledEnt = tobefilledEnt;
    return ({"response":res, "context": context, "ongoingStatus":ongoingStatus});
    
}

module.exports.gothruDialog = gothruDialog;