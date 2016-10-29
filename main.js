/**
 * Created by Arog on 29.10.2016.
 */

var express = require('express');
var bodyParser = require('body-parser');

var Datastore = require('nedb')
  , bd = new Datastore({ filename: './db' });
bd.loadDatabase(function (err) {});

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', function (req, res) {
    res.send('<html><body>' +
        '<form action="http://localhost:8000/send/1" method="post">' +
        '<br><p>From:</p><input name="from" value="2">' +
        '<br><p>To:</p><input name="to" value="3232">' +
        '<br><p>Subject:</p><input name="subject" value="theme">' +
        '<br><p>Text:</p><input name="text" value="this is text">' +
        '<br><input type="submit" value="submit">' +
        '</form></body></html>');
});

app.get('/in/:email', function (req, res) {
    console.log('GET ' + req.ip);
    get_to(req.params.email, function(err, data){
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
    get_from(req.params.email, function(err, data){
        if (err == null) {
            res.json(data)
        } else {
            console.log(err, '1');
            res.send(err);
        }
    });

});

app.post('/send/:email', function (req, res) {
    //var input_body = JSON.parse(req.body);
    //db[req.params.email].out.push(input_body);
    post_new(req.params.email, req.body, function(err, data){
        if (err == null) {
            var r = data._id;
            res.json(r)
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

/*var test_two_mail_1 = {
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
}*/

function get_to(request, func){
    bd.find({"to":request}, func);
}

function get_from(request, func){
    bd.find({"from":request}, func);
}

function post_new(path, request, func) {
    request['from'] = path;
    request['inout'] = 'out';
    bd.insert(request);
    request['from'] = path;
    request['inout'] = 'in';
    bd.insert(request, func);
}

