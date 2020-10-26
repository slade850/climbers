const commentQueries = require("./query");
const { v4: uuidv4 } = require('uuid'); 

const commentService = {
    creatComment: async (body) => {
        const id = uuidv4();
        body.id = id; 
        return commentQueries.creatComment(body)
                .then((result) => ({status: 201, message: "Creation Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    readComment: async () => {
        return commentQueries.readComment()
                .then((result) => ({status: 200, data: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    readOneComment: async (id) => {
        return commentQueries.readOneComment(id)
                .then((result) => ({status: 200, data: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    updateComment: async (id, body) => {
        return commentQueries.updateComment(id, body)
                .then((result) => ({status: 201, message: "Update Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    deleteComment: async (id) => {
        return commentQueries.deleteComment(id)
                .then((result) => ({status: 200, message: "Deleted"}))
                .catch((err) => ({status: 400, message: err}));
    }
}; 

module.exports = commentService;