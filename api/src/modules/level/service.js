const levelQueries = require("./query");
const { v4: uuidv4 } = require('uuid'); 

const levelService = {
    creatLevel: async (body) => {
        const id = uuidv4();
        body.id = id; 
        return levelQueries.creatLevel(body)
                .then((result) => ({status: 201, message: "Creation Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    readLevel: async () => {
        return levelQueries.readLevel()
                .then((result) => ({status: 200, data: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    updateLevel: async (id, body) => {
        return levelQueries.updateLevel(id, body)
                .then((result) => ({status: 201, message: "Update Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    deleteLevel: async (id) => {
        return levelQueries.deleteLevel(id)
                .then((result) => ({status: 200, message: "Deleted"}))
                .catch((err) => ({status: 400, message: err}));
    }
}; 

module.exports = levelService;