const mediaQueries = require("./query");
const { v4: uuidv4 } = require('uuid');
const groupMessageQueries = require('../groupMessage/query');
const privateMessageQuery = require('../private_message/query'); 
const { promise } = require("../../config/database");

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
    readMedia: async (userId) => {
        return mediaQueries.readMedia(userId)
                .then((result) => ({status: 200, data: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    readOneMedia: async (id) => {
        return mediaQueries.readOneMedia(id)
                .then((result) => ({status: 200, data: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    readMediaSharedWithMe: async (userId) => {
        try {
            const groupMs = await groupMessageQueries.getAllGroupMessageId(userId);
            const privateMs = await privateMessageQuery.getAllPrivate_messageId(userId);
            const allMedias = await Promise.all(groupMs.concat(privateMs).map(async (ms) => await mediaQueries.readMediaSharedWithMe(ms.id)));
            return {status: 200, data: allMedias.flat(), message: 'medias'}
        } catch (error) {
            throw {status: 400, message: error}
        }
        
    },
    deleteMedia: async (user, id) => {
        return mediaQueries.deleteMedia(user, id)
                .then((result) => ({status: 200, message: "Deleted"}))
                .catch((err) => ({status: 400, message: err}));
    }
}; 

module.exports = mediaService;