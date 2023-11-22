const { SmsQueue } = require("../messagequeue/SmsQueue");
const { FormModel } = require("../models");

const SendMessage = async (form) => {
    const message = `\nForm successfully submitted!\nTitle: ${form.title}\nForm id: ${form.id}\nCreated by: ${form.created_by}\n\nThank you for using Atlan services🚀`;

    await SmsQueue(message);
};

// // Example usage
const exampleForm = {
    title: "Form Example",
    id: 123,
    created_by: "John Wick",
};

SendMessage(exampleForm);
