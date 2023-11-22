const amqp = require('amqplib');

const SmsQueue = async (message) => {
    try {
        const connection = await amqp.connect('amqp://rabbitmq');
        const channel = await connection.createChannel();

        const queueName = 'twiliosms';

        await channel.assertQueue(queueName, { durable: false });
        channel.sendToQueue(queueName, Buffer.from(message));

        console.log(`Sent: ${message}`);

        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error(error);
        console.log('An error occurred while inserting message into the queue');
    }
};
module.exports = {SmsQueue};

// Example usage
// const exampleMessage = 'Hello, this is a test message.';
// SmsQueue(exampleMessage);
