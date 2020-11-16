const groupQueries = require("./query");
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const groupService = {
    creatGroup: async (userId, body, file) => {
        const id = uuidv4();
        body.id = id; 
        return groupQueries.creatGroup(userId, body, file)
                .then((result) => ({status: 201, message: "Creation Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    joinGroup: async (userId, groupId) => {
        return groupQueries.joinGroup(userId, groupId)
                .then((result) => ({status: 201, message: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    leaveGroup: async (userId, groupId) => {
        return groupQueries.leaveGroup(userId, groupId)
                .then((result) => ({status: 201, message: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    readGroup: async () => {
        return groupQueries.readGroup()
                .then((result) => ({status: 200, data: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    readOneGroup: async (id) => {
        return groupQueries.readOneGroup(id)
                .then((result) => ({status: 200, data: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    readMyGroup: async (userId) => {
        return groupQueries.readMyGroup(userId)
                .then((result) => ({status: 200, data: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    updateGroup: async (userId, id, body, file) => {
        const groupInfo = await groupQueries.readOneGroup(id);
        body.name = body.name ? body.name : groupInfo.name;
        body.description = body.description ? body.description : groupInfo.description;
        body.picture = file.filename ? file.filename : groupInfo.picture;
        if(file.filename && groupInfo.picture){
            fs.unlinkSync(`./files/groupPictures/${groupInfo.picture}`)
        }
        return groupQueries.updateGroup(userId, id, body)
                .then((result) => ({status: 201, message: "Update Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    deleteGroup: async (userId, id) => {
        return groupQueries.deleteGroup(userId, id)
                .then((result) => ({status: 200, message: "Deleted"}))
                .catch((err) => ({status: 400, message: err}));
    }
}; 

module.exports = groupService;