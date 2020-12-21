const climberPracticeTypeQueries = require("./query");
const { v4: uuidv4 } = require('uuid'); 

const climberPracticeTypeService = {
    creatClimberPracticeType: async (body) => {
        const id = uuidv4();
        body.id = id; 
        return climberPracticeTypeQueries.creatClimberPracticeType(body)
                .then((result) => ({status: 201, message: "Creation Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    readClimberPracticeType: async () => {
        return climberPracticeTypeQueries.readClimberPracticeType()
                .then((result) => ({status: 200, data: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    updateClimberPracticeType: async (id, body) => {
        return climberPracticeTypeQueries.updateClimberPracticeType(id, body)
                .then((result) => ({status: 201, message: "Update Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    deleteClimberPracticeType: async (id) => {
        return climberPracticeTypeQueries.deleteClimberPracticeType(id)
                .then((result) => ({status: 200, message: "Deleted"}))
                .catch((err) => ({status: 400, message: err}));
    }
}; 

module.exports = climberPracticeTypeService;