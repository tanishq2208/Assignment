const express = require('express');
const {
  GetForm,
  CreateForm,
  GetFormByID,
  FillForm,
} = require('../controller/FormController');
const { CreateQuestion } = require('../controller/QuestionController');

const router = express.Router();

router.get('/', GetForm);
router.post('/create', CreateForm);
router.get('/:formId', GetFormByID);
router.post('/:formId/create', CreateQuestion);
router.post('/:formId', FillForm);

module.exports = { FormRoute: router };
