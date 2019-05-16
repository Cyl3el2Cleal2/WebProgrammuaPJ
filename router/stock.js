const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://gigabug:gigabug1234@ds141351.mlab.com:41351/gigabug";
app.use(bodyParser.json());

app.post("/api/stock", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");
        var data = {
            "ID_MST_stock": req.body.id,
            "license_plate": req.body.license_plate,
            "model":req.body.model,
            "price":req.body.price,
            "color":req.body.color
        }
        var condition ={
            "ID_MST_stock": req.body.id
        }
        console.log(condition)
        dbo.collection('MST_stock').find(condition).count((err,result)=>{
            if(err){
                res.sendStatus(404)
                res.send('false')
            }else if(result>0){
                dbo.collection('MST_stock').updateOne(condition,{$set:data},(err,result)=>{
                    if(err){
                        res.sendStatus(404)
                         res.send('false')
                    }else{
                        res.send('true')
                    }
                });
            }else{
                dbo.collection('MST_stock').insert(data,(err,result)=>{
                    if(err){
                        res.sendStatus(404)
                         res.send('false')
                    }else{
                        res.send('true')
                    }
                });
            }

        });
    });
});

app.get("/api/stock/table", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");
        dbo.collection('MST_stock').find({}).toArray((err,result)=>{
            if(err){
                res.sendStatus(404)
                res.send('false')
            }else{
                // console.log(result)
                res.send(result)
            }
        })
    });
})
module.exports = app;