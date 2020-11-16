const postQueries = require("./query");
const { v4: uuidv4 } = require('uuid'); 

const postService = {
    creatPost: async (userId, body) => {
        const id = uuidv4();
        body.id = id; 
        return postQueries.creatPost(userId, body)
                .then((result) => ({status: 201, message: "Creation Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    readPost: async () => {
        return postQueries.readPost()
                .then(async (result) => {
                    if(result.length){
                        const globalRes = await Promise.all(result.map(async (post) => {
                            let commentsByPost = await postQueries.readCommentsByPost(post.id);
                            let likesByPost = await postQueries.readLikeByPost(post.id);
                            return ({...post, comments: commentsByPost, likes: likesByPost})
                        }))
                        return ({status: 200, message: "success", data: globalRes});
                    } else{
                        throw new Error({status: 400, message: "no posts found"});
                    }
                })
                .catch((err) => ({status: 400, message: 'test'}))
    },
    updatePost: async (userId, id, body) => {
        return postQueries.updatePost(userId, id, body)
                .then((result) => ({status: 201, message: "Update Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    deletePost: async (user, id) => {
        return postQueries.deletePost(user, id)
                .then((result) => result.update ? ({status: 200, message: "Deleted"}) : ({status: 401, message: "this operation is not allowed"}))
                .catch((err) => ({status: 400, message: err}));
    }
}; 

module.exports = postService;