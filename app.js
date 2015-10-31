var express = require('express');
var bodyParser = require('body-parser');
var path    = require('path');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.render('index');
});

app.post('/addUser', function(req, res) {
    var name = req.body.name,
        email = req.body.email,
        country = req.body.country,
        address = req.body.address,
        tele = req.body.tele,
        state,
        zip,
        province,
        postalCode;


    if(country === 'USA') {
        state = req.body.state;
        zipcode = req.body.zipCode;
    }
    if(country === 'Canada') {
        province = req.body.province;
        postalCode = req.body.postalCode;
    }

    console.log(name);
    console.log(email);
    console.log(country);
    console.log(address);
    console.log(postalCode);
    console.log(province);
    res.redirect('/');
});

module.exports = app;