const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
require('dotenv').config();
const uri = process.env.MONGODB_URL;
let _db;


// Connect to the MongoDB
const connectDB = async (callback) => {
    try {
        MongoClient.connect(uri, { useNewUrlParser: true }, (err, db) => {
            _db = db
            return callback(err,_db)
        })
    } catch (e) {
        throw e
    }
}

// Gets Database Instance
const getDB = () => _db

// Disconnect to the Database
const disconnectDB = () => _db.close()

// Find all data in document in the MongoDB
const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');

    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.dir(docs)
        callback(docs);
    });
}

// Inserts a document in the MongoDB
const insertOneDocument = function(db, jsondata, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    
    collection.find({userid:jsondata.userid}).toArray(function(err, docs) {
        
        assert.equal(err, null);
        
        if (docs.length == 0) {
            console.log("Inserting record.");
            collection.insertOne(jsondata, function(err, result) {
                assert.equal(err, null);
                console.log("Inserted 1 documents into the collection");
                callback(result);
            })           
        } else {
            console.dir('There is existing record');
            var usrid = jsondata.userid;
            collection.updateOne({userid:usrid}, { $set: jsondata},{ upsert: true }, function(err, result) {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                console.log("Updated the document with the field a equal to 1");
                callback(result);
            });
        }
        
    });
}

// Updates a document with the MongoDB
// Consumed by the UI Mobile
const updateOneDocument = function(db, usrid, updateobjects, callback) {

    // Get the documents collection
    const collection = db.collection('documents');    

    collection.updateOne({userid:usrid}, { $set: updateobjects},{ upsert: true }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Updated the document with the field a equal to 1");
        callback(result);
    });

}


// Updates a document and Appends Array to Completed Course
// with the MongoDB
const updateOneDocumentArray = function(db, usrid, pushobjects, callback) {

    // Get the documents collection
    const collection = db.collection('documents');    
    console.log('pushobjects');
    console.log(pushobjects);
    collection.updateOne({userid:usrid}, { $addToSet: {listofcompletedcourses: pushobjects}}, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Updated the document with the field a equal to 1");
        callback(result);
    });

}


// Updates a document with the MongoDB
const removeOneDocument = function(db, usrid, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Update document where a is 2, set b equal to 1

    collection.remove({userid:usrid},function(err,result) {
        callback(result)
    });
    
}


// Updates a document with the MongoDB
const removeDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Update document where a is 2, set b equal to 1

    collection.remove({});
}


/**
 * Login Authentication API
 */

// Find a document in the MongoDB
const loginAuthentication = function(db, jsondata,  callback) {
    
    // Get the documents collection
    const collection = db.collection('documents');

    // Query the user record documents
    collection.find({$and:[{"phonenumber":jsondata.phonenumber},{"password":jsondata.password}]}).toArray(function(err, docs) {
        assert.equal(err, null);
        
        if (!err) {
            let jsonOb = {};
            if (docs.length) {
                console.log("Record found.");
                console.dir(docs);
                console.dir(docs[0].userid);
                jsonOb.auth = 'True';
                jsonOb.userid = docs[0].userid;
                callback(JSON.stringify(jsonOb));
            } else {
                console.log("No record found.");
                jsonOb.auth = 'False';
                callback(JSON.stringify(jsonOb));
            }
        } else {
            jsonOb.auth = 'False';
            callback(JSON.stringify(jsonOb));
        }
    });
}



// Find a document in the MongoDB
const getUserProfile = function(db, jsondata, callback) {

    // Get the documents collection
    const collection = db.collection('documents');

    // Find some documents

    let myDocument = collection.findOne(
        { phonenumber: jsondata.phonenumber },
        { projection: { _id:0, password: 0} }
    );

    if (myDocument) {
        myDocument.then(function(result){
            callback(JSON.stringify(result));
        })
    }
}


module.exports = { 
    connectDB, 
    getDB, 
    disconnectDB, 
    findDocuments, 
    insertOneDocument,
    updateOneDocument,
    updateOneDocumentArray,
    removeOneDocument,
    removeDocument,
    loginAuthentication,
    getUserProfile
}