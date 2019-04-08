const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://gigabug:gigabug1234@ds141351.mlab.com:41351/gigabug";
app.use(bodyParser.json());


////////
app.post('/api/buy/deal/insertContract', (req, res) => {
    var data = {
        ID_TRN_buy_contract: req.body.ID_buy_contract,
        ID_MST_customer: req.body.ID_CUS,
        ID_MST_stock: req.body.ID_stock,
        ID_MST_employee: req.body.ID_EMP,
        ID_TRN_buy: req.body.ID_buy,
        date: req.body.DATE
    }

    // /console.log(data)
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");

        dbo.collection("TRN_buy_contract").insert(data, (err, result) => {
            if (err) {
                res.send("false")
                db.close();
            } else {

                res.send("true")
                db.close();

            }

        });
    });
})


app.post('/api/deal/getItem', (req, res) => {

    var data = [];

    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");
        var query = { _id: ObjectId(req.body.id) };
        dbo.collection("TRN_buy").find(query).toArray(function (err, result) {
            if (err) {
                res.send(false)
                db.close;
            } else {
                // console.log(result);
                data.push(result[0].ID_TRN_buy);
                data.push(result[0].ID_MST_customer);
                data.push(result[0].ID_MST_stock);
                //res.send(data);
                var queryCus = {
                    ID_MST_costomer: "" + result[0].ID_MST_customer
                };
                // console.log(result[0].ID_MST_customer)
                dbo.collection("MST_customer").find(queryCus).toArray(function (err, respons) {
                    if (err) {
                        res.send(false)
                        db.close;
                    } else {
                        data.push(respons[0].firstname + " " + respons[0].lastname)
                        // console.log(data)
                        //res.send(data)
                        var queryStk = {
                            _id: ObjectId(result[0].ID_MST_stock)
                        };
                        console.log("===>" + result[0].ID_MST_stock)
                        dbo.collection("MST_stock").find(queryStk).toArray(function (err, stk) {
                            if (err) {
                                res.send(false)
                                db.close;
                            } else {
                                data.push(stk[0].model)
                                data.push(stk[0].license_plate)
                                data.push(stk[0].color)
                                data.push(stk[0].price)
                                res.send(data)
                            }
                        })
                    }
                })
            }
        });
    });
})


module.exports = app;