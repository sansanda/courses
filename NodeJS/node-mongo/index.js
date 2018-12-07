const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./dbOperations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

function checkDatabaseExistence(_db,_dbname)
{
    //WARNING!!!! The database could exists but no collection could be inside it!!!
    _db.admin().listDatabases(function(err, result) {
        console.log(result);
        var ret = JSON.stringify(result.databases).includes("\"name\":"+"\""+_dbname+"\"");
        assert.equal(ret,true,"Inexistent Database: name = "+_dbname+" !!!!");
        //throw new Error("Something went badly wrong!");
    });
}

MongoClient.connect(url,{ connectTimeoutMS: 5000 })
.then((client)=>{
    console.log('Connected correctly to server');
    const db = client.db(dbname);
    dboper.insertDocument(db, { name: "Vadonut", description: "Test"},"dishes")
    .then((insertDocumentResult)=>{
        console.log("Insert Document:\n", insertDocumentResult.ops);
        return dboper.findDocuments(db, "dishes");
    })
    .then((foundDocs) => {
        console.log("Found Documents:\n", foundDocs);
        return dboper.updateDocument(db, { name: "Vadonut" },{ description: "Updated Test" }, "dishes");
    })
    .then((updateResult) => {
        console.log("Updated Document:\n", updateResult.result);
        return dboper.findDocuments(db, "dishes");
    })
    .then((foundDocs) => {
        console.log("Found Updated Documents:\n", foundDocs);                
        return db.dropCollection("dishes");
    })
    .then((dropResult) => {
        console.log("Dropped Collection: ", dropResult);

        return client.close();
    })
    .catch((err) => console.log(err));  
})
.catch((err)=>{console.log(err);});
