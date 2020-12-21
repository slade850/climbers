const likeQueries = require("./query");
const { v4: uuidv4 } = require('uuid'); 

const likeService = {
    readLike: async () => {
        return likeQueries.readLike()
                .then((result) => ({status: 200, data: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    creatLike: async (body) => {
        const id = uuidv4();
        body.id = id; 
        return likeQueries.creatLike(body)
                .then((result) => ({status: 201, message: "Creation Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    likePost: async (userId, body) => {
        return likeQueries.likePost(userId, body)
                .then((result) => ({status: 200, data: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    updateLike: async (id, body) => {
        return likeQueries.updateLike(id, body)
                .then((result) => ({status: 200, message: "Updated"}))
                .catch((err) => ({status: 400, message: err}));
    },
    deleteLike: async (id) => {
        return likeQueries.deleteLike(id)
                .then((result) => ({status: 200, message: "Deleted"}))
                .catch((err) => ({status: 400, message: err}));
    }
}; 

module.exports = likeService;