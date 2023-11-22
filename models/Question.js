const { DataTypes } = require('sequelize');

const QuestionModel = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mandatory: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  return Question;
};

module.exports = QuestionModel;
