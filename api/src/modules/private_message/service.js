const private_messageQueries = require("./query");
const { v4: uuidv4 } = require('uuid'); 

const private_messageService = {
    creatPrivate_message: async (body) => {
        const id = uuidv4();
        body.id = id; 
        return private_messageQueries.creatPrivate_message(body)
                .then((result) => ({status: 201, message: "Creation Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    readPrivate_message: async () => {
        return private_messageQueries.readPrivate_message()
                .then((result) => ({status: 200, data: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    readOnePrivate_message: async (id) => {
        return private_messageQueries.readOnePrivate_message(id)
                .then((result) => ({status: 200, data: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    updatePrivate_message: async (id, body) => {
        return private_messageQueries.updatePrivate_message(id, body)
                .then((result) => ({status: 201, message: "Update Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    deletePrivate_message: async (id) => {
        return private_messageQueries.deletePrivate_message(id)
                .then((result) => ({status: 200, message: "Deleted"}))
                .catch((err) => ({status: 400, message: err}));
    }
}; 

module.exports = private_messageService;