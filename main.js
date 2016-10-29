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
    var now = new Date();
    var del = getPresetRandom() * 1000;
    console.log('POST\tdelay: ', del);
    var post_fun = function () {
        post_new(req.params.email, req.body, del, function(err, data){
            if (err == null) {
                //var r = data._id;
                res.json(data)
            } else {
                console.log(err);
                res.send(err);
            }
        });
    };

    setTimeout(post_fun, 0)

});

var port = 8000;

app.listen(port, function () {
    console.log('running on port ' + port.toString());
});

function get_to(request, func){
    bd.find({"to":request}, func);
}

function get_from(request, func){
    bd.find({"from":request}, func);
}

function post_new(path, request, del, func) {
    var time_now = new Date();
    request['from'] = path;
    request['time'] = time_now.getTime();
    setTimeout(function () {
        bd.insert(request);
    }, del);
    setTimeout(function() {
        func(null, {delay: del})
    }, 0);
}

var text="Каждый веб-разработчик знает, что такое текст-«рыба». Текст этот, несмотря на название, не имеет никакого отношения к обитателям водоемов. Используется он веб-дизайнерами для вставки на интернет-страницы и демонстрации внешнего вида контента, просмотра шрифтов, абзацев, отступов и т.д. Так как цель применения такого текста исключительно демонстрационная, то и смысловую нагрузку ему нести совсем необязательно. Более того, нечитабельность текста сыграет на руку при оценке качества восприятия макета."
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getPresetRandom() {
    var r = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 7, 7, 7, 15, 15, 10, 10, 9, 12];
    //var r = [10, 10, 10, 10];
    return r[Math.floor(Math.random() * r.length)];
}

function change_words(text) {
    a=text.split("");
    for (i=0;i<text.length;++i) {
        a[getRandomInt(0, text.length-1)]=a[getRandomInt(0, text.length-1)];
    }
    text=a.join('')
    console.log(text);
}
//change_words(text)

function random_delete(text) {
    a=text.split("");
    for (i=0;i<a.length;i=i+getRandomInt(1, 9)) {
        rand_numb=getRandomInt(1, 3)
        for(j=0;j<rand_numb;++j){
            a[i]="";
        }
    }
    text=a.join('')
    console.log(text);
}
//random_delete(text)

var adddin="a 19 декабря Русская Православная Церковь чтит память святителя Николая, но";
var adddva="для этого читайте гайды на различных героев Дота 2 и потом применяйте изученную тактику на практике и";
var addtri="и прежде всего, необходимо подготовить и собрать купленное вами удилище, затем";
var rand_texts=[adddin,adddva, addtri];

function add_random(text) {
    count=0;
    a=text.split(" ");
    rand_numb=getRandomInt(5,a.length/2);
    for (i=rand_numb;i<a.length;i=i+rand_numb) {
        str="";
        for(j=i;j<a.length;++j){
            str=str+' '+a[j];
        }
        var new_a="";
        for(j=0;j<i;++j){
            new_a=new_a+' '+a[j];
        }
        new_a=new_a+' '+rand_texts[count]+' '+str;
        a=new_a;
        a=a.split(" ");
        ++count;
        rand_numb=getRandomInt(5,a.length/2);
        if (count == 3) break;
    }
    text=a.join(' ')
    console.log(text);
}
