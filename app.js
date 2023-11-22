const express = require('express');
const App = require('./services/ExpressApp').default;
const { database } = require('./services/Database');

require('dotenv').config();

const StartServer = async () => {
    
    const app = express();

    // Database connection
    try {
        await database.sequelize.sync({ alter: true });
        console.log('Models synchronized with database.');
    } catch (error) {
        console.error('Error synchronizing models with database:', error);
        return;
    }

    // Express App
    await App(app);
    const port = process.env.PORT || 8000;
    console.log(port)

    const host = '0.0.0.0';

    app.listen(8000, host, () => {
        console.log(`Atlan running on port ${port}`);
    });
};

StartServer();
