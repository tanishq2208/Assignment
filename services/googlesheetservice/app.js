const express = require('express');
const { consumerQueue } = require('./helper/consumerQueue');

const StartServer = async () => {
    const app = express();

    const port = 8001;
    const host = '0.0.0.0';

    await consumerQueue();

    app.listen(port, host, () => {
        console.log("Gsheet running on port 8001");
    });
};

// Example usage
StartServer();
