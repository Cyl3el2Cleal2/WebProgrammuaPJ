const express = require('express');
const app = express.Router();
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://gigabug:gigabug1234@ds141351.mlab.com:41351/gigabug";
app.use(bodyParser.json());
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gigabug.thailand@gmail.com', 
      pass: 'gigabug000' 
    }
});



app.post("/api/forget", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("gigabug");
        
        var user = {
            email: req.body.email
        }
        
        dbo.collection("MST_employee").find(user).toArray(function(err, result) {
            if (err) {
                res.sendStatus(404)
            } else {
                res.send(result)
                for (var i = 0; i < result.length; i++) {
                    let mailOptions = {
                        from: 'gigabug.thailand@gmail.com',                
                        to: `${result[i].email}`,               
                        subject: 'You Forget your Passwrd on Gigabug?',              
                        html: `Hello ${result[i].name} ${result[i].lastname}!<br>Your forget your password?<br>Email: ${result[i].email}<br> 
                        Your Password: ${result[i].password}
                        <br><br>Please use this password to login.`  
                    };
                    transporter.sendMail(mailOptions, function (err, info) {
                        if(err)
                         console.log(err)
                       else
                         console.log(info);
                     });
                }
               
               
                db.close();

            }

        })

    });
})




module.exports = app;