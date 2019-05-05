const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'xacco_db';
const flat_collection = 'flats';


let mongoObj = function () {
    this.obj = new Object();
    var referenceForMongoObj = this.obj;
    this.retriesLeft = 3;
    this.add = (key, val) => {
        this.obj[key] = val;
        return this;
    };
    this.getObject = () => {
        return this.obj;
    }
    this.save = () => {
        //TODO : mongo save goes here
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db(dbName);
            var myobj = referenceForMongoObj;
            dbo.collection(flat_collection).insertOne(myobj, function (err, res) {
                if (err) throw err;
                console.log(myobj, " document inserted");
                db.close();
            });
        });
    }
};

module.exports = {
    obj : mongoObj
};