const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://gigabug:gigabug1234@ds141351.mlab.com:41351/gigabug";
app.use(bodyParser.json());

//insert
app.post("/api/insertToDB", (req, res) => {
    var data = {
        ID_TRNmaintennance_detail_repairman: req.body.ID_TRNmaintennance_detail_repairman,
        date: req.body.date,
        carLicense: req.body.carLicense,
        carModel: req.body.carModel,
        carColor: req.body.carColor,
        ID_MST_employee: req.body.ID_MST_employee,
        carSpare: req.body.carSpare,
    }

    console.log(data)
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");



        dbo.collection("TRN_maintennance_detail_repairman").insert(data, (err, result) => {
            if(err){
                res.sendStatus(404)
                res.send('false')
            }else{
                console.log(result)
                res.send('true')
            }

        });
    });
})
module.exports = app;