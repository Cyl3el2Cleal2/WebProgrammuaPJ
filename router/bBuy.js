const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://gigabug:gigabug1234@ds141351.mlab.com:41351/gigabug";
app.use(bodyParser.json());

app.post("/api/bBuy/getCostum", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");
        var condi = {
            tel: req.body.tell

        }
        console.log(condi)
        dbo.collection('MST_customer').find(condi).toArray((err, result) => {
            if (err) {
                console.log('error bBuy line 20')
                res.status(404).send(null);
            } else {
                res.send(result[0])
                console.log(result)
            }
        })
    });
})

app.post("/api/bBuy/addStock", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");

        var stock = {
            ID_TRN_buy: "",
            license_plate: req.body.license_plate,
            model: req.body.model,
            price: req.body.price,
            color: req.body.color,
            status: req.body.status
        }
        console.log(stock)
        dbo.collection('MST_stock').insertOne(stock, (err, result) => {
            if (err) {
                res.sendStatus(404)
                res.send('false')
            } else {
                // console.log(result)
                var data = {
                    _id: result.ops[0]._id,
                    status: 'true'
                }
                console.log(result.ops[0]._id)
                res.send(data)
            }
        })
    });
})

app.post("/api/bBuy/insertBuy", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");

        var buyDoc = {
            ID_TRN_buy: "",
            date:req.body.date,
            ID_MST_stock:req.body.ID_MST_stock,
            name:req.body.name
        }
        console.log(buyDoc)

        dbo.collection('TRN_buy').find().count( (err, result) => {
            if (err) {
                res.sendStatus(404)
                res.send('false')
            }
            var name = "BY00000"
            buyDoc.ID_TRN_buy = name.substring(0,name.length-(result+"").length)+result;
            dbo.collection('TRN_buy').insertOne(buyDoc, (err, result) => {
                if (err) {
                    res.sendStatus(404)
                    res.send('false')
                } else {
                    // console.log(result)
                    var data = {
                        _id: result.ops[0]._id,
                        status: 'true'
                    }
                    console.log(result.ops[0]._id)
                    res.send(data)
                }
            })
        })

    });
})
module.exports = app;