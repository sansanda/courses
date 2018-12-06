const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

function checkDatabaseExistence(_db,_dbname)
{
    _db.admin().listDatabases(function(err, result) {
        var ret = JSON.stringify(result.databases).includes("\"name\":"+"\""+_dbname+"\"");
        assert.equal(ret,true,"Inexistent Database: name = "+_dbname+" !!!!");
        //throw new Error("Something went badly wrong!");
    });
}

function dbConnectResult(err,client) {

    assert.equal(err,null,err);
    console.log('Connected correctly to server');
    const db = client.db(dbname);
    
    checkDatabaseExistence(db,dbname);


    const collection = db.collection('dishes',(error,collection)=>{
        assert.equal(err,null,'error fetching the collection');    
    });


    collection.insertOne({"name":"Uthapizza","description":"Test"},(err,result)=>{
        assert.equal(err,null);
        console.log('After insert\n');
        console.log(result.ops);
        collection.find({}).toArray((err,docs)=>{
            assert.equal(err,null);
            console.log('Found\n');
            console.log(docs);
            db.dropCollection('dishes',(err,result)=>{
                assert.equal(err,null,'Error dropping dishes collection');
                client.close();
            });
        });    
    });
}

MongoClient.connect(url,{ connectTimeoutMS: 5000 },dbConnectResult);
