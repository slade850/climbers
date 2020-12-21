const postQueries = require("./query");
const { v4: uuidv4 } = require('uuid'); 
const mediaQuery = require('../media/query');

const postService = {
    creatPost: async (userId, body, files) => {
        const id = uuidv4();
        body.id = id;
        return postQueries.creatPost(userId, body)
                .then((result) => {
                    postQueries.addThemeToPost(id, body.theme_id);
                    if(files){
                        files.forEach(file => {
                            const fileId = uuidv4();
                            const media = {
                                id: fileId, 
                                type: file.mimetype.split('/')[0] == "image" ? "image" : file.mimetype.split('/')[1] == 'pdf' ? "doc" : "video",
                                path: `medias/${file.filename}`,
                                post_id: id
                            };
                            mediaQuery.creatMediaForPost(userId, media)
                            .then(mediaResult => mediaResult)
                            .catch(mediaErr => mediaErr)
                        });
                    } 
                    return ({status: 201, message: "Creation Success"})
                })
                .catch((err) => ({status: 400, message: err}));
    },
    readPost: async () => {
        return postQueries.readPost()
                .then(async (result) => {
                    if(result.length){
                        const globalRes = await Promise.all(result.map(async (post) => {
                            let commentsByPost = await postQueries.readCommentsByPost(post.id);
                            let likesByPost = await postQueries.readLikeByPost(post.id);
                            let mediaInPost = await mediaQuery.readMediaInPost(post.id);
                            return ({...post, medias: mediaInPost, comments: commentsByPost, likes: likesByPost})
                        }))
                        return ({status: 200, message: "success", data: globalRes});
                    } else{
                        return ({status: 200, message: "no posts found", data: null});
                    }
                })
                .catch((err) => ({status: 400, message: 'an error occurred'}))
    },
    readPostByTheme: async (theme) => {
        return postQueries.readPostByTheme(theme)
                .then(async (result) => {
                    if(result.length){
                        const globalRes = await Promise.all(result.map(async (post) => {
                            let commentsByPost = await postQueries.readCommentsByPost(post.id);
                            let likesByPost = await postQueries.readLikeByPost(post.id);
                            let mediaInPost = await mediaQuery.readMediaInPost(post.id);
                            return ({...post, medias: mediaInPost, comments: commentsByPost, likes: likesByPost})
                        }))
                        return ({status: 200, message: "success", data: globalRes});
                    } else{
                        return ({status: 200, message: "no posts found", data: null});
                    }
                })
                .catch((err) => ({status: 400, message: 'an error occurred'}))
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