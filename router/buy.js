const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://gigabug:gigabug1234@ds141351.mlab.com:41351/gigabug";
app.use(bodyParser.json());


app.post("/api/buy/bill/getItem", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");
        var idc = {
            ID_TRN_buy_contract: req.body.id
        }
        var respons = [];

        dbo.collection('TRN_buy_contract').find(idc).toArray((err, result) => {
            if (err) {
                res.sendStatus(404)
            } else {
                respons.push(result)
                var idcustomer = {
                    ID_MST_costomer: result[0].ID_MST_customer
                }
                var idstock = {
                    ID_MST_stock: result[0].ID_MST_stock
                }
                var idemployee = {
                    ID_MST_employee: result[0].ID_MST_employee
                }
                dbo.collection('MST_customer').find(idcustomer).toArray((err, result) => {
                    if (err) {
                        res.sendStatus(404)
                    } else {
                        respons.push(result)

                        dbo.collection('MST_employee').find(idemployee).toArray((err, result) => {
                            if (err) {
                                res.sendStatus(404)
                            } else {
                                respons.push(result)
                                dbo.collection('MST_stock').find(idstock).toArray((err, result) => {
                                    if (err) {
                                        res.sendStatus(404)
                                    } else {
                                        respons.push(result)
                                        res.send(respons)

                                    }

                                })
                            }

                        })
                    }

                })

            }

        })
    })

})
app.post("/api/buy/invoice/getItem", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");
        var id = {
            ID_TRN_buy_bill: req.body.id
        }
        var respons = [];

        console.log(req.body)
        dbo.collection('TRN_buy_bill').find(id).toArray((err, result) => {
            if (err) {
                res.sendStatus(404)
            } else {

                var idc = {
                    ID_TRN_buy_contract: result[0].ID_TRN_buy_contract
                }
                respons.push(result)

                dbo.collection('TRN_buy_contract').find(idc).toArray((err, result) => {
                    if (err) {
                        res.sendStatus(404)
                    } else {
                        respons.push(result)
                        var idcustomer = {
                            ID_MST_costomer: result[0].ID_MST_customer
                        }
                        var idstock = {
                            ID_MST_stock: result[0].ID_MST_stock
                        }
                        var idemployee = {
                            ID_MST_employee: result[0].ID_MST_employee
                        }
                        dbo.collection('MST_customer').find(idcustomer).toArray((err, result) => {
                            if (err) {
                                res.sendStatus(404)
                            } else {
                                respons.push(result)

                                dbo.collection('MST_employee').find(idemployee).toArray((err, result) => {
                                    if (err) {
                                        res.sendStatus(404)
                                    } else {
                                        respons.push(result)
                                        dbo.collection('MST_stock').find(idstock).toArray((err, result) => {
                                            if (err) {
                                                res.sendStatus(404)
                                            } else {
                                                respons.push(result)
                                                res.send(respons)

                                            }

                                        })
                                    }

                                })
                            }

                        })

                    }

                })

            }

        })

    });
});
app.post("/api/buy/deal/getItem", (req, res) => {
    // console.log(req.body)
})
app.post("/api/buy/deal/insertContract", (req, res) => {
    var dataPush = {
        ID_TRN_buy_contract: req.body.ID_buy_contract,
        ID_MST_customer: req.body.ID_CUS,
        ID_MST_stock: req.body.ID_stock,
        ID_MST_employee: req.body.ID_EMP,
        ID_TRN_buy: req.body.ID_buy,
        date: req.body.DATE
    }
    console.log(dataPush)
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");
        dbo.collection("TRN_buy_contract").insert(dataPush, (err, result) => {
            if (err) {
                res.sendStatus(404)
                res.send('false')
            } else {
                console.log(result)
                res.send('true')
            }

        });
    });
})
module.exports = app;