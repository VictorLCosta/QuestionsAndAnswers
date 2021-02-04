const sequelize = require('sequelize');
const cnn = new sequelize('questionsandanswersappdb', 'root', 'Icaronon9',
{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = cnn;