const express = require('express');
const { GetQuestion } = require('../controller/QuestionController');

const router = express.Router();

router.get('/', GetQuestion);

module.exports = { QuestionRoute: router };
