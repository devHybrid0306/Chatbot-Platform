var assessmentJSON = require('./assesment-data/assessments.json');
var jsonQuery = require('json-query');
var dialogJSON = require('../compiled-dialog/dialog.json');
var data = dialogJSON;

module.exports.assessment = function(tobefilledAs,context){
    return new Promise(resolve => {
        var input = context.input;
    var score = 0;
    var dialogID = context.dialog_id;
    var res = {};
    
    var answer = jsonQuery('assessments[assessment = '+ tobefilledAs[0] +'].answer', {data:assessmentJSON}).value;

    if(context.score !== undefined && context.score !== null){
        score = context.score;
        tobefilledAs.shift();
    }
    
    if(input == answer || input.localeCompare(answer) == 0){
        score ++;
    }
    else{
        score = score;
    }
    context.answer = answer;
    
    if(tobefilledAs.length > 0){
        
        res = jsonQuery('assessments[assessment = '+ tobefilledAs[0] +'].question', {data:assessmentJSON}).value;
        
        

    }    
    context.doneAssessment = tobefilledAs;

    context.score = score;
    resolve({"response":res,"ongoingStat":true, context});
    })
    

    
}