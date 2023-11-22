const { database } = require('../services/Database');

const GetQuestion = async (req, res) => {
    try {
        const questions = await database.Question.findAll();
        
        if (questions !== null && questions.length > 0) {
            return res.json(questions); 
        }

        return res.json({"message" : "No questions exist"});
    
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

const CreateQuestion = async (req, res) => {
    const { formId } = req.params;
    const { text, mandatory } = req.body;
    try {
        const form = await database.Form.findByPk(formId);
        if (!form) {
            return res.status(404).json({ error: 'Form not found.' });
        }

        const question = await database.Question.create({ FormId: formId, text, mandatory });
        
        res.status(201).json(question);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the question.' });
    }
};

module.exports = {
  GetQuestion,
  CreateQuestion,
};
