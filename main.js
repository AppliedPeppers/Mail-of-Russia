/**
 * Created by Arog on 29.10.2016.
 */

var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var db = require('./db.js').db;
var funcs = require('./db.js');
var upload = multer();

var app = express();

app.use(bodyParser.json());

app.get('/in/:email', function (req, res) {
    console.log('GET ' + req.ip);
    //console.log(db[req.params.email].in);
    //console.log(db);
    //console.log(req.params.email);
    res.json(db[req.params.email].in);
});

app.get('/out/:email', function (req, res) {
    console.log('GET ' + req.ip);
    funcs.get_out(req.params.email, function(err, data){
        if (err == null) {
            res.json(data)
        } else {
            console.log(err, '1');
            res.send(err);
        }
    });

});

app.post('/send/:email', function (req, res) {
    var input_body = JSON.parse(req.body);
    //db[req.params.email].out.push(input_body);
    funcs.post_new(req.params.email, input_body, function(err, data){
        if (err == null) {
            res.json(data)
        } else {
            console.log(err, '1');
            res.send(err);
        }
    });
});

var port = 8000;

app.listen(port, function () {
    console.log('running on port ' + port.toString());
});