const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://gigabug:gigabug1234@ds141351.mlab.com:41351/gigabug";
app.use(bodyParser.json());

//-------------------------------------------------rpDetail---------------------------------------------------------

//insert
app.post("/api/insertToDB", (req, res) => {
    var data = {
        ID_TRNmaintennance_detail_repairman: req.body.ID_TRNmaintennance_detail_repairman,
        date: req.body.date,
        carLicense: req.body.carLicense,
        carModel: req.body.carModel,
        carColor: req.body.carColor,
        ID_MST_employee: req.body.ID_MST_employee,
        ID_MST_customer: req.body.ID_MST_customer,
        carSpare: req.body.carSpare,
    }

    console.log(data)
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");

        dbo.collection('TRN_maintennance_detail_repairman').find().count((err, result) => {
            if (err) {
                console.log("error edit ID");
            } else {
                console.log("Count = " + result)
                if (result > 0) {
                    if (result < 9) {
                        data.ID_TRNmaintennance_detail_repairman = "MDR0000" + (result + 1);
                    } else if (result < 99) {
                        data.ID_TRNmaintennance_detail_repairman = "MDR000" + (result + 1);
                    } else if (result < 999) {
                        data.ID_TRNmaintennance_detail_repairman = "MDR00" + (result + 1);
                    } else if (result < 9999) {
                        data.ID_TRNmaintennance_detail_repairman = "MDR0" + (result + 1);
                    }
                } else {
                    data.ID_TRNmaintennance_detail_repairman = "MDR00001";
                }
            }

            dbo.collection("TRN_maintennance_detail_repairman").insert(data, (err, result) => {
                if (err) {
                    res.sendStatus(404)
                    res.send('false')
                } else {
                    var dataresult = {
                        _id: result.ops[0]._id,
                        status: 'true'
                    }
                    res.send(dataresult)
                }

            });
        })


    });
})


//-------------------------------------------------rpEmp---------------------------------------------------------
var ObjectID = require('mongodb').ObjectID
app.post("/api/LoadDataDetail", (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");
        var condi = {
            _id: mongodb.ObjectID(req.body.tell)
        }
        var array = []
        dbo.collection('TRN_maintennance_detail_repairman').find(condi).toArray((err, result) => {
            if (err) {
                console.log('error bBuy line 20')
                res.status(404).send('false');
            } else {
                array.push(result[0])
                console.log(result[0])
                dbo.collection('MST_customer').find().toArray((err, result) => {
                    if (err) {
                        console.log('error bBuy line 20')
                        res.status(404).send(null);
                    } else {
                        array.push(result[0].firstname + " " + result[0].lastname)
                        console.log(array[1])
                        res.send(array)
                    }
                })
            }
        })
    });
})

app.post("/api/insertToDBEmp", (req, res) => {
    var data = {
        ID_TRNmaintennance_detail_administer: req.body.ID_TRNmaintennance_detail_administer,
        date: req.body.date,
        carLicense: req.body.carLicense,
        carModel: req.body.carModel,
        carColor: req.body.carColor,
        empID: req.body.empID,
        ID_TRNmaintennance_detail_repairman: req.body.ID_TRNmaintennance_detail_repairman,
        ID_MST_customer: req.body.ID_MST_customer,
        carSpare: req.body.carSpare,
    }

    console.log(data)
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");
        dbo.collection('TRN_maintennance_detail_administer').find().count((err, result) => {
            if (err) {
                res.sendStatus(404)
                res.send('false')
            } else {
                console.log(result)
                var sum = 10001 + result
                data.ID_TRNmaintennance_detail_administer = "MDA" + sum
                console.log(data)
                dbo.collection("TRN_maintennance_detail_administer").insert(data, (err, result) => {
                    if (err) {
                        res.sendStatus(404)
                        res.send('false')
                    } else {
                        var dataObj = {
                            _id: result.ops[0]._id,
                            status: 'true'
                        }
                        res.send(dataObj)
                    }
                });
            }
        });

    });
})
module.exports = app;