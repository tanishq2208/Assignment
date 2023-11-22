const express = require('express');
const bodyParser = require('body-parser');
const { HealthRoute, FormRoute, QuestionRoute, ResponseRoute } = require('../route');

const app = express();

module.exports = async (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/health', HealthRoute);
    app.use('/form', FormRoute);
    app.use('/question', QuestionRoute);
    app.use('/response', ResponseRoute);
    // app.use('/answer', AnswerRoute)
};