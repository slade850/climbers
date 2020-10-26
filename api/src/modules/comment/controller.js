const commentServices = require('./service'); 

const commentController = {
    creatComment: (req, res) => {
        return commentServices.creatComment(req.body)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send({ message: err.message }));
    },
    readComment: (req, res) => {
        return commentServices.readComment()
                .then((result) => res.status(result.status).send({message: result.message, data: result.data}))
                .catch((err) => res.status(err.status).send(err.message));
    },
    readOneComment: (req, res) => {
        return commentServices.readOneComment(req.params.id)
                .then((result) => res.status(result.status).send({message: result.message, data: result.data}))
                .catch((err) => res.status(err.status).send(err.message))
    },
    updateComment: (req, res) => {
        return commentServices.updateComment(req.params.id, req.body)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send(err.message));
    },
    deleteComment: (req, res) => {
        return commentServices.deleteComment(req.params.id)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send(err.message));
    }
}; 

module.exports = commentController;