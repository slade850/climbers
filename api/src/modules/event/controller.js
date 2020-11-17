const eventServices = require('./service'); 

const eventController = {
    creatEvent: (req, res) => {
        return eventServices.creatEvent(req.user.id, req.body)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send({ message: err.message }));
    },
    readEvent: (req, res) => {
        return eventServices.readEvent()
                .then((result) => res.status(result.status).send({message: result.message, data: result.data}))
                .catch((err) => res.status(err.status).send(err.message));
    },
    joinEvent: (req, res) => {
        return eventServices.joinEvent(req.user.id, req.params.id)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send({ message: err.message }));
    },
    leaveEvent: (req, res) => {
        return eventServices.leaveEvent(req.user.id, req.params.id)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send({ message: err.message }));
    },
    updateEvent: (req, res) => {
        return eventServices.updateEvent(req.user.id, req.params.id, req.body)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send(err.message));
    },
    deleteEvent: (req, res) => {
        return eventServices.deleteEvent(req.user.id, req.params.id)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send(err.message));
    }
}; 

module.exports = eventController;