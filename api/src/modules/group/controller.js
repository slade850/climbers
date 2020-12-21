const groupServices = require('./service'); 

const groupController = {
    creatGroup: (req, res) => {
        const file = req.file || undefined;
        return groupServices.creatGroup(req.user.id, req.body, file)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send({ message: err.message }));
    },
    addInGroup: (req, res) => {
        return groupServices.addInGroup(req.user.id, req.params.slug, req.body.newUser)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send({ message: err.message }));
    },
    leaveGroup: (req, res) => {
        return groupServices.leaveGroup(req.user.id, req.params.id)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send({ message: err.message }));
    },
    readGroup: (req, res) => {
        return groupServices.readGroup()
                .then((result) => res.status(result.status).send({message: result.message, data: result.data}))
                .catch((err) => res.status(err.status).send(err.message));
    },
    readOneGroup: (req, res) => {
        return groupServices.readOneGroup(req.params.id)
                .then((result) => res.status(result.status).send({message: result.message, data: result.data}))
                .catch((err) => res.status(err.status).send(err.message))
    },
    readMyGroup: (req, res) => {
        return groupServices.readMyGroup(req.user.id)
                .then((result) => res.status(result.status).send({message: result.message, data: result.data}))
                .catch((err) => res.status(err.status).send(err.message))
    },
    updateGroup: (req, res) => {
        return groupServices.updateGroup(req.user.id, req.params.id, req.body, req.file)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send(err.message));
    },
    deleteGroup: (req, res) => {
        return groupServices.deleteGroup(req.user.id, req.params.id)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send(err.message));
    }
}; 

module.exports = groupController;