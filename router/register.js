const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://gigabug:gigabug1234@ds141351.mlab.com:41351/gigabug";
app.use(bodyParser.json());

app.post("/api/register/username", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");

        var user = {
            user: req.body.username
        }
        console.log(user)
        dbo.collection("MST_employee").find(user).count((err, result) => {
            if (err) {
                res.sendStatus(404)
            } else {
                console.log(result)
                if (result > 0) {
                    res.send("false")
                } else {

                    res.send("true")
                }

            }

        });

    });
});

app.post('/api/register/insert', (req, res) => {
    var data = {
        ID_MST_employee: req.body.username,
        user: req.body.username,
        password: req.body.password,
        name: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        tel: req.body.tel,
        email: req.body.email,
        age: req.body.age,
        idcard: req.body.idcard,
        employee_type: req.body.type,
        address: req.body.address,

    }
    console.log(data)
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");

        dbo.collection("MST_employee").insert(data, (err, result) => {
            if (err) {
                res.send("false")
                db.close();
            } else {

                res.send("true")
                db.close();

            }

        });
    });
});

//-----------------------------------------------------rgDetail-----------------------------------------------------

//insert
app.post("/api/register/insertToDB", (req, res) => {
    var data = {
        ID_TRN_per_license_plate_detail: req.body.ID_TRN_per_license_plate_detail,
        ID_MST_customer:req.body.ID_MST_customer,
        detail: req.body.detail,
    }

    //console.log(data)
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");

        dbo.collection('TRN_per_license_plate_detail').find().count((err, result) => {
            if (err) {
                console.log("error edit ID");
            } else {
                console.log("Count = " + result)
                if (result > 0) {
                    if (result < 9) {
                        data.ID_TRN_per_license_plate_detail = "PLP0000" + (result + 1);
                    } else if (result < 99) {
                        data.ID_TRN_per_license_plate_detail = "PLP000" + (result + 1);
                    } else if (result < 999) {
                        data.ID_TRN_per_license_plate_detail = "PLP00" + (result + 1);
                    } else if (result < 9999) {
                        data.ID_TRN_per_license_plate_detail = "PLP0" + (result + 1);
                    }
                } else {
                    data.ID_TRN_per_license_plate_detail = "PLP00001";
                }
            }

            dbo.collection("TRN_per_license_plate_detail").insert(data, (err, result) => {
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

//getCustomer
app.post("/api/register/getCustomer", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");
        var condi = {
            _id: mongodb.ObjectID(req.body.tell)
           
        }
      
        dbo.collection('MST_customer').find(condi).toArray((err, result) => {
            if (err) {
                res.status(404).send(null);
            } else {
                res.send(result[0])
             
            }
        })
    });
})

module.exports = app;