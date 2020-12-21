const climberPracticeTypeServices = require('./service'); 

const climberPracticeTypeController = {
    creatClimberPracticeType: (req, res) => {
        return climberPracticeTypeServices.creatClimberPracticeType(req.body)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send({ message: err.message }));
    },
    readClimberPracticeType: (req, res) => {
        return climberPracticeTypeServices.readClimberPracticeType()
                .then((result) => res.status(result.status).send({message: result.message, data: result.data}))
                .catch((err) => res.status(err.status).send(err.message));
    },
    updateClimberPracticeType: (req, res) => {
        return climberPracticeTypeServices.updateClimberPracticeType(req.params.id, req.body)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send(err.message));
    },
    deleteClimberPracticeType: (req, res) => {
        return climberPracticeTypeServices.deleteClimberPracticeType(req.params.id)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send(err.message));
    }
}; 

module.exports = climberPracticeTypeController;