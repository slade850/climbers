const private_messageQueries = require("./query");
const { v4: uuidv4 } = require('uuid');
const mediaQuery = require('../media/query'); 

const private_messageService = {
    creatPrivate_message: async (userId, body, files) => {
        const id = uuidv4();
        body.id = id;
        
        return private_messageQueries.creatPrivate_message(userId, body)
                .then((result) => {
                    if(files){
                        files.forEach(file => {
                            const fileId = uuidv4();
                            const media = {
                                id: fileId, 
                                type: file.mimetype.split('/')[0] == "image" ? "image" : file.mimetype.split('/')[1] == 'pdf' ? "doc" : "video",
                                path: `medias/${file.filename}`,
                                message_id: id
                            };
                            mediaQuery.creatMediaForMessage(userId, media)
                            .then(mediaResult => mediaResult)
                            .catch(mediaErr => mediaErr)
                        });
                    }
                    return ({status: 201, message: "message sent"});
                })
                .catch((err) => ({status: 400, message: err}));
    },
    readPrivate_message: async (userId, contactId) => {
        return private_messageQueries.readPrivate_message(userId, contactId)
                .then(async (result) => {
                    if(result.length){
                        const globalRes = await Promise.all(result.map(async (message) => {
                            let mediaInMessage = await mediaQuery.readMediaInMessage(message.id);
                            return ({...message, medias: mediaInMessage})
                        }))
                        return ({status: 200, data: globalRes});
                    } else{
                        return ({status: 200, data: result});
                    }
                })
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