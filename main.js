/**
 * Created by Arog on 29.10.2016.
 */

var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var Datastore = require('nedb');
var bd = new Datastore({ filename: './db' });
bd.loadDatabase(function (err) {});

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static('public'));

// Получить список входящих писем для user
app.get('/in/:user', function (req, res) {
    console.log('GET\t/in/' + req.params.user);
    get_to(req.params.user, function(err, data){
        if (err == null) {
            res.json(data)
        } else {
            console.log(err, '1');
            res.send(err);
        }
    });
});

// Создать письмо при регистрации пользователя user
app.get('/reg/:user', function (req, res) {
    register_user(req.params.user, function (err, data) {
        res.json(data)
    })
});

// Получить список исходящих писем для user
app.get('/out/:user', function (req, res) {
    console.log('GET\t/out/' + req.params.user);
    get_from(req.params.user, function(err, data){
        if (err == null) {
            res.json(data)
        } else {
            console.log(err, '1');
            res.send(err);
        }
    });

});

var funcs = [nothing, change_words, random_delete, add_random, the_fragmentation_of_the_text];

function nothing(json) {
    return [json]
}

// Написать письмо от имени user
app.post('/send/:user', function (req, res) {
    var fun_id = getPresetRandom_forfuncs();
    var noised = funcs[fun_id](req.body);
    req.body['f_id'] = fun_id;

    var is_sent = false;
    noised.forEach(function (item, i, arr) {
        var del = getPresetRandom() * 1000;
        console.log('POST\t/send/' + req.params.user, '\tdelay: ', del);
        var post_fun = function () {
            post_new(req.params.user, item, del, function(err, data){
                if (err == null) {
                    //var r = data._id;
                    if (!is_sent) {
                        is_sent = true;
                        res.json(fun_id);
                    }
                } else {
                    console.log(err);
                    res.send(err);
                }
            });
        };
        setTimeout(post_fun, 0)
    });

});

var port = 8080;

app.listen(port, function () {
    console.log('running on port ' + port.toString());
});

// Регистрация нового пользователя user
function register_user(user, func){
    bd.find({"to":user}, function (err, data) {
        if (data.length > 0) {
            func(err, {was_registered: false});
            console.log('WAS USER: ', user);
        } else {
            var hello = {
                from: 'not-reply@mailrussia.io',
                to: user,
                subject: 'Добро пожаловать',
                text: 'Дорогой ' + user + ',\nПриветствуем Вас на нашем сервисе!\n\nВаш человек помощник',
                time: (new Date()).getTime()
            };
            bd.insert(hello);
            console.log('NEW USER: ', user);
            func(err, {was_registered: true});
        }
    });
}

// получить из бд список полученных
function get_to(user, func){
    if (Math.random() < 0.4) {
        setTimeout(function () {
            random_to_email();
        }, 0);
    }
    bd.find({"to":user}, func);
}

// получить из бд список отправленных
function get_from(user, func){
    if (Math.random() < 0.4) {
        setTimeout(function () {
            random_to_email();
        }, 0);
    }
    bd.find({"from":user}, func);
}


// Добавить в бд новое сообщение
function post_new(path, mail, del, func) {
    var time_now = new Date();
    mail['from'] = path;
    mail['time'] = time_now.getTime();
    //console.log(mail);
    if (typeof mail['to'] == 'undefined') {
        mail['to'] = 'spam'
    }

    setTimeout(function () {
        bd.insert(mail);
    }, del);
    setTimeout(function() {
        func(null, {delay: del})
    }, 0);
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getPresetRandom() {
    var r = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 7, 7, 7, 15, 15, 10, 10, 9, 12];
    return r[Math.floor(Math.random() * r.length)];
}

function getPresetRandom_forfuncs() {
    var r = [0, 0, 0, 1, 2, 3, 4];
    return r[Math.floor(Math.random() * r.length)];
}

// рандомно меняет местами буквы
function change_words(json) {
    var text=json['text'];
    var a = text.split("");
    for (var i=0;i<text.length;i += 7) {
        a[getRandomInt(0, text.length-1)]=a[getRandomInt(0, text.length-1)];
    }
    text=a.join('');
    json['text']=text;
    return [json];
}

// рандомно удаляет куски сообщения
function random_delete(json) {
    var text=json['text'];
    var a = text.split("");
    for (i=0;i<a.length;i=i+getRandomInt(4, 9)) {
        var rand_numb=getRandomInt(1, 2);
        for(j=0;j<rand_numb;++j){
            a[i]="";
        }
    }
    text=a.join('');
    json['text']=text;
    return [json];
}

var adddin="a 19 декабря Русская Православная Церковь чтит память святителя Николая, но";
var adddva="для этого читайте гайды на различных героев Дота 2 и потом применяйте изученную тактику на практике и";
var addtri="и прежде всего, необходимо подготовить и собрать купленное вами удилище, затем";
var rand_texts=[adddin,adddva, addtri];

// Добавляет в сообщение чужеродные фрагменты текста
function add_random(json) {
    var text=json['text'];
    var count=0;
    var a = text.split(" ");
    rand_numb=getRandomInt(5,a.length/2);
    for (var i=rand_numb;i<a.length;i=i+rand_numb) {
        var str="";
        for(var j=i;j<a.length;++j){
            str=str+' '+a[j];
        }
        var new_a="";
        for(var j=0;j<i;++j){
            new_a=new_a+' '+a[j];
        }
        new_a=new_a+' '+rand_texts[count]+' '+str;
        a=new_a;
        a=a.split(" ");
        ++count;
        var rand_numb=getRandomInt(5,a.length/2);
        if (count == 3) break;
    }
    text=a.join(' ')
    json['text']=text;
    return [json];
}

// Создает спам сообщение
function random_to_email(){
    var ss_to = {
        to: '',
        subject: '',
        text: ''
    };
    var sub_text = [{subject:'I know where you live!', text:'I am coming for you!'},
    {subject:'Hi, I am a spam bot!)', text:'I need you!'},
    {subject:'Buy a spam bot!', text:'And the second will receive absolutely for free!'},
    {subject:'Do not ignore!', text:'I am a cutie :3'},
    {subject:'I little post gnome!', text:'Where is my snow?'},
    {subject:'Hello! My name is johnny Catsvill!', text:'And today we start this post =)'},
    {subject:'Attention!', text:'Thank you for your attention!'}];

    var mas_to = [];
    bd.find({}, function(err, a) {
        for(var i=0;i<a.length;i++){
            mas_to[i] = a[i].to;
        }
        var num = getRandomInt(0,sub_text.length);
        ss_to['to'] = mas_to[getRandomInt(0,a.length-1)];
        if (typeof ss_to['to'] == 'undefined') {
            ss_to['to'] = 'spam_bot'
        }
        ss_to['subject'] = sub_text[num].subject;
        ss_to['text'] = sub_text[num].text;
        request.post('http://localhost:' + port.toString() + '/send/spam_bot', {form: ss_to}, function (err, res, body) {
            console.log('spambot: ', body);
        });

    });
}

function the_fragmentation_of_the_text(json)
{

    var mas_drop = [];
    var text = json['text'];
    var num = 0;
    for(var i=0; i<3; i++)
    {
        var drop = {
            from: json['from'],
            to: json['to'],
            subject: json['subject'],
            text: ''
        };
        num = getRandomInt(1,text.length-1);
        var text1 = text.substring(0,num);
        drop['text'] = text1;
        text = text.substring(num);
        mas_drop[i] = drop
    }
    return mas_drop
}
