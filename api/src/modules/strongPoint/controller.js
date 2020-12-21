const strongPointServices = require('./service'); 

const strongPointController = {
    creatStrongPoint: (req, res) => {
        return strongPointServices.creatStrongPoint(req.body)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send({ message: err.message }));
    },
    readStrongPoint: (req, res) => {
        return strongPointServices.readStrongPoint()
                .then((result) => res.status(result.status).send({message: result.message, data: result.data}))
                .catch((err) => res.status(err.status).send(err.message));
    },
    updateStrongPoint: (req, res) => {
        return strongPointServices.updateStrongPoint(req.params.id, req.body)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send(err.message));
    },
    deleteStrongPoint: (req, res) => {
        return strongPointServices.deleteStrongPoint(req.params.id)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send(err.message));
    }
}; 

module.exports = strongPointController;