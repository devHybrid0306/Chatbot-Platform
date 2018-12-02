var assessment = require('./assessment-manager');
var jsonQuery = require('json-query');
var request = require('request');
var dialogJSON = require('../compiled-dialog/dialog.json');
var tasksJSON = require('../skills/tasks-data/tasks.json');
var profileJSON = require('../dialogue/profile.json');
var data = dialogJSON;

exports.after =  async function(message){
        var action = "";
        if(message.message.response != null && message.message.response != undefined){
            action = message.message.response.action
        }
        
        var dialogID = message.message.context.dialog_id;
        var input = message.message.context.input;
        var context = message.message.context;
        var watsonEnt = jsonQuery('message.watsonData.entities[*].entity', {data:message}).value;
        var intent = jsonQuery('message.watsonData.intents[0].intent', {data:message}).value;
        var jsonComp={};

        if(action==="assesment"){
            var tobefilledAs = [];
            if(context.doneAssessment !== undefined && context.doneAssessment !== null){
                tobefilledAs = context.doneAssessment;
            }
            else{
                tobefilledAs = jsonQuery('dialog[dialog_id = '+dialogID+'].assess.assessment', {data:data}).value || "";
            }
            
                var assessmentObj = await assessment.assessment(tobefilledAs,message.message.context);
                
                context = assessmentObj.context;
                message.message.response = assessmentObj.response;
                context.ongoingNode = assessmentObj.ongoingStat;
                
            if(tobefilledAs.length == 0){
                context.doneAssessment = undefined;
                message.message.response = jsonQuery('dialog[dialog_id = '+ dialogID + '].assesment_response['+ message.message.context.score +']', {data:data}).value;
                context.score=undefined;
                context.ongoingNode = false;
            }
        }
        if(watsonEnt.includes("uae_phone_number") == true){
            context.phonenumber = input;
        }

        if(watsonEnt.includes("sys-person") == true){
            context.username = input;
        }

        if(watsonEnt.includes("language") == true){
            context.preferredlanguage = input;
        }
        if(watsonEnt.includes("country") == true){
            context.country = input;
        }
        if(watsonEnt.includes("gender") == true){
            context.gender = input;
        }
        if(watsonEnt.includes("age") == true){
            context.age = input;
        }
        if(watsonEnt.includes("work_started") == true){
            context.yearsofexperience = input;
        }
        if(watsonEnt.includes("task") == true){
            context.tasks = input;
        }
        if(watsonEnt.includes("occupation") == true){
            context.occupation = input;
        }
        if(watsonEnt.includes("monthly_income") == true){
            context.monthlyincome = input;
        }

        if(context.setpwflag == true){

            passwordString = context.input;
            passwordConverted = passwordString.replace('|', ','); 
            passwordString = passwordConverted.split(",");

            jsonComp = {
                json: {
                    "userid": context.userid,
                    "password": passwordString[0]
                }
            }

            await postReq(jsonComp);
           
            context.setpwflag=undefined;
            message.message.response = jsonQuery('dialog[dialog_id = passwordSetRes].response', {data:data}).value;
            
        }

        if(context.univdegreeflag == true){
            univdegree = context.input;
            jsonComp = {
                json: {
                    "userid": context.userid,
                    "univdegree": univdegree
                }
            }

            await postReq(jsonComp);
            context.univdegreeflag = undefined;
            message.message.response = jsonQuery('dialog[dialog_id = profile_dialog.1.0.1.1.0].response', {data:data}).value; 
            
        }

        if(context.certificationflag == true){
            coursecerttaken = context.input;
            jsonComp = {
                json: {
                    "userid": context.userid,
                    "coursecerttaken": coursecerttaken
                }
            }

        await postReq(jsonComp);
            context.certificationflag = undefined;
            message.message.response = jsonQuery('dialog[dialog_id = profile_dialog.1.0.1.1.0].response', {data:data}).value; 

        }

        if(intent == "hs_grad" ){
            context.ifhsgrad = true;
        }
        if( intent == "not_hs_grad" ){
            context.ifhsgrad = false
        }

        if(intent == "univ_grad" ){
            context.ifunivgrad = true;
        }

        if(intent == "not_univ_grad" ){
            context.ifunivgrad = false;
        }

        if(intent == "learnt_on_job" || intent == "course_cert" ){
            context.skillsacquisition = input;
        }

        if(intent === "set_password"){
            context.setpwflag = true;
        }

        if(intent === "univ_grad"){
            context.univdegreeflag = true;
        }

        if(intent === "course_cert"){
            context.certificationflag = true;
        }

        if(action == "filterTasks"){
            var tasks = jsonQuery('tasks[job = '+ context.occupation + '].taskList', {data:tasksJSON}).value;

            var tasksActionArray = [];
            for (var i = 0; i<tasks.length; i++){
                tasksActionArray[i] = {"title":tasks[i], "payload": tasks[i]}
            }
            var templateRes = jsonQuery('dialog[dialog_id = responseTemplate].template[0].response', {data:profileJSON}).value

            templateRes.attachments[0].body[0].actions = tasksActionArray;
            message.message.response = templateRes;
                
        }

        if (action == "register" || action == "profile" || action == "learnsomething") {
            
            jsonComp = {
                json: {
                    "userid": context.userid,
                    "preferredlanguage": context.preferredlanguage,
                    "country": context.country,
                    "username": context.username,
                    "phonenumber": context.phonenumber,
                    "occupation": context.occupation,
                    "tasks": context.tasks,
                    "yearsofexperience": context.yearsofexperience,
                    "monthlyincome": context.monthlyincome,
                    "ifhsgrad": context.ifhsgrad,
                    "ifunivgrad":context.ifunivgrad,
                    "skillsacquisition" : context.skillsacquisition,
                    //"age": context.age,
                    //"gender": context.gender,
                    "currentcourse": null,
                    "lastcourse": null,
                    "listofcompletedcourses": []
                }
            }

            await postReq(jsonComp);
        }

        return message;
  
}

async function postReq(jsonComp){
    await request.post(process.env.DB_SERVICE_URL + '/api/insertone', jsonComp, (error, res, body) => {
        if (error) {
        } 

    })
}
