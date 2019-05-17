const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://gigabug:gigabug1234@ds141351.mlab.com:41351/gigabug";
app.use(bodyParser.json());

app.post("/api/emp", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");
        var name = req.body.name
        var splite = name.split(" ")
        var userdata = {
            "ID_MST_employee": req.body.id,
            "email": req.body.email,
            "gender": req.body.gender,
            "tel": req.body.tel,
            "age": req.body.age,
            "employee_type": req.body.employee_type,
            "address": req.body.address,
            "salary": req.body.salary,
            "name": splite[0],
            "lastname": splite[1],
            "idcard": req.body.id_card

        }
        var condition = {
            "ID_MST_employee": req.body.id,
        }
        console.log(userdata)
        dbo.collection('MST_employee').updateOne(condition, { $set: userdata }, (err, result) => {
            if (err) {
                res.sendStatus(404)
                res.send('false')
            } else {
                console.log(result)
                res.send('true')
            }
        })
    });
})

app.get('/api/emp/search', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");

        dbo.collection("MST_employee").find({}).toArray(function (err, result) {
            if (err) throw err;
            res.send(result)
            db.close();
        });








    });
});

app.post('/api/emp/search', (req, res) => {
    console.log("73 emp.js")

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");
        var findId = req.body.emp_id;
        findId = String(findId).replace("#", '');
        console.log(findId)
        var condi = {
            "_id": mongodb.ObjectID(findId)
        }
        dbo.collection("MST_customer").find(condi).toArray(function (err, result) {

            if (err) {
                print(err)
                throw err
                res.send(err.code)
            };
            res.send(result[0])
            db.close();
        });
    });
});
module.exports = app;