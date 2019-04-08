const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://gigabug:gigabug1234@ds141351.mlab.com:41351/gigabug";
app.use(bodyParser.json());

app.use('/api/buy/deal/insertContract', (req, res) => {
    var data = {
        ID_TRN_buy_contract: req.body.ID_buy_contract,
        ID_MST_customer: req.body.ID_CUS,
        ID_MST_stock: req.body.ID_stock,
        ID_MST_employee: req.body.ID_EMP,
        ID_TRN_buy: req.body.ID_buy,
        date: req.body.DATE
    }
    
    console.log(data)
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");

        dbo.collection("TRN_buy_contract").insertOne(data, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });
})

module.exports = app;