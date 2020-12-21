const strongPointQueries = require("./query");
const { v4: uuidv4 } = require('uuid'); 

const strongPointService = {
    creatStrongPoint: async (body) => {
        const id = uuidv4();
        body.id = id; 
        return strongPointQueries.creatStrongPoint(body)
                .then((result) => ({status: 201, message: "Creation Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    readStrongPoint: async () => {
        return strongPointQueries.readStrongPoint()
                .then((result) => ({status: 200, data: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    updateStrongPoint: async (id, body) => {
        return strongPointQueries.updateStrongPoint(id, body)
                .then((result) => ({status: 201, message: "Update Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    deleteStrongPoint: async (id) => {
        return strongPointQueries.deleteStrongPoint(id)
                .then((result) => ({status: 200, message: "Deleted"}))
                .catch((err) => ({status: 400, message: err}));
    }
}; 

module.exports = strongPointService;