const Sequelize = require('sequelize');
const cnn = require('./context');

const Answer = cnn.define('answers', 
{
    body:
    {
        type: Sequelize.TEXT,
        allowNull: false
    },
    questionId: 
    {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Answer.sync({force: false}).then(() => {

})

module.exports = Answer;