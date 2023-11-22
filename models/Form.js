const { Model } = require("sequelize");
const { QuestionModel } = require("./index");

const FormModel = Model.extend({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  created_by: {
    type: DataTypes.STRING,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
});

FormModel.hasMany(QuestionModel, {
  foreignKey: 'form_id'
});

QuestionModel.belongsTo(FormModel, {
  foreignKey: 'form_id'
});

module.exports = { FormModel };
