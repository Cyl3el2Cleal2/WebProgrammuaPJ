const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://gigabug:gigabug1234@ds141351.mlab.com:41351/gigabug";
app.use(bodyParser.json());
var ObjectID = require('mongodb').ObjectID

app.post("/api/buy/bill/getItem", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");
        var idc = {
            _id: mongodb.ObjectID(req.body.id)
        }

        var respons = [];


        dbo.collection('TRN_buy_contract').find(idc).toArray((err, result) => {
            if (err) {
                res.sendStatus(404)
            } else {



                console.log(result)
                respons.push(result)
                var idcustomer = {
                    _id: mongodb.ObjectID(result[0].ID_MST_customer)
                }
                var idstock = {
                    _id: mongodb.ObjectID(result[0].ID_MST_stock)
                }
                // var idemployee = {
                //     ID_MST_employee: result[0].ID_MST_employee
                // }
                dbo.collection('MST_customer').find(idcustomer).toArray((err, result) => {
                    if (err) {
                        res.sendStatus(404)
                    } else {
                        console.log(result)
                        respons.push(result)

                        dbo.collection('MST_employee').find() .sort({$natural: -1})
                        .limit(1).toArray((err, result) => {
                            if (err) {
                                res.sendStatus(404)
                            } else {
                                console.log(result)
                                respons.push(result)
                                dbo.collection('MST_stock').find(idstock).toArray((err, result) => {
                                    if (err) {
                                        res.sendStatus(404)
                                    } else {
                                        console.log(result)
                                        respons.push(result)

                                        dbo.collection('TRN_buy_bill').find({}).count((err, result) => {
                                            if (err) {
                                                res.sendStatus(404)
                                            } else {
                                                console.log(result)
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
    })

})
app.post("/api/buy/bill/insert", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");
        var objectId = new ObjectID();

        var data = {
            ID_TRN_buy_bill: objectId,
            date: req.body.date,
            type: req.body.type,
            total: req.body.total,
            vat: req.body.vat,
            insure: req.body.insure,
            price: req.body.price,
            ID_TRN_buy_contract: req.body.fk
        }
        console.log(data)


        dbo.collection('TRN_buy_bill').insertOne(data, (err, result) => {
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
app.post("/api/buy/invoice/insert", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");


        var objectId = new ObjectID();

        var data = {
            ID_TRN_buy_taxInvoice: objectId,
            date: req.body.date,
            ID_TRN_buy_bill: req.body.ID_TRN_buy_bill
        }
        console.log(data)
        dbo.collection('TRN_buy_taxInvoice').insertOne(data, (err, result) => {
            if (err) {
                res.send(false)
            } else {
                res.send(true)
                db.close()
            }

        })



    })
})
app.post("/api/buy/invoice/getItem", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");
        var id = {
            _id: mongodb.ObjectID(req.body.id)
        }
        console.log(id)
        var respons = [];
        dbo.collection('TRN_buy_bill').find(id).toArray((err, result) => {
            if (err) {
                res.sendStatus(404)
            } else {



                var idc = {
                    _id: mongodb.ObjectID(result[0].ID_TRN_buy_contract)
                }
                respons.push(result)

                dbo.collection('TRN_buy_contract').find(idc).toArray((err, result) => {
                    if (err) {
                        res.sendStatus(404)
                    } else {
                        respons.push(result)
                        var idcustomer = {
                            _id: mongodb.ObjectID(result[0].ID_MST_customer)
                        }
                        var idstock = {
                            _id: mongodb.ObjectID(result[0].ID_MST_stock)
                        }
                        // var idemployee = {
                        //     ID_MST_employee: result[0].ID_MST_employee
                        // }
                        dbo.collection('MST_customer').find(idcustomer).toArray((err, result) => {
                            if (err) {
                                res.sendStatus(404)
                            } else {
                                respons.push(result)

                                dbo.collection('MST_employee').find() .sort({$natural: -1})
                                .limit(1).toArray((err, result) => {
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

app.post("/api/sale/bill/getItem", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");
        var idc = {
            _id: mongodb.ObjectID(req.body.id)
        }

        var respons = [];
        console.log(idc)

        dbo.collection('TRN_sale_contract').find(idc).toArray((err, result) => {
            if (err) {
                res.sendStatus(404)
            } else {

                if (result.length == 0) {
                    console.log(result)
                    res.sendStatus(404)
                } else {
                    console.log("conenct sale TRN_sale_contract")
                    console.log(result)
                    respons.push(result)
                    var idcustomer = {
                        _id: mongodb.ObjectID(result[0].ID_MST_customer)

                    }
                    var idstock = {
                        _id: mongodb.ObjectID(result[0].ID_MST_stock)

                    }
                 
                    dbo.collection('MST_customer').find(idcustomer).toArray((err, result) => {
                        if (err) {
                            res.sendStatus(404)
                        } else {
                            console.log("conenct sale MST_customer")
                            respons.push(result)
                            console.log(result)
                            dbo.collection('MST_employee').find().sort({$natural: -1})
                            .limit(1).toArray((err, result) => {
                                if (err) {
                                    res.sendStatus(404)
                                } else {
                                    console.log(result)
                                    console.log("conenct sale MST_employee")
                                    respons.push(result)
                                    dbo.collection('MST_stock').find(idstock).toArray((err, result) => {
                                        if (err) {
                                            res.sendStatus(404)
                                        } else {
                                            console.log("conenct sale MST_stock")
                                            respons.push(result)
                                            console.log(result)
                                            dbo.collection('TRN_sale_bill').find().count((err, result) => {
                                                if (err) {
                                                    res.sendStatus(404)
                                                } else {
                                                    console.log(result)
                                                    console.log("conenct sale  TRN_sale_bill")
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
            }
        })
    })

})
app.post("/api/sale/bill/insert", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");



        var objectId = new ObjectID();
        var data = {
            ID_TRN_sale_bill: objectId,
            date: req.body.date,
            type: req.body.type,
            total: req.body.total,
            vat: req.body.vat,
            insure: req.body.insure,
            price: req.body.price,
            ID_TRN_sale_contract: req.body.fk
        }
        console.log(data)


        dbo.collection('TRN_sale_bill').insertOne(data, (err, result) => {
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





app.post("/api/sale/invoice/getItem", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");

        var id = {
            _id: mongodb.ObjectID(req.body.id)
        }
        console.log(id)
        var respons = [];
        dbo.collection('TRN_sale_bill').find(id).toArray((err, result) => {
            if (err) {
                res.sendStatus(404)
            } else {
                if (result.length == 0) {

                    res.sendStatus(404)
                } else {

                    var idc = {
                        _id: mongodb.ObjectID(result[0].ID_TRN_sale_contract)

                    }
                    respons.push(result)

                    dbo.collection('TRN_sale_contract').find(idc).toArray((err, result) => {
                        if (err) {
                            res.sendStatus(404)
                        } else {
                            respons.push(result)
                            var idcustomer = {
                                _id: mongodb.ObjectID(result[0].ID_MST_customer)

                            }
                            var idstock = {
                                _id: mongodb.ObjectID(result[0].ID_MST_stock)

                            }
                            // var idemployee = {
                            //     _id: mongodb.ObjectID(result[0].ID_MST_employee)

                            // }
                            dbo.collection('MST_customer').find(idcustomer).toArray((err, result) => {
                                if (err) {
                                    res.sendStatus(404)
                                } else {
                                    respons.push(result)

                                    dbo.collection('MST_employee').find() .sort({$natural: -1})
                                    .limit(1).toArray((err, result) => {
                                        if (err) {
                                            res.sendStatus(404)
                                        } else {
                                            respons.push(result)

                                            dbo.collection('MST_stock').find(idstock).toArray((err, result) => {
                                                if (err) {
                                                    res.sendStatus(404)
                                                } else {
                                                    respons.push(result)
                                                    dbo.collection('TRN_sale_bill').find({}).count((err, result) => {
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
            }

        })

    });
});
app.post("/api/sale/invoice/insert", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");


        var objectId = new ObjectID();
        var data = {
            ID_TRN_sale_taxInvoice: objectId,
            date: req.body.date,
            ID_TRN_sale_bill: req.body.ID_TRN_sale_bill
        }
        console.log(data)
        dbo.collection('TRN_sale_taxInvoice').insertOne(data, (err, result) => {
            if (err) {
                res.send("false")
            } else {
                console.log("insert invoice sale")
                res.send("true")
                db.close()
            }

        })

    })
})


app.post("/api/car_recieve/bill/getItem", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");
        var idc = {
            _id: mongodb.ObjectID(req.body.id)
        }
        var respons = [];
        console.log("conenct car_recieve")

        dbo.collection('TRN_car_recieve').find(idc).toArray((err, result) => {
            if (err) {
                res.sendStatus(404)
            } else {
                console.log(result)
                if (result.length == 0) {

                    res.sendStatus(404)
                } else {

                    console.log("conenct TRN_maintennance_detail_administer" + " " + result[0].TRN_maintennance_detail_administer)

                    respons.push(result)
                    var detail_administer = {
                        _id: mongodb.ObjectID(result[0].TRN_maintennance_detail_administer)
                    }
                    console.log(detail_administer)

                    dbo.collection('TRN_maintennance_detail_administer').find(detail_administer).toArray((err, result) => {
                        if (err) {
                            res.sendStatus(404)
                        } else {

                            console.log("conenct TRN_maintennance_detail_repairman")
                            respons.push(result)
                            var repairman = {
                                _id: mongodb.ObjectID(result[0].ID_TRNmaintennance_detail_repairman)
                            }

                            dbo.collection('TRN_maintennance_detail_repairman').find(repairman).toArray((err, result) => {
                                if (err) {
                                    res.sendStatus(404)
                                } else {
                                    console.log("conenct employee")
                                    console.log(result)
                                    respons.push(result)
                                    var emp = {
                                        _id: mongodb.ObjectID(result[0].ID_MST_customer)
                                    }
                                    dbo.collection('MST_customer').find(emp).toArray((err, result) => {
                                        if (err) {
                                            res.sendStatus(404)
                                        } else {
                                            console.log("conenct car_recieve MST_customer")
                                            respons.push(result)

                                            dbo.collection('TRN_maintainance_bill').find().count((err, result) => {
                                                if (err) {
                                                    res.sendStatus(404)
                                                } else {
                                                    console.log("conenct car_recieve  TRN_maintainance_bill")
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
            }
        })
    })

})
app.post("/api/car_recieve/bill/insert", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");



        var objectId = new ObjectID();
        var data = {
            ID_TRN_maintainance_bill: objectId,
            date: req.body.date,
            type: req.body.type,
            total: req.body.total,
            vat: req.body.vat,
            insure: req.body.insure,
            price: req.body.price,
            ID_TRN_car_recieve: req.body.fk
        }
        console.log(data)


        dbo.collection('TRN_maintainance_bill').insertOne(data, (err, result) => {
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

app.post("/api/car_recieve/invoice/getItem", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");

        var id = {
            _id: mongodb.ObjectID(req.body.id)
        }
        console.log(id)
        var respons = [];
        dbo.collection('TRN_maintainance_bill').find(id).toArray((err, result) => {
            if (err) {
                res.sendStatus(404)
            } else {
                if (result.length == 0) {

                    res.sendStatus(404)
                } else {

                    var idc = {
                        _id: mongodb.ObjectID(result[0].ID_TRN_car_recieve)

                    }
                    respons.push(result)

                    dbo.collection('TRN_car_recieve').find(idc).toArray((err, result) => {
                        if (err) {
                            res.sendStatus(404)
                        } else {
                            console.log(result)
                            if (result.length == 0) {

                                res.sendStatus(404)
                            } else {

                                console.log("conenct TRN_maintennance_detail_administer" + " " + result[0].TRN_maintennance_detail_administer)

                                respons.push(result)
                                var detail_administer = {
                                    _id: mongodb.ObjectID(result[0].TRN_maintennance_detail_administer)
                                }
                                console.log(detail_administer)

                                dbo.collection('TRN_maintennance_detail_administer').find(detail_administer).toArray((err, result) => {
                                    if (err) {
                                        res.sendStatus(404)
                                    } else {

                                        console.log("conenct TRN_maintennance_detail_repairman")
                                        respons.push(result)
                                        var repairman = {
                                            _id: mongodb.ObjectID(result[0].ID_TRNmaintennance_detail_repairman)
                                        }

                                        dbo.collection('TRN_maintennance_detail_repairman').find(repairman).toArray((err, result) => {
                                            if (err) {
                                                res.sendStatus(404)
                                            } else {
                                                console.log("conenct customer")
                                                console.log(result)
                                                respons.push(result)
                                                var emp = {
                                                    _id: mongodb.ObjectID(result[0].ID_MST_customer)
                                                }
                                                dbo.collection('MST_customer').find(emp).toArray((err, result) => {
                                                    if (err) {
                                                        res.sendStatus(404)
                                                    } else {
                                                        console.log("conenct car_recieve MST_employee")
                                                        respons.push(result)

                                                        dbo.collection('TRN_maintainance_taxInvoice').find().count((err, result) => {
                                                            if (err) {
                                                                res.sendStatus(404)
                                                            } else {
                                                                console.log("conenct car_recieve  TRN_maintainance_bill")
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
                        }
                    })
                }
            }

        })

    });
});
app.post("/api/Car_recieve/invoice/insert", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");


        var objectId = new ObjectID();
        var data = {
            ID_TRN_maintainance_taxInvoice: objectId,
            date: req.body.date,
            ID_TRN_maintainance_bill: req.body.ID_TRN_car_bill
        }
        console.log(data)
        dbo.collection('TRN_maintainance_taxInvoice').insertOne(data, (err, result) => {
            if (err) {
                res.send("false")
            } else {
                console.log("insert invoice car")
                res.send("true")
                db.close()
            }

        })

    })
})

/*************** */




app.post("/api/license/bill/getItem", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");
        var idc = {
            _id: mongodb.ObjectID(req.body.id)
        }
        var respons = [];
        console.log("conenct license")

        dbo.collection('TRN_per_license_plate_detail').find(idc).toArray((err, result) => {
            if (err) {
                res.sendStatus(404)
            } else {

                if (result.length == 0) {

                    res.sendStatus(404)

                } else {
                    respons.push(result)
                    console.log(result)
                    var customerr = {
                        _id: mongodb.ObjectID(result[0].ID_MST_customer)
                    }
                  


               

                            dbo.collection('MST_customer').find(customerr).toArray((err, result) => {
                                if (err) {
                                    res.sendStatus(404)
                                } else {
                                    console.log(result)

                                    respons.push(result)

                                    dbo.collection('TRN_license_bill').find().count((err, result) => {
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
            }
        })
    })

})
app.post("/api/license/bill/insert", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");



        var objectId = new ObjectID();
        var data = {
            TRN_license_bill: objectId,
            date: req.body.date,
            type: req.body.type,
            total: req.body.total,
            vat: req.body.vat,
            insure: req.body.insure,
            price: req.body.price,
            TRN_per_license_plate_detail: req.body.fk
        }
        console.log(data)


        dbo.collection('TRN_license_bill').insertOne(data, (err, result) => {
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

app.post("/api/repair/invoice/getItem", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");

        var id = {
            _id: mongodb.ObjectID(req.body.id)
        }
        console.log(id)
        var respons = [];
        dbo.collection('TRN_license_bill').find(id).toArray((err, result) => {
            if (err) {
                res.sendStatus(404)
            } else {
                if (result.length == 0) {

                    res.sendStatus(404)
                } else {

                    var idc = {
                        _id: mongodb.ObjectID(result[0].TRN_per_license_plate_detail)

                    }
                    respons.push(result)

                    dbo.collection('TRN_per_license_plate_detail').find(idc).toArray((err, result) => {
                        if (err) {
                            res.sendStatus(404)
                        } else {
            
                            if (result.length == 0) {
            
                                res.sendStatus(404)
            
                            } else {
                                respons.push(result)
                                var customerr = {
                                    _id: mongodb.ObjectID(result[0].ID_MST_customer)
                                }
                                var getlicense = {
                                    _id: mongodb.ObjectID(result[0].ID_TRN_get_licence_plate)
                                }
            
            
                               
            
                                        dbo.collection('MST_customer').find(customerr).toArray((err, result) => {
                                            if (err) {
                                                res.sendStatus(404)
                                            } else {
                                                console.log(result)
            
                                                respons.push(result)
            
                                                dbo.collection('TRN_license_taxInvoice').find().count((err, result) => {
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
                        }
                    })
                }
            }

        })

    });
});
app.post("/api/license/invoice/insert", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");


        var objectId = new ObjectID();
        var data = {
           ID_TRN_license_taxInvoice: objectId,
            date: req.body.date,
            ID_TRN_license_bill: req.body.ID_TRN_repair_bill
        }
        console.log(data)
        dbo.collection('TRN_license_taxInvoice').insertOne(data, (err, result) => {
            if (err) {
                res.send("false")
            } else {
                console.log("insert invoice car")
                res.send("true")
                db.close()
            }

        })

    })
})







module.exports = app;