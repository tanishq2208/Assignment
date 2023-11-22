const express = require('express');
const { consumerQueue } = require('./helper/consumerQueue');

const StartServer = async () => {
    const app = express();
    const port = 8002;
    const host = '0.0.0.0';

    await consumerQueue();

    app.listen(port, host, () => {
        console.log("Sms service running on port 8002");
    });
};

// Example usage
StartServer();