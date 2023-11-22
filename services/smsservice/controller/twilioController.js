require('dotenv').config();

const twilioController = async (message) => {
    try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const fromPhoneNumber = process.env.TWILIO_NUMBER;
        const toPhoneNumber = '9580574198';

        const client = require('twilio')(accountSid, authToken);
        await client.messages.create({
            body: message,
            from: fromPhoneNumber,
            to: toPhoneNumber,
        });

        console.log("Message sent!");
    } catch (error) {
        console.error(error);
        console.log(`An error occurred while sending the message`);
    }
};

// Example usage
const exampleMessage = 'Hello, your response has been successfully submitted.';
twilioController(exampleMessage);
