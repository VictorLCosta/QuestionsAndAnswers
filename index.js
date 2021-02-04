const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'))

app.get('/:name?', (req, res) => 
{
    res.render('index');
});

app.get('/questions/new', (req, res) =>
{
    res.render('question');
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
