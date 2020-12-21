const groupMessageQueries = require("./query");
const { v4: uuidv4 } = require('uuid'); 
const groupService = require("../group/service");
const mediaQuery = require("../media/query");

const groupMessageService = {
    creatGroupMessage: async (userId, body, files) => {
        const id = uuidv4();
        body.id = id;
        const members = await groupService.getGroupMembers(userId, body.group_id);
        return groupMessageQueries.creatGroupMessage(userId, body)
                .then((result) => {
                    if(members){
                        members.forEach(m => groupMessageQueries.messageNotRead(m.user_id, id))
                    }
                    if(files){
                        files.forEach(file => {
                            const fileId = uuidv4();
                            const media = {
                                id: fileId, 
                                type: file.mimetype.split('/')[0] == "image" ? "image" : file.mimetype.split('/')[1] == 'pdf' ? "doc" : "video",
                                path: `medias/${file.filename}`,
                                message_id: id
                            };
                            mediaQuery.creatMediaForGroupMessage(userId, media)
                            .then(mediaResult => mediaResult)
                            .catch(mediaErr => mediaErr)
                        });
                    } 
                    return ({status: 201, message: result});
                })
                .catch((err) => ({status: 400, message: err}));
    },
    readAllGroupMessage: async (userId) => {
        return groupMessageQueries.readAllGroupMessage(userId)
                .then((result) => ({status: 200, data: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    readGroupMessage: async (userId, slug) => {
        try {
            const groupId = await groupService.getGroupIdBySlug(userId, slug);
            return groupMessageQueries.readGroupMessage(groupId)
                .then( async (result) => {
                    if(result.length){
                        const globalRes = await Promise.all(result.map(async (message) => {
                            let deleteNotRead = await groupMessageQueries.deleteNotRead(userId, message.id);
                            let mediaInMessage = await mediaQuery.readMediaInGroupMessage(message.id);
                            return ({...message, medias: mediaInMessage})
                        }))
                        return ({status: 200, data: globalRes});
                    } else {
                        return ({status: 200, data: result});
                    }
                })
                .catch((err) => ({status: 400, message: err}));
        } catch (error) {
            throw {status: 400, message: error}
        }
    },
    readOneGroupMessage: async (id) => {
        return groupMessageQueries.readOneGroupMessage(id)
                .then((result) => ({status: 200, data: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    updateGroupMessage: async (id, body) => {
        return groupMessageQueries.updateGroupMessage(id, body)
                .then((result) => ({status: 201, message: "Update Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    deleteGroupMessage: async (id) => {
        return groupMessageQueries.deleteGroupMessage(id)
                .then((result) => ({status: 200, message: "Deleted"}))
                .catch((err) => ({status: 400, message: err}));
    }
}; 

module.exports = groupMessageService;