const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://gigabug:gigabug1234@ds141351.mlab.com:41351/gigabug";
router.use(bodyParser.json());


router.post("/api/buy/bill/getItem", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");
        var idc = {
            ID_TRN_buy_contract: req.body.id
        }
        console.log(idc)
        var respons = [];

        dbo.collection('TRN_buy_contract').find(idc).toArray((err, result) => {
            if (err) {
                res.sendStatus(404)
            } else {
                respons.push(result)
                console.log(result)
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
router.post("/api/buy/bill/insert", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");
        var sort = { $natural: -1 };
        dbo.collection("TRN_buy_bill").find().sort(sort).limit(1).toArray(function (err, result) {
            if (err) throw err;
            
            var s = result[0].ID_TRN_buy_bill
            var idb = ""
            for (var i = 0; i < s.length - 1; i++) {
                idb += "" + s.charAt(i)
            }
            var x = parseInt(s.charAt(s.length - 1))
            idb += "" + parseInt(x + 1)
            var data = {
                ID_TRN_buy_bill: idb,
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
                    var id ={
                        id : idb
                    }
                     res.send(id)
                     db.close()
                }

            })
            
        });



    })

})
router.post("/api/buy/invoice/getItem", (req, res) => {
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
router.post("/api/buy/deal/getItem", (req, res) => {
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




module.exports = router;