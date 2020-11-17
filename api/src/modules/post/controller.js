const postServices = require('./service'); 

const postController = {
    creatPost: (req, res) => {
        return postServices.creatPost(req.user.id, req.body, req.files)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send({ message: err.message }));
    },
    readPost: (req, res) => {
        return postServices.readPost()
                .then((result) => res.status(result.status).send({message: result.message, data: result.data}))
                .catch((err) => res.status(err.status).send(err.message));
    },
    updatePost: (req, res) => {
        return postServices.updatePost(req.user.id, req.params.id, req.body)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send(err.message));
    },
    deletePost: (req, res) => {
        return postServices.deletePost(req.user, req.params.id)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send(err.message));
    }
}; 

module.exports = postController;