var request = require('request');
var Datastore = require('nedb')
    , bd = new Datastore({ filename: './db' });
bd.loadDatabase(function (err) {});

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

var test_1_mail_3 = {
    from : 'wtf@hz_kakoi_email.dot.net.org.com.ru.fr.io',
    to : '1',
    subject : 'Not spam',
    text : 'This is spam, param-pam-pam.'
};

var tests=[test_two_mail_1, test_two_mail_2, test_one_mail_1, test_one_mail_2, test_1_mail_1, test_1_mail_2, test_1_mail_3];

for (i=0;i<7;++i) {
    request.post('http://localhost:8080/send/' + tests[i].from, {form: tests[i]}, function (err, res, body) {
        console.log(body);
        if (err != null) {
            console.log(err)
        }
    });
    //bd.insert(tests[i]);
}