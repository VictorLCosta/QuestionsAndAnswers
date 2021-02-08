const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cnn = require('./database/context');
const perguntaModel = require('./database/Question');

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
    perguntaModel.findAll({raw: true, order: [['id', 'DESC']]}).then(questions => {
        res.render('index', {
            questions: questions
        });
    });
});

app.get('/questions', (req, res) =>
{
    res.render('question');
});

app.post('/questions/new', (req, res) =>
{
    var title = req.body.title;
    var desc = req.body.desc;
    perguntaModel.create({
        title: title,
        desc: desc
    })
    .then(() => {
        res.redirect('/');
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
