const commentServices = require('./service'); 

const commentController = {
    creatComment: (req, res) => {
        return commentServices.creatComment(req.user.id, req.body)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send({ message: err.message }));
    },
    updateComment: (req, res) => {
        return commentServices.updateComment(req.user.id, req.params.id, req.body)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send(err.message));
    },
    deleteComment: (req, res) => {
        return commentServices.deleteComment(req.user, req.params.id)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send(err.message));
    }
}; 

module.exports = commentController;