var port = "6379";
var host = "127.0.0.1";
var redis = require("redis");
client = redis.createClient(port, host);

client.on("error", function(err){
    console.log("Error "+err)
});

client.on('connect', function() {
    console.log('Redis client connected');
});

module.exports.session = {
    setContext:function(userid, contextObject){
        client.set(userid,JSON.stringify(contextObject), 'EX', 600);
    },
    getContext:function(userid){
        return new Promise(function(resolve, reject){
            client.get(userid, function(error, contextObject){
                if (error) {
                    console.log(error);
                    throw error;
                }
                
                resolve(JSON.parse(contextObject));
               
                
            })
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