const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cnn = require('./database/context');
const questionModel = require('./database/Question');
const answerModel = require('./database/Answer');

cnn.authenticate()
    .then(() => 
    {
        console.log('Conexão feita');
    })
    .catch((msgError) => 
    {
        console.log(msgError);
    });

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

//rotas
app.get('/', (req, res) => 
{
    questionModel.findAll({raw: true, order: [['id', 'DESC']]}).then(questions => {
        res.render('index', {
            questions: questions
        });
    });
});

app.get('/questions', (req, res) =>
{
    res.render('question');
});

app.get('/questions/:id', (req, res) => 
{
    var id = req.params.id;
    questionModel.findOne({
        where: {id: id}
    }).then(question => {
        if(question != undefined)
        {
            answerModel.findAll({
                raw: true,
                where: {questionId: question.id},
                order: [['id', 'DESC']]
            })
            .then(answers => {
                res.render('getQuestion', {
                    question: question,
                    answers: answers
                });
            });
        }else
        {
            res.render('/')
        }
    });
});

app.post('/questions/new', (req, res) =>
{
    var title = req.body.title;
    var desc = req.body.desc;
    questionModel.create({
        title: title,
        desc: desc
    })
    .then(() => {
        res.redirect('/');
    });
});

app.post('/answers/new', (req, res) =>
{
    var body = req.body.body;
    var questionId = req.body.question;

    answerModel.create({
        body: body,
        questionId: questionId
    })
    .then(() => {
        res.redirect('/questions/' + questionId)
    });
});

app.listen(8080, (erro) =>
{
    if(erro)
    {
        console.log('Algo de errado ocorreu')
    }
    else
    {
        console.log('Servidor operante');
    }
});
