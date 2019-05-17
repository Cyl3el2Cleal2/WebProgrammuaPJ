const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://gigabug:gigabug1234@ds141351.mlab.com:41351/gigabug";
app.use(bodyParser.json());


app.post("/api/sum", (req, res) => {
    MongoClient.connect(url,async function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");
        var all = [];
        var dataX = [];

        await dbo.collection('TRN_buy_bill').find({}).toArray((err, result) => {
            console.log('>>> coll 1');
            if (err) {
                console.log(err)
            } else {
                result.forEach(x => {
                    dataX.push({
                        'buy': x.total
                    })
                })

            }
            all.push(1);
            if(all.length>3){
                res.send(dataX);
            }
        })
        await dbo.collection('TRN_sale_bill').find({}).toArray((err, result) => {
            console.log('>>> coll 2');
            if (err) {
                console.log(err)
            } else {
                result.forEach(x => {
                    dataX.push({
                        'sale': x.total
                    })
                })
            }
            all.push(1);
            if(all.length>3){
                res.send(dataX);
            }
        })
        await dbo.collection('TRN_maintainance_bill').find({}).toArray((err, result) => {
            console.log('>>> coll 3');
            if (err) {
                console.log(err)
            } else {
                result.forEach(x => {
                    dataX.push({
                        'repair': x.total
                    })
                })
            }
            all.push(1);
            if(all.length>3){
                res.send(dataX);
            }
        })
        await dbo.collection('TRN_license_bill').find({}).toArray((err, result) => {
            console.log('>>> coll 4');
            if (err) {
                console.log(err)
            } else {
                result.forEach(x => {
                    dataX.push({
                        'license': x.total
                    })
                })
            }
            all.push(1);
            if(all.length>3){
                res.send(dataX);
            }
        })

        


        
    });
})

module.exports = app