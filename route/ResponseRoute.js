const express = require('express');
const { GetAllResponse, GetResponseById } = require('../controller');

const router = express.Router();

router.get('/', GetAllResponse);
router.get('/:responseId', GetResponseById);

module.exports = { ResponseRoute: router };
