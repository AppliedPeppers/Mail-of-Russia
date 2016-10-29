/**
 * Created by Arog on 29.10.2016.
 */

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var Datastore = require('nedb')
  , bd = new Datastore({ filename: 'C:/Base/path/to/database' });
bd.loadDatabase(function (err) {});

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());

app.get('/testpost', function (req, res) {
    res.send('<form action="http://localhost:8000/send/1" method="post"><input name="from" value="1"><input name="to" value="3232"><input name="subject" value="theme"><input name="text" value="this is text"><input type="submit" value="123"></form>');
});

app.get('/in/:email', function (req, res) {
    console.log('GET ' + req.ip);
    get_in(req.params.email, function(err, data){
        if (err == null) {
            res.json(data)
        } else {
            console.log(err, '1');
            res.send(err);
        }
    });
});

app.get('/out/:email', function (req, res) {
    console.log('GET ' + req.ip);
    get_out(req.params.email, function(err, data){
        if (err == null) {
            res.json(data)
        } else {
            console.log(err, '1');
            res.send(err);
        }
    });

});

app.post('/send/:email', function (req, res) {
    console.log(req.body);
    //var input_body = JSON.parse(req.body);
    //db[req.params.email].out.push(input_body);
    post_new(req.params.email, req.body, function(err, data){
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

/**
 * Created by Arog on 29.10.2016.
 */

/* Test DATA */

var test_two_mail_1 = {
    inout: 'in',
    from : 'test_two@email.io',
    to : 'test_one@email.io',
    subject : 'Re: What I like',
    text : 'I like swimming.'
};

var test_two_mail_2 = {
    inout: 'in',
    from : 'test_two@email.io',
    to : 'test_one@email.io',
    subject : 'Re: What you like?',
    text : 'I love to play Counter Strike.'
};

var test_one_mail_1 = {
    inout: 'out',
    from : 'test_one@email.io',
    to : 'test_two@email.io',
    subject : 'What I like',
    text : 'I like pizza and ice-cream.'
};

var test_one_mail_2 = {
    inout: 'out',
    from : 'test_one@email.io',
    to : 'test_two@email.io',
    subject : 'What you like?',
    text : 'What you like to play: guitar or chests'
};

var test_1_mail_1 = {
    inout: 'in',
    from : '1',
    to : 'test_two@email.io',
    subject : 'from 1 to two',
    text : 'This is the text'
};

var test_1_mail_2 = {
    inout: 'out',
    from : 'test_one@email.io',
    to : '1',
    subject : 'from two to 1',
    text : 'Is this text the?'
};

var test_1_mail_3 = {
    inout: 'out',
    from : 'wtf@hz_kakoi_email.dot.net.org.com.ru.fr.io',
    to : '1',
    subject : 'Not spam',
    text : 'This is spam, param-pam-pam.'
};

var tests=[test_two_mail_1, test_two_mail_2, test_one_mail_1, test_one_mail_2, test_1_mail_1, test_1_mail_2, test_1_mail_3]

for (i=0;i<7;++i) {
    bd.insert(tests[i], function (err, newDoc) {
    });
}

function get_in(request, func){
    bd.find({"inout":"in","from":request}, func);
}

function get_out(request, func){
    bd.find({"inout":"out","from":request}, func);
}

function post_new(path, request, func) {
    bd.insert({inout: 'out', request})
}

