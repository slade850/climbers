const groupQueries = require("./query");
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const slugify = require('slugify');

const groupService = {
    creatGroup: async (userId, body, file) => {
        const id = uuidv4();
        body.id = id;
        body.picture = file ? `groupPictures/${file.filename}` : 'groupPictures/default.jpg';
        body.slug = slugify(body.name);
        return groupQueries.creatGroup(userId, body, file)
                .then((result) => ({status: 201, message: "Creation Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    addInGroup: async (userId, slug, newUser) => {
        try {
            const groupId = await groupQueries.getGroupIdBySlug(userId, slug);
            return groupQueries.addInGroup(userId, groupId, newUser)
                .then((result) => ({status: 201, message: result}))
                .catch((err) => ({status: 400, message: err}));
        } catch (error) {
            throw {status: 400, message: error}
        }
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
        if(file.filename && groupInfo.picture && groupInfo.picture != 'groupPictures/default.jpg'){
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
    },
    getGroupIdBySlug: async (userId, slug) => {
        return groupQueries.getGroupIdBySlug(userId, slug)
                .then((result) => result )
                .catch((err) => err);
    },
    getGroupMembers: async (userId, id) => {
        return groupQueries.getGroupMembers(userId, id)
                .then((result) => result )
                .catch((err) => err);
    }
}; 

module.exports = groupService;