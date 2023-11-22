const amqp = require('amqplib');
const { twilioController } = require('../controller/twilioController');

const consumerQueue = async () => {
    const queueName = 'twiliosms';
    const maxRetries = 20;
    let retries = 0;

    const connectAndConsume = async () => {
        try {
            const connection = await amqp.connect('amqp://rabbitmq');
            const channel = await connection.createChannel();

            await channel.assertQueue(queueName, { durable: false });

            console.log(`Waiting for form submission in ${queueName}.`);

            channel.consume(queueName, async (message) => {
                if (message) {
                    const receivedMessage = message.content.toString();
                    await twilioController(receivedMessage);
                }
            }, { noAck: true });
        } catch (error) {
            console.error('Error consuming RabbitMQ messages:', error);
            if (retries < maxRetries) {
                console.log('Retrying in 5 seconds...');
                retries++;
                setTimeout(connectAndConsume, 5000);
            } else {
                console.log(`Max retries reached. Could not establish connection.`);
            }
        }
    };

    connectAndConsume();
};

// Example usage
consumerQueue();
