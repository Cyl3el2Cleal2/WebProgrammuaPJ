const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://gigabug:gigabug1234@ds141351.mlab.com:41351/gigabug";
app.use(bodyParser.json());
var ObjectID = require('mongodb').ObjectID

app.post("/mm/Repair/carRecieve/getTable", (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");
        var idc = {
            ID_TRN_car_recieve: req.body.id
        }
        console.log(idc)
        var respons = [];

        dbo.collection('TRN_car_recieve').find(idc).toArray((err, result) => {
            if (err) {
                res.sendStatus(404)
            } else {
                respons.push(result)
                console.log(result);
                var idc = {
                    ID_TRN_maintainance_detail_administer: result[0].ID_TRN_maintainance_detail_administer
                }
                var respons = [];
                dbo.collection('TRN_maintainance_detail_administer').find(idc).toArray((err, result) => {
                    if (err) {
                        res.sendStatus(404)
                    } else {
                        respons.push(result)
                        var idc = {
                            ID_TRNmaintennance_detail_repairman: result[0].ID_TRNmaintennance_detail_repairman
                        }
                        var respons = [];
                        dbo.collection('TRNmaintennance_detail_repairman').find(idc).toArray((err, result) => {
                            if (err) {
                                res.sendStatus(404)
                            } else {
                                respons.push(result)
                                res.send(respons)
                            }
                        });
                    }
                });
            }
        });
    })
})
module.exports = app;