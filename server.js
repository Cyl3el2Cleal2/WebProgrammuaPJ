const express = require('express')
const app = express()
var bodyParser = require('body-parser')


var login = require('./router/login')
var forget = require('./router/forget')
var register = require('./router/register')
var buy = require('./router/buy')
var sale = require('./router/sale')
var repair = require('./router/repair')
var regis = require('./router/regis_car')
var emp = require('./router/emp')
var recieve = require('./router/carRecieve')
var bBuy = require('./router/bBuy')
var customer = require('./router/Costum')
var path = require('path');
var deal = require('./router/deal')
app.use(express.static('public'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'public', 'login.html'));
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(login)
app.use(forget)
app.use(register)
app.use(buy)
app.use(recieve)
app.use(bBuy)
app.use(customer)
//Uncomment ถ้าทำแล้ว

app.use(sale)
// app.use(repair)

// app.use(sale)
app.use(repair)

// app.use(regis)
app.use(emp)
app.use(deal)
app.listen(process.env.PORT || 3000, () => {
  console.log('Start server at port 3000.')
})