const private_messageServices = require('./service'); 

const private_messageController = {
    creatPrivate_message: (req, res) => {
        return private_messageServices.creatPrivate_message(req.body)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send({ message: err.message }));
    },
    readPrivate_message: (req, res) => {
        return private_messageServices.readPrivate_message()
                .then((result) => res.status(result.status).send({message: result.message, data: result.data}))
                .catch((err) => res.status(err.status).send(err.message));
    },
    readOnePrivate_message: (req, res) => {
        return private_messageServices.readOnePrivate_message(req.params.id)
                .then((result) => res.status(result.status).send({message: result.message, data: result.data}))
                .catch((err) => res.status(err.status).send(err.message))
    },
    updatePrivate_message: (req, res) => {
        return private_messageServices.updatePrivate_message(req.params.id, req.body)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send(err.message));
    },
    deletePrivate_message: (req, res) => {
        return private_messageServices.deletePrivate_message(req.params.id)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send(err.message));
    }
}; 

module.exports = private_messageController;