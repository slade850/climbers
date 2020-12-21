const climberProfileQueries = require("./query");

const climberProfileService = {
    readOneClimberProfile: async (id) => {
        return climberProfileQueries.readOneClimberProfile(id)
                .then((result) => ({status: 200, data: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    getAllClimberProfile: async () => {
        return climberProfileQueries.getAllClimberProfile()
                .then(async (result) => {
                    if(result.length){
                        const globalRes = await Promise.all(result.map(async (profile) => {
                            let practices = await climberProfileQueries.getAllPracticeByProfile(profile.id);
                            return ({...profile, practices: practices})
                        }))
                        return ({status: 200, message: "liste des utilisateurs", data: globalRes});
                    } else{
                        return ({status: 200, message: "aucun utilisateur trouvé", data: null});
                    }
                })
                .catch((err) => ({status: 400, message: err}));
    },
    updateClimberProfile: async (id, body) => {
        return climberProfileQueries.updateClimberProfile(id, body)
                .then((result) => ({status: 201, message: "Update Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    deleteClimberProfile: async (id) => {
        return climberProfileQueries.deleteClimberProfile(id)
                .then((result) => ({status: 200, message: "Deleted"}))
                .catch((err) => ({status: 400, message: err}));
    }
}; 

module.exports = climberProfileService;