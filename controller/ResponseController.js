const { database } = require('../services/Database');

const GetAllResponse = async (req, res) => {
    try {
        const responses = await database.Response.findAll();
        
        if (responses !== null && responses.length > 0) {
            return res.json(responses); 
        }

        return res.json({"message" : "No response exist"});
    
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

const GetResponseById = async (req, res) => {
    const { responseId } = req.params;
  
    try {
        const response = await database.Response.findByPk(responseId);
    
        if (!response) {
          return res.status(404).json({ error: 'Response not found.' });
        }
        
        const form = await database.Form.findByPk(response.FormId);

        if (!form) {
          return res.status(404).json({ error: 'Form not found.' });
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
        
        res.status(200).json(responseWithDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the response.' });
    }
};

module.exports = {
  GetAllResponse,
  GetResponseById,
};