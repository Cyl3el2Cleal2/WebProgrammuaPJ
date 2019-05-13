const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://gigabug:gigabug1234@ds141351.mlab.com:41351/gigabug";
app.use(bodyParser.json());

//insert
app.post("/api/sSell", (req, res) => {
    var data = {
        "license_plate": req.body.id
    }
    // var c1, c2, c3, c4, c5, c6;

    console.log(data)
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");
        dbo.collection("MST_stock").find(data).toArray((err, result) => {
            console.log('Get: '+result);
            if (err) {
                console.log(err)
                res.sendStatus(404)
                res.send('false')
            } else {
                if(result[0] == null){
                    console.log('No data');
                    res.send('false');
                }else{
                    console.log(result)
                    res.send(result);
                }
                
            }

        });
    });

})
module.exports = app;
