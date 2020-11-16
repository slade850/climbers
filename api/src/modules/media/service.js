const mediaQueries = require("./query");
const { v4: uuidv4 } = require('uuid'); 

const mediaService = {
    creatMedia: async (body) => {
        const id = uuidv4();
        body.id = id; 
        return mediaQueries.creatMedia(body)
                .then((result) => ({status: 201, message: "Creation Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    readMedia: async () => {
        return mediaQueries.readMedia()
                .then((result) => ({status: 200, data: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    readOneMedia: async (id) => {
        return mediaQueries.readOneMedia(id)
                .then((result) => ({status: 200, data: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    updateMedia: async (id, body) => {
        return mediaQueries.updateMedia(id, body)
                .then((result) => ({status: 201, message: "Update Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    deleteMedia: async (id) => {
        return mediaQueries.deleteMedia(id)
                .then((result) => ({status: 200, message: "Deleted"}))
                .catch((err) => ({status: 400, message: err}));
    }
}; 

module.exports = mediaService;