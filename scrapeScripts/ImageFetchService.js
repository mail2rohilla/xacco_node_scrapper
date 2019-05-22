var exec = require('child_process').exec, child;
const MongoClient = require('mongodb').MongoClient;


const url = 'mongodb://localhost:27017';
const dbName = 'xacco_db1';
const flat_collection = 'flats';
var getRecords = ()=>{
    return new Promise(function(resolve, reject) {
        MongoClient.connect(url,function (err, db) {
            if (err) throw err;
            var dbo = db.db(dbName);
            dbo.collection(flat_collection).find({}).toArray(function(err, result) {
                if (err) throw err;
                console.log(result.length);
                // db.close();
                if(result.length> 0)
                    resolve(result);
                else
                    reject();
            })
        });
    });
};


getRecords().then(function (flatsRecords) {
    for(let i =0; i< flatsRecords.length; i++){
        console.log(flatsRecords[i].imagesDirectory);
        for(let j =0; j < flatsRecords[i].images.length; j++){
            exec('wget -P ' + flatsRecords[i].imagesDirectory + ' ' + flatsRecords[i].images[j],
                function (error, stdout, stderr) {
                    console.log('successful : ' + stdout  +  " : for -> " + flatsRecords[i].images[j]);
                    console.log('stderr: ' + stderr);
                    if (error !== null) {
                        console.log('error: couldnot download ' + flatsRecords[i].images[j] + " : " + error);
                    }
                });
        }
        for(let j =0; j < flatsRecords[i].galleryImages.length; j++){
            exec('wget -P ' + flatsRecords[i].galleryImagesDirectory + ' ' + flatsRecords[i].galleryImages[j],
                function (error, stdout, stderr) {
                    console.log('successful : ' + stdout  +  " : for -> " + flatsRecords[i].galleryImages[j]);
                    console.log('stderr: ' + stderr);
                    if (error !== null) {
                        console.log('error: couldnot download' + flatsRecords[i].galleryImages[j]);
                    }
                });
        }
    }
});
