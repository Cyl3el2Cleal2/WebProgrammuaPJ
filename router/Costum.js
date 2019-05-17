const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://gigabug:gigabug1234@ds141351.mlab.com:41351/gigabug";
var ObjectID = require('mongodb').ObjectID
app.use(bodyParser.json());

app.post("/api/Custum", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");
        var objectId = new ObjectID();
        var userdata = {
            "ID_MST_customer": objectId,
            "email": req.body.email,
            "gender": req.body.gender,
            "tel": req.body.tel,
            "age": req.body.age,
            "customer_type": req.body.costum_type,
            "firstname": req.body.name,
            "lastname": req.body.sername
        }

        dbo.collection('MST_customer').insertOne(userdata, (err, result) => {
            if (err) {
                res.sendStatus(404)
                res.send('false')
            } else {
               
                  
                    var result2 = {
                        status: "true",
                        id: result.ops[0]._id
                    }
                    res.send(result2)
                

            }
        })
    });
})



app.post('/api/cus/search', (req, res) => {
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