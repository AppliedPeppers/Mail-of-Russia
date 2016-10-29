/**
 * Created by Arog on 29.10.2016.
 */

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

var test_1_mail_3 = {
    from : 'wtf@hz_kakoi_email.dot.net.org.com.ru.fr.io',
    to : '1',
    subject : 'Not spam',
    text : 'This is spam, param-pam-pam.'
};

var test_one_out = [test_one_mail_1, test_one_mail_2];
var test_two_out = [test_two_mail_1, test_two_mail_2];

var test_one_in = [test_two_mail_1, test_two_mail_2];
var test_two_in = [test_one_mail_1, test_one_mail_2];

var test_1_in = [test_1_mail_2, test_1_mail_3];
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
    'test_one': test_one_all,
    'test_two': test_two_all,
    '1': test_1_all
};

function get_in(request, func){
    /*var bd_data = db[request].in;
    setTimeout(function () {
        func(null, bd_data)
    }, 0);*/
    bd.find({ email: request }, func(null, bd_data) {});
}

function get_out(request, func){
    var bd_data = db[request].out;
    setTimeout(function () {
        func(null, bd_data)
    }, 0);
}

function post_new(path, request, func) {

    db[path].out.push(request);

    var answer = 1;
    setTimeout(function () {
        func(null, answer)
    }, 0);
}
/* TEST DATA END*/

module.exports = {
    db: db,
    get_in: get_in,
    get_out: get_out,
    post_new: post_new
};