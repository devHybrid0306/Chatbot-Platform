const request = require('request');

module.exports.session = {
    

    setContext: function (userid, contextObject){
        return new Promise(resolve =>{
            var options = {
                uri: process.env.SESSION_URL + '/setContext',
                method: 'POST',
                json: {"userid":userid, "contextObject": contextObject}
              };
    
              request(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve("success") 
                }
              });
        })
        
    },


    getContext:function (userid){
        return new Promise(function(resolve, reject){
            request(process.env.SESSION_URL + "/getContext?userid="+ userid, function (error, response, body) {
                
                try{
                    //console.log("got it")
                    //console.log(JSON.parse(body))
                    resolve(JSON.parse(body))
                }catch(err){
                    //console.log("undefined")
                    resolve(undefined)
                }
                
              });
            
           
        })        
    },
    mergeEntities:function(a, b, prop){
        var reduced = a.filter(function(aitem){
            return ! b.find(function(bitem){
                return aitem[prop] === bitem[prop];
            });
        });
        return reduced.concat(b);
      }

}

