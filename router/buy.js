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

                if (result.length == 0) {

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
            }
        })
    })

})
app.post("/api/buy/bill/insert", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");

        dbo.collection("TRN_buy_bill").find().count(function (err, result) {
            if (err) throw err;

            var id = 10000 + result
           
            var data = {
                ID_TRN_buy_bill: id,
                date: req.body.date,
                type: req.body.type,
                total: req.body.total,
                vat: req.body.vat,
                insure: req.body.insure,
                price: req.body.price,
                ID_TRN_buy_contract: req.body.ID_TRN_buy_contract
            }
            console.log(data)


            dbo.collection('TRN_buy_bill').insertOne(data, (err, result) => {
                if (err) {
                    res.sendStatus(404)
                } else {
                    var idu = {
                        id: id
                    }
                    res.send(idu)
                    db.close()
                }

            })



        });
    })
})
app.post("/api/buy/invoice/insert", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");
       
        dbo.collection("TRN_buy_taxInvoice").find().count(function (err, result) {
            if (err) throw err;
          
            var idb = 10000 + result
            var data = {
                ID_TRN_buy_taxInvoice: idb,
                date: req.body.date,
                ID_TRN_buy_bill: req.body.ID_TRN_buy_bill
            }
            console.log(data)
            dbo.collection('TRN_buy_taxInvoice').insertOne(data, (err, result) => {
                if (err) {
                    res.sendStatus(404)
                } else {
                    res.send("true")
                    db.close()
                }

            })

        });

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
                                                dbo.collection('TRN_buy_bill').find({}).count((err, result) => {
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

            }

        })

    });
});
app.post("/api/buy/deal/getItem", (req, res) => {
    console.log(req.body)
    // MongoClient.connect(url, function (err, db) {
    //     if (err) throw err;
    //     var dbo = db.db("gigabug");
    //     var idc = {
    //         ID_TRN_buy_contract: req.body.id
    //     }
    //     var respons = [];

    //     dbo.collection('TRN_buy_contract').find(idc).toArray((err, result) => {
    //         if (err) {
    //             res.sendStatus(404)
    //         } else {
    //             respons.push(result)
    //             var idcustomer = {
    //                 ID_MST_costomer: result[0].ID_MST_customer
    //             }
    //             var idstock = {
    //                 ID_MST_stock: result[0].ID_MST_stock
    //             }
    //             var idemployee = {
    //                 ID_MST_employee: result[0].ID_MST_employee
    //             }
    //             dbo.collection('MST_customer').find(idcustomer).toArray((err, result) => {
    //                 if (err) {
    //                     res.sendStatus(404)
    //                 } else {
    //                     respons.push(result)

    //                     dbo.collection('MST_employee').find(idemployee).toArray((err, result) => {
    //                         if (err) {
    //                             res.sendStatus(404)
    //                         } else {
    //                             respons.push(result)
    //                             dbo.collection('MST_stock').find(idstock).toArray((err, result) => {
    //                                 if (err) {
    //                                     res.sendStatus(404)
    //                                 } else {
    //                                     respons.push(result)
    //                                     res.send(respons)

    //                                 }

    //                             })
    //                         }

    //                     })
    //                 }

    //             })

    //         }

    //     })
    // })
})




module.exports = app;