/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const express = require('express');
const path = require('path');
const MongoClient = require('../middleware/mongodb-driver');
//const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
  

module.exports = function(controller) {

    // make public/index.html available as localhost/index.html
    // by making the /public folder a static/public asset
    controller.publicFolder('/', path.join(__dirname,'..','public'));

    // Connect to MongoDB and put server instantiation code inside
    // because we start the connection first
    MongoClient.connectDB(async (err,db) => {
        assert.equal(null, err);
        // Server code anywhere above here inside connectDB()
        console.dir('inside chat.js => connectDB()');
        
        db_collection = db.db('test');
        /* MongoClient.findDocuments(db_collection, function() {
            db.close();
        }); */


        /* MongoClient.removeDocument(db_collection, function() {
            db.close();
        }); */


    });

    console.log('Chat with me: http://localhost:' + (process.env.PORT || 3000));

}






