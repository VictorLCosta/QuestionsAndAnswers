const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.get('/', (req, res) => 
{
    res.render('index');
});

app.get('/questions', (req, res) =>
{
    res.render('question');
});

app.post('/questions/new', (req, res) =>
{
    var title = req.body.title;
    var desc = req.body.desc;
    res.send('Formulário recebido! ' + title + ': ' + desc);
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
