const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('./mongoclient-driver');
require('dotenv').config();


// Use the middlewares
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// Cors Config
const allowedOrigins = [process.env.ALLOWED_CORS_ORIGIN];


app.use(cors());


// respond with records
app.get('/', function (req, res) {
    
    MongoClient.connectDB(async (err,db) => {
        // Server code anywhere above here inside connectDB()
        console.dir('inside app.js => connectDB()');
        db_collection = db.db(process.env.MONGODB_NAME);
        MongoClient.findDocuments(db_collection, function() {
            db.close();
        });
    });

    res.send('Response success..');
})

// POST method route
// Insert a record to Mongodb
app.post('/api/insertone/', function (req, res) {
 
    MongoClient.connectDB(async (err,db) => {
        // Server code anywhere above here inside connectDB()
        console.dir('inside app.js => /api/insertone/');
        let db_collection = db.db(process.env.MONGODB_NAME);
        
        //Object to store
        jsondata = req.body;
        MongoClient.insertOneDocument(db_collection, jsondata, function() {
            db.close();
        });
    });

    res.send('POST request done')
});

// POST method route
// Update a record to Mongodb
app.post('/api/updateone/', function (req, res) {
 
    MongoClient.connectDB(async (err,db) => {
        // Server code anywhere above here inside connectDB()
        console.dir('inside app.js => /api/updateone/');
        let db_collection = db.db(process.env.MONGODB_NAME);
        let userid = req.body.userid;
        let userattributes = req.body;
        MongoClient.updateOneDocument(db_collection, userid, userattributes, function() {
            db.close();
        });
    });

    res.send('POST request done')
});

// POST method route
// Update a record to Mongodb
// Consumed by the UI Mobile that is why we get the parameter by req.query
app.post('/api/updateone/uimobile', function (req, res) {
 
    MongoClient.connectDB(async (err,db) => {
        // Server code anywhere above here inside connectDB()
        console.dir('inside app.js => /api/updateone/');
        let db_collection = db.db(process.env.MONGODB_NAME);
        let userid = req.query.userid;
        let userattributes = req.query;
        MongoClient.updateOneDocument(db_collection, userid, userattributes, function() {
            db.close();
        });
    });

    res.send('POST request done')
});

// POST method route
// Update a record to Mongodb
app.post('/api/updateone/appendcompletedcourse/', function (req, res) {
 
    MongoClient.connectDB(async (err,db) => {
        // Server code anywhere above here inside connectDB()
        console.dir('inside app.js => /api/updateone/appendcompletedcourse/');
        let db_collection = db.db(process.env.MONGODB_NAME);
        let userid = req.body.userid;
        let userattributes = req.body.listofcompletedcourses[0];
        MongoClient.updateOneDocumentArray(db_collection, userid, userattributes, function() {
            db.close();
        });
    });

    res.send('POST request done')
});


// POST method route
// Remove a record to Mongodb
app.post('/api/removeall/', function (req, res) {
 
    MongoClient.connectDB(async (err,db) => {
        // Server code anywhere above here inside connectDB()
        console.dir('inside app.js => /api/removeall/');
        let db_collection = db.db(process.env.MONGODB_NAME);

        MongoClient.removeDocument(db_collection, function() {
            db.close();
        });
    });

    res.send('POST request done')
});


// POST method route
// Remove a record to Mongodb
app.post('/api/removeonedocument/', function (req, res) {
 
    MongoClient.connectDB(async (err,db) => {
        // Server code anywhere above here inside connectDB()
        console.dir('inside app.js => /api/removeonedocument/');
        let db_collection = db.db(process.env.MONGODB_NAME);
        let userid = req.body.userid;

        MongoClient.removeOneDocument(db_collection,userid, function() {
            db.close();
        });
    });

    res.send('POST request done')
});




// GET method route
// Check whether a user exist in the record to Mongodb
// Sends Boolean String
app.post('/api/loginauth', function (req, res) {
    MongoClient.connectDB(async (err,db) => {    
        // Server code anywhere above here inside connectDB()
        console.dir('inside app.js => /api/loginauth');
        if (!err) {
            let db_collection = db.db(process.env.MONGODB_NAME);
            let userattributes = {};
            userattributes.phonenumber = req.query.phonenumber;
            userattributes.password = req.query.password;
            MongoClient.loginAuthentication(db_collection, userattributes, function(data) {
                res.send(data);
            });
        } else {
            res.send('False');
        }
        db.close();
    });
});


// Post method route
// Check whether a user exist in the record to Mongodb

app.post('/api/getuserprofile/', function (req, res) {
    console.dir(req);
    MongoClient.connectDB(async (err,db) => {    
        // Server code anywhere above here inside connectDB()
        console.dir('inside app.js => getuserprofile()');
        let jsondata = '';
        let db_collection = db.db(process.env.MONGODB_NAME);

        jsondata = req.body;
        MongoClient.getUserProfile(db_collection, jsondata, function(result) {
            res.send(result);
            db.close();
        });

    });
});




// create server
server = http.createServer(app).listen( process.env.PORT || 3001 );


// Tell the application to listen on port
// Global Port Configuration
app.listen(app.get('port'), function () {
	console.log('** Server Running');
	console.log('**** Service is listening on port: ' + server.address().port );
});
