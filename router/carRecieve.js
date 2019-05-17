const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://gigabug:gigabug1234@ds141351.mlab.com:41351/gigabug";
app.use(bodyParser.json());
var ObjectID = require('mongodb').ObjectID

app.post("/mm/Repair/carRecieve/getTable", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");
        var idc = {
            _id:   mongodb.ObjectID(req.body.id)
        }
        console.log(idc)
        var respons = [];
        dbo.collection('TRN_maintennance_detail_administer').find(idc).toArray((err, result) => {
            if (err) {
                res.sendStatus(404)
            } else {
                respons.push(result)
                console.log(result)
                var idc = {
                    _id:mongodb.ObjectID(result[0].ID_TRNmaintennance_detail_repairman)
                }
                
              
                dbo.collection('TRN_maintennance_detail_repairman').find(idc).toArray((err, result) => {
                    if (err) {
                        res.sendStatus(404)
                    } else {
                        var idc = {
                            _id: mongodb.ObjectID( result[0].ID_MST_customer)
                        }
                        respons.push(result)
                        dbo.collection('MST_customer').find(idc).toArray((err, result) => {
                            if (err) {
                                res.sendStatus(404)
                            } else {
                                console.log(result)
                                respons.push(result)
                                res.send(respons)
                              

                            }

                        })

                    }
                });
            }
        });

    })
})
app.post("/api/car_recieve/Ticket/insert", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");



        var objectId = new ObjectID();
        var data = {
        
            ID_TRN_car_recieve : new ObjectID(),
            recieveName : req.body.recieveName,
            recieveTel : req.body.recieveTel,
            date : req.body.date,
            TRN_maintennance_detail_administer : req.body.TRN_maintennance_detail_administer
        }
        console.log(data)


        dbo.collection('TRN_car_recieve').insertOne(data, (err, result) => {
            if (err) {
                res.sendStatus(404)
            } else {

                var idu = {
                    id: result.ops[0]._id
                }
                res.send(idu)
                db.close()
            }

        })

    })
})
module.exports = app;