const private_messageQueries = require("./query");
const { v4: uuidv4 } = require('uuid'); 

const private_messageService = {
    creatPrivate_message: async (userId, body) => {
        const id = uuidv4();
        body.id = id; 
        return private_messageQueries.creatPrivate_message(userId, body)
                .then((result) => ({status: 201, message: "message sent"}))
                .catch((err) => ({status: 400, message: err}));
    },
    readPrivate_message: async (userId, contactId) => {
        return private_messageQueries.readPrivate_message(userId, contactId)
                .then((result) => ({status: 200, data: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    readInvitation: async (userId) => {
        return private_messageQueries.readInvitation(userId)
                .then((result) => ({status: 200, data: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    updatePrivate_message: async (id, userId, body) => {
        return private_messageQueries.updatePrivate_message(id, userId, body)
                .then((result) => ({status: 201, message: "Update Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    deletePrivate_message: async (id, userId) => {
        return private_messageQueries.deletePrivate_message(id, userId)
                .then((result) => ({status: 200, message: "Deleted"}))
                .catch((err) => ({status: 400, message: err}));
    }
}; 

module.exports = private_messageService;