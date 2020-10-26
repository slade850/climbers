const eventQueries = require("./query");
const { v4: uuidv4 } = require('uuid'); 

const eventService = {
    creatEvent: async (body) => {
        const id = uuidv4();
        body.id = id; 
        return eventQueries.creatEvent(body)
                .then((result) => ({status: 201, message: "Creation Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    readEvent: async () => {
        return eventQueries.readEvent()
                .then((result) => ({status: 200, data: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    readOneEvent: async (id) => {
        return eventQueries.readOneEvent(id)
                .then((result) => ({status: 200, data: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    updateEvent: async (id, body) => {
        return eventQueries.updateEvent(id, body)
                .then((result) => ({status: 201, message: "Update Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    deleteEvent: async (id) => {
        return eventQueries.deleteEvent(id)
                .then((result) => ({status: 200, message: "Deleted"}))
                .catch((err) => ({status: 400, message: err}));
    }
}; 

module.exports = eventService;