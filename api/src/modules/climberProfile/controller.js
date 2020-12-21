const climberProfileServices = require('./service'); 

const climberProfileController = {
    getAllClimberProfile: (req, res) => {
        return climberProfileServices.getAllClimberProfile()
                .then((result) => res.status(result.status).send({data: result.data, message: result.message}))
                .catch((err) => res.status(err.status).send(err.message));
    },
    updateClimberProfile: (req, res) => {
        return climberProfileServices.updateClimberProfile(req.user.id, req.body)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send(err.message));
    },
    deleteClimberProfile: (req, res) => {
        return climberProfileServices.deleteClimberProfile(req.user)
                .then((result) => res.status(result.status).send({message: result.message}))
                .catch((err) => res.status(err.status).send(err.message));
    }
}; 

module.exports = climberProfileController;