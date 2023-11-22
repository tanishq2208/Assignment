const { Identifier } = require("sequelize");
const { database } = require("../services/Database");
const { GSheetQueue } = require("../messagequeue/GSheetQueue");

const UpdateGoogleSheet = async (responseId) => {
    try {
        const response = await database.Response.findByPk(responseId);

        if (!response) {
            console.log("Can't found the response.");
            return;
        }

        const form = await database.Form.findByPk(response.FormId);

        if (!form) {
            console.log('Form not found.');
            return;
        }

        const questionsWithAnswers = await database.Question.findAll({
            where: { FormId: form.id },
            include: [
                {
                    model: database.Answer,
                    as: 'answers',
                    where: { ResponseId: response.id },
                },
            ],
        });

        const responseWithDetails = {
            responseId: response.id,
            form: form.toJSON(),
            questions: questionsWithAnswers,
        };

        console.log(responseWithDetails);
        await GSheetQueue(responseWithDetails);
        return;
    } catch (error) {
        console.error(error);
        console.log('There was a error while fetching the records.');
        return;
    }
};

// Example usage
const exampleResponseId = 1;
UpdateGoogleSheet(exampleResponseId);