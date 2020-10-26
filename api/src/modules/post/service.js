const postQueries = require("./query");
const { v4: uuidv4 } = require('uuid'); 

const postService = {
    creatPost: async (body) => {
        const id = uuidv4();
        body.id = id; 
        return postQueries.creatPost(body)
                .then((result) => ({status: 201, message: "Creation Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    readPost: async () => {
        return postQueries.readPost()
                .then((result) => ({status: 200, data: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    readOnePost: async (id) => {
        return postQueries.readOnePost(id)
                .then((result) => ({status: 200, data: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    updatePost: async (id, body) => {
        return postQueries.updatePost(id, body)
                .then((result) => ({status: 201, message: "Update Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    deletePost: async (id) => {
        return postQueries.deletePost(id)
                .then((result) => ({status: 200, message: "Deleted"}))
                .catch((err) => ({status: 400, message: err}));
    }
}; 

module.exports = postService;