/**
 * Created by Arog on 29.10.2016.
 */

var express = require('express');
var bodyParser = require('body-parser');

var Datastore = require('nedb')
  , bd = new Datastore({ filename: 'C:/Base/path/to/database' });
bd.loadDatabase(function (err) {});

var app = express();

app.use(bodyParser.json());

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
    var input_body = JSON.parse(req.body);
    //db[req.params.email].out.push(input_body);
    post_new(req.params.email, input_body, function(err, data){
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

/*var test_one_out = [test_one_mail_1, test_one_mail_2];
var test_two_out = [test_two_mail_1, test_two_mail_2];

var test_one_in = [test_two_mail_1, test_two_mail_2];
var test_two_in = [test_one_mail_1, test_one_mail_2];

var test_1_in = [test_1_mail_2, test_1_mail_3];
var test_1_out = [test_1_mail_1];
*/
/*var test_one_all = {
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
};*/

/*var db_ = {
    'test_one': test_one_all,
    'test_two': test_two_all,
    '1': test_1_all
};*/
for (i=0;i<7;++i) {
    bd.insert(tests[i], function (err, newDoc) {
});
}

function get_in(request, func){
    /*var bd_data = db[request].in;
    setTimeout(function () {
        func(null, bd_data)
    }, 0);*/
    bd.find({"inout":"in","from":request}, func);
}

function get_out(request, func){
    bd.find({"inout":"out","from":request}, func);
}

function post_new(path, request, func) {

    /*db[path].out.push(request);

    var answer = 1;
    setTimeout(function () {
        func(null, answer)
    }, 0);*/
    bd.insert({inout: 'out', request})
}
/* TEST DATA END*/
