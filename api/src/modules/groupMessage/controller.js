const groupMessageServices = require('./service'); 

const groupMessageController = {
    creatGroupMessage: (req, res) => {
        const files = req.files || undefined;
        return groupMessageServices.creatGroupMessage(req.user.id, req.body, files)
                .then((result) => {
                    req.app.io.emit('nvMs', {group: req.body.group_id, sender: req.user.id})
                    res.status(result.status).send({message: result.message})
                })
                .catch((err) => res.status(err.status).send({ message: err.message }));
    },
    readAllGroupMessage: (req, res) => {
        return groupMessageServices.readAllGroupMessage(req.user.id)
                .then((result) => res.status(result.status).send({message: result.message, data: result.data}))
                .catch((err) => res.status(err.status).send(err.message));
    },
    readGroupMessage: (req, res) => {
        return groupMessageServices.readGroupMessage(req.user.id, req.params.groupSlug)
                .then((result) => res.status(result.status).send({message: result.message, data: result.data, groupId: result.groupId}))
                .catch((err) => res.status(err.status).send(err.message));
    },
    readOneGroupMessage: (req, res) => {
        return groupMessageServices.readOneGroupMessage(req.params.id)
                .then((result) => res.status(result.status).send({message: result.message, data: result.data}))
                .catch((err) => res.status(err.status).send(err.message))
    },
    updateGroupMessage: (req, res) => {
        return groupMessageServices.updateGroupMessage(req.params.id, req.body)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send(err.message));
    },
    deleteGroupMessage: (req, res) => {
        return groupMessageServices.deleteGroupMessage(req.params.id)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send(err.message));
    }
}; 

module.exports = groupMessageController;