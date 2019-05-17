const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://gigabug:gigabug1234@ds141351.mlab.com:41351/gigabug";
app.use(bodyParser.json());

app.post("/api/login", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");

        var user = {
            "user": req.body.username,
            "password": req.body.password,

        }
        console.log(user)
        dbo.collection('MST_employee').find(user).toArray((err, result) => {
            if (err) {
                res.sendStatus(404)
            } else {
                console.log(result)
                if (result.length > 0) {
                   
                    result[0].status = 'true';
                    

                    
                    res.send(result[0]);
                    //res.send('true')


                } else {
                  
                    res.send({
                        'status':'false'
                    })
                }

            }

        })

    });
})
module.exports = app;