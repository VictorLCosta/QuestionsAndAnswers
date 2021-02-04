const Sequelize = require('sequelize');
const cnn = require('./context');

const Question = cnn.define('question', 
{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    desc:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Question.sync({force: false}).then(() => {
    
})