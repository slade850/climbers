const mediaServices = require('./service'); 

const mediaController = {
    creatMedia: (req, res) => {
        return mediaServices.creatMedia(req.user.id, req.body, req.file)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send({ message: err.message }));
    },
    readMedia: (req, res) => {
        return mediaServices.readMedia(req.user.id)
                .then((result) => res.status(result.status).send({message: result.message, data: result.data}))
                .catch((err) => res.status(err.status).send(err.message));
    },
    readOneMedia: (req, res) => {
        return mediaServices.readOneMedia(req.params.id)
                .then((result) => res.status(result.status).send({message: result.message, data: result.data}))
                .catch((err) => res.status(err.status).send(err.message))
    },
    readMediaSharedWithMe: (req, res) => {
        return mediaServices.readMediaSharedWithMe(req.user.id)
                .then((result) => res.status(result.status).send({message: result.message, data: result.data}))
                .catch((err) => res.status(err.status).send(err.message));
    },
    deleteMedia: (req, res) => {
        return mediaServices.deleteMedia(req.params.id)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send(err.message));
    }
}; 

module.exports = mediaController;