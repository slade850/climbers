const likeServices = require('./service'); 

const likeController = {
    readLike: (req, res) => {
        return likeServices.readLike()
                .then((result) => res.status(result.status).send({message: result.message, data: result.data}))
                .catch((err) => res.status(err.status).send(err.message));
    },
    creatLike: (req, res) => {
        return likeServices.creatLike(req.body)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send({ message: err.message }));
    },
    likePost: (req, res) => {
        return likeServices.likePost(req.user.id, req.body)
                .then((result) => res.status(result.status).send({message: result.message, data: result.data}))
                .catch((err) => res.status(err.status).send(err.message))
    },
    updateLike: (req, res) => {
        return likeServices.updateLike(req.params.id, req.body)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send(err.message));
    },
    deleteLike: (req, res) => {
        return likeServices.deleteLike(req.params.id)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send(err.message));
    }
}; 

module.exports = likeController;