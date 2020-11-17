const mediaQueries = require("./query");
const { v4: uuidv4 } = require('uuid'); 

const mediaService = {
    /* creatMedia: async (userId, body, files) => {
        const id = uuidv4();
        body.id = id;
        body.type = file.mimetype.split('/')[0] == "image" ? "image" : file.mimetype.split('/')[1] == 'pdf' ? "doc" : "video";
        body.name = 
        return mediaQueries.creatMedia(body)
                .then((result) => ({status: 201, message: "Creation Success"}))
                .catch((err) => ({status: 400, message: err}));
    }, */
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
    readMediaSharedWithMe: async () => {
        return mediaQueries.readMediaSharedWithMe()
                .then((result) => ({status: 200, data: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    deleteMedia: async (id) => {
        return mediaQueries.deleteMedia(id)
                .then((result) => ({status: 200, message: "Deleted"}))
                .catch((err) => ({status: 400, message: err}));
    }
}; 

module.exports = mediaService;