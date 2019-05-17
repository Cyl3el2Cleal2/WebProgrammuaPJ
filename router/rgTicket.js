const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://gigabug:gigabug1234@ds141351.mlab.com:41351/gigabug";
app.use(bodyParser.json());

var ObjectID = require('mongodb').ObjectID
app.post("/api/LoadDataRpTicket", (req, res) => {
    console.log(req.body.tell)
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");
        var condi = {
            _id: mongodb.ObjectID(req.body.tell)
        }
        var array = []
        dbo.collection('TRN_license_bill').find(condi).toArray((err, result) => {
            if (err) {
                console.log('false')
                res.status(404).send('false');
            } else {
                array.push(result[0])
                console.log(result[0])
                dbo.collection('TRN_license_bill').find(condi).count((err, result) => {
                    if (err) {
                        console.log('false')
                        res.status(404).send(null);

                    } else {
                        array.push(result)
                        console.log(result)
                        dbo.collection('TRN_per_license_plate_detail').find(array[0].TRN_per_license_plate_detail).toArray((err, result) => {
                            if (err) {
                                console.log('false')
                                res.status(404).send('false');
                            } else {
                                array.push(result[0].detail[0].car_number)
                                console.log(result[0].detail[0].car_number)
                                res.send(array)
                            }
                        })
                    }
                })
            }
        })
    });
})

module.exports = app;