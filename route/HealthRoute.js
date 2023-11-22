const express = require('express');
const { HealthManager } = require('../controller');

const router = express.Router();

router.get('/', HealthManager);

module.exports = { HealthRoute: router };
