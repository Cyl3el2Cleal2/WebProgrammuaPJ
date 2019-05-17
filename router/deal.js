const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var url = "mongodb://gigabug:gigabug1234@ds141351.mlab.com:41351/gigabug";
app.use(bodyParser.json());
var  ObjectID = require('mongodb').ObjectID

////////BUY
app.post('/api/buy/deal/insertContract', (req, res) => {
    var objectId = new ObjectID();
    var data = {
        ID_TRN_buy_contract: objectId,
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
                 var resp = {
                     "status":"true",
                     "_id":result.ops[0]._id
                 }
                res.send(resp)
                db.close();

            }

        });
    });
})
////////Sale
app.post('/api/sale/deal/insertContract', (req, res) => {
    var objectId = new ObjectID();
    var data = {
        ID_TRN_buy_contract: objectId,
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

        dbo.collection("TRN_sale_contract").insert(data, (err, result) => {
            if (err) {
                res.send("false")
                db.close();
            } else {
                 var resp = {
                     "status":"true",
                     "_id":result.ops[0]._id
                 }
                res.send(resp)
                db.close();

            }

        });
    });
})

app.post('/api/deal/getItem', (req, res) => {

    var data = [];

    // req.body.id = "5cdead4950a2960b28dd67ec"
    console.log(req.body.id+"<-----------")


    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");
        var query = { _id: mongodb.ObjectID(req.body.id) };
        dbo.collection("TRN_buy").find(query).toArray(function (err, result) {
            if (err) {
                res.send(false)
                db.close;
            } else {
                console.log("TRN_buy");
                console.log(result);
                data.push(result[0]._id);
                
                data.push(result[0].ID_MST_customer);
                data.push(result[0].ID_MST_stock);
                //res.send(data);
                var queryCus = {
                    _id:mongodb.ObjectID(result[0].ID_MST_customer)
                };
                // console.log(result[0].ID_MST_customer)
                dbo.collection("MST_customer").find(queryCus).toArray(function (err, respons) {
                    if (err) {
                        res.send(false)
                        db.close;
                    } else {
                        console.log("Mst_customer ")
                        console.log(respons)
                        data.push(respons[0].firstname + " " + respons[0].lastname)
                        
                        //res.send(data)
                        var queryStk = {
                            _id: mongodb.ObjectID(result[0].ID_MST_stock)
                        };
                        console.log("===>" + result[0].ID_MST_stock)
                        dbo.collection("MST_stock").find(queryStk).toArray(function (err, stk) {
                            if (err) {
                                res.send(false)
                                db.close;
                            } else {
                                console.log("stock" )
                                console.log(stk)
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
// ---------------------------- SALE
app.post('/api/sale/deal/getItem', (req, res) => {

    var data = [];
    // req.body.id = "5cdec1333644d51d38007b4a"
    console.log(req.body.id+"<--")

    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");
        var query = { _id: mongodb.ObjectID(req.body.id) };
        dbo.collection("TRN_sale").find(query).toArray(function (err, result) {
            if (err) {
                res.send(false)
                db.close;
            } else {
                console.log("TRN_sale");
                console.log(result);
                data.push(result[0]._id);
                
                data.push(result[0].ID_MST_customer);
                data.push(result[0].ID_MST_stock);
                //res.send(data);
                var queryCus = {
                    _id:mongodb.ObjectID(result[0].ID_MST_customer)
                };
                // res.send(data)
                console.log(result[0].ID_MST_customer)
                dbo.collection("MST_customer").find(queryCus).toArray(function (err, respons) {
                    if (err) {
                        res.send(false)
                        db.close;
                    } else {
                        console.log("Mst_customer ")
                        console.log(respons)
                        data.push(respons[0].firstname + " " + respons[0].lastname)
                        
                        //res.send(data)
                        var queryStk = {
                            _id: mongodb.ObjectID(result[0].ID_MST_stock)
                        };
                        console.log("===>" + result[0].ID_MST_stock)
                        dbo.collection("MST_stock").find(queryStk).toArray(function (err, stk) {
                            if (err) {
                                res.send(false)
                                db.close;
                            } else {
                                console.log("stock" )
                                console.log(stk)
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