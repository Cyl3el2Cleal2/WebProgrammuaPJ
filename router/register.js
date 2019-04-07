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

module.exports = app;