const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const uri = 'mongodb://localhost:27017';
let _db

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

// Find a document in the MongoDB
const findDocuments = function(db, callback) {
    // Get the documents collection

    const collection = db.collection('documents');

    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
    });
}

// Inserts a document in the MongoDB
const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
      {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    });
}


// Find a document with querys in the MongoDB
const findDocumentsWithQuery = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Find some documents
    collection.find({'a': 3}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
}

// Updates a document with the MongoDB
const updateDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Update document where a is 2, set b equal to 1
    collection.updateOne({ a : 3 } , { $set: { c : 3 } }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Updated the document with the field a equal to 2");
        callback(result);
    });  
}

// Updates a document with the MongoDB
const removeDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Update document where a is 2, set b equal to 1

    collection.remove({});

    /* collection.remove({ a : 1 } , function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Remove the document with the field a equal to 1");
        callback(result);
    });   */
}

module.exports = { connectDB, getDB, disconnectDB, findDocuments, insertDocuments, findDocumentsWithQuery, updateDocument, removeDocument }