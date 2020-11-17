const eventQueries = require("./query");
const { v4: uuidv4 } = require('uuid'); 

const eventService = {
    creatEvent: async (userId, body) => {
        const id = uuidv4();
        body.id = id; 
        return eventQueries.creatEvent(userId, body)
                .then((result) => ({status: 201, message: "Creation Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    readEvent: async () => {
        return eventQueries.readEvent()
                .then(async (result) => {
                if(result.length){
                    const globalRes = await Promise.all(result.map(async (event) => {
                        let participantsByEvent = await eventQueries.getParticipantsByEvent(event.id);
                        return ({...event, participants: participantsByEvent})
                    }))
                    return ({status: 200, message: "success", data: globalRes});
                } else{
                    return ({status: 200, message: "no events", data: null});
                }})
                .catch((err) => ({status: 400, message: err}));
    },
    joinEvent: async (userId, eventId) => {
        return eventQueries.joinEvent(userId, eventId)
                .then((result) => ({status: 201, message: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    leaveEvent: async (userId, eventId) => {
        return eventQueries.leaveEvent(userId, eventId)
                .then((result) => ({status: 201, message: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    updateEvent: async (userId, id, body) => {
        const eventInfo = await eventQueries.readOneEvent(id);
        body.start_at = body.start_at ? body.start_at : eventInfo.start_at;
        body.end_at = body.end_at ? body.end_at : eventInfo.end_at;
        body.name = body.name ? body.name : eventInfo.name;
        body.description = body.description ? body.description : eventInfo.description;
        body.minUsers = body.minUsers ? body.minUsers : eventInfo.minUsers;
        body.maxUsers = body.maxUsers ? body.maxUsers : eventInfo.maxUsers;
        return eventQueries.updateEvent(userId, id, body)
                .then((result) => ({status: 201, message: "Update Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    deleteEvent: async (userId, id) => {
        return eventQueries.deleteEvent(userId, id)
                .then((result) => ({status: 200, message: "Deleted"}))
                .catch((err) => ({status: 400, message: err}));
    }
}; 

module.exports = eventService;