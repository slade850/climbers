const commentQueries = require("./query");
const { v4: uuidv4 } = require('uuid'); 

const commentService = {
    creatComment: async (userId, body) => {
        const id = uuidv4();
        body.id = id; 
        return commentQueries.creatComment(userId, body)
                .then((result) => ({status: 201, message: "Creation Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    updateComment: async (userId, id, body) => {
        return commentQueries.updateComment(userId, id, body)
                .then((result) => ({status: 201, message: "Update Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    deleteComment: async (user, id) => {
        return commentQueries.deleteComment(user, id)
                .then((result) => ({status: 200, message: "Deleted"}))
                .catch((err) => ({status: 400, message: err}));
    }
}; 

module.exports = commentService;