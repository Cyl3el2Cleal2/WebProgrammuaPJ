const express = require('express')
const app = express()
var bodyParser = require('body-parser')


var login = require('./router/login')
var buy = require('./router/buy')
var sale = require('./router/sale')
var repair = require('./router/repair')
var regis = require('./router/regis_car')
var emp = require('./router/emp')
var path = require('path');
app.use(express.static('public'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'public', 'login.html'));
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(login)
app.use(buy)
//Uncomment ถ้าทำแล้ว
// app.use(sale)
// app.use(repair)
// app.use(regis)
app.use(emp)
app.listen(process.env.PORT || 3000, () => {
  console.log('Start server at port 3000.')
})