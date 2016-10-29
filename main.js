/**
 * Created by Arog on 29.10.2016.
 */

var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

var app = express();

app.use(bodyParser.json());

/* Test DATA */

var test_two_mail_1 = {
    from : 'test_two@email.io',
    to : 'test_one@email.io',
    subject : 'Re: What I like',
    text : 'I like swimming.'
};

var test_two_mail_2 = {
    from : 'test_two@email.io',
    to : 'test_one@email.io',
    subject : 'Re: What you like?',
    text : 'I love to play Counter Strike.'
};

var test_one_mail_1 = {
    from : 'test_one@email.io',
    to : 'test_two@email.io',
    subject : 'What I like',
    text : 'I like pizza and ice-cream.'
};

var test_one_mail_2 = {
    from : 'test_one@email.io',
    to : 'test_two@email.io',
    subject : 'What you like?',
    text : 'What you like to play: guitar or chests'
};

var test_1_mail_1 = {
    from : '1',
    to : 'test_two@email.io',
    subject : 'from 1 to two',
    text : 'This is the text'
};

var test_1_mail_2 = {
    from : 'test_one@email.io',
    to : '1',
    subject : 'from two to 1',
    text : 'Is this text the?'
};

var test_one_out = [test_one_mail_1, test_one_mail_2];
var test_two_out = [test_two_mail_1, test_two_mail_2];

var test_one_in = [test_two_mail_1, test_two_mail_2];
var test_two_in = [test_one_mail_1, test_one_mail_2];

var test_1_in = [test_1_mail_2];
var test_1_out = [test_1_mail_1];

var test_one_all = {
    in: test_one_in,
    out: test_one_out
};

var test_two_all = {
    in: test_two_in,
    out: test_two_out
};

var test_1_all = {
    in: test_1_in,
    out: test_1_out
};

var db = {
    'test_one@email.io': test_one_all,
    'test_two@email.io': test_two_all,
    '1': test_1_all
};

/* TEST DATA END*/

app.get('/in/:email', function (req, res) {
    console.log('GET ' + req.params.email);
    res.json(db[req.params.email].in);
});

app.get('/out/:email', function (req, res) {
    console.log('GET ' + req.params.email);
    res.json(db[req.params.email].out)
});

app.post('/send/:email', function (req, res) {
    var input_body = JSON.parse(req.body);
    db[req.params.email].out.push(input_body);
    console.log(req.body);
    res.json(req.body);
});

app.listen(8080, function () {
    console.log('port 8080!');
});