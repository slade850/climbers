const private_messageServices = require('./service'); 
const redis = require('../../config/redis');

const private_messageController = {
    creatPrivate_message: (req, res) => {
        const files = req.files || undefined;
        return private_messageServices.creatPrivate_message(req.user.id, req.body, files)
                .then((result) => {
                    req.app.io.emit('nvMs', {sender: req.user.id, receiver: req.body.receiver})
                    res.status(result.status).send({message: result.message})})
                .catch((err) => res.status(err.status).send({ message: err.message }));
    },
    viewAllCurrentConversations: (req, res) => {
        return private_messageServices.viewAllCurrentConversations(req.user.id)
                .then((result) => res.status(result.status).send({userMsg: result.userMsg, groupMsg: result.groupMsg}))
                .catch((err) => res.status(err.status).send(err.message));
    },
    readPrivate_message: (req, res) => {
        return private_messageServices.readPrivate_message(req.user.id, req.params.contactSlug)
                .then((result) => res.status(result.status).send({data: result.data, contactId: result.contactId, message: result.message}))
                .catch((err) => res.status(err.status).send({ message: err.message }));
    },
    readInvitation: (req, res) => {
        return private_messageServices.readInvitation(req.user.id)
                .then((result) => res.status(result.status).send({message: result.message, data: result.data}))
                .catch((err) => res.status(err.status).send({ message: err.message }));
    },
    updatePrivate_message: (req, res) => {
        return private_messageServices.updatePrivate_message(req.params.id, req.user.id, req.body)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send({ message: err.message }));
    },
    deletePrivate_message: (req, res) => {
        return private_messageServices.deletePrivate_message(req.params.id, req.user.id)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send({ message: err.message }));
    }
}; 

module.exports = private_messageController;