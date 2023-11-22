const { DataTypes, Sequelize } = require('sequelize');
// const { FormModel, ResponseModel } = require('../models');
const { sequelize } = require('../middleware/sequelize');

const Form = sequelize.define('Form', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    created_by: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

const Response = sequelize.define('Response', {});

const Question = sequelize.define('Question', {
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mandatory: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

const Answer = sequelize.define('Answer', {
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

// Associations of tables inside database.
Form.hasMany(Question, { onDelete: 'CASCADE', as: 'questions' });
Question.belongsTo(Form);
Form.hasMany(Response, { onDelete: 'CASCADE', as: 'responses' });
Response.belongsTo(Form);
Response.belongsTo(Question);
Response.hasMany(Answer, { onDelete: 'CASCADE', as: 'answers' });
Answer.belongsTo(Response);
Question.hasMany(Answer, { onDelete: 'CASCADE', as: 'answers' });
Answer.belongsTo(Question);

const database = {
    sequelize,
    Question,
    Answer,
    Form,
    Response,
};

module.exports = { database };
