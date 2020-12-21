const themeQueries = require("./query");
const { v4: uuidv4 } = require('uuid'); 

const themeService = {
    creatTheme: async (body) => {
        const id = uuidv4();
        body.id = id; 
        return themeQueries.creatTheme(body)
                .then((result) => ({status: 201, message: "Creation Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    readTheme: async () => {
        return themeQueries.readTheme()
                .then((result) => ({status: 200, data: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    readOneTheme: async (id) => {
        return themeQueries.readOneTheme(id)
                .then((result) => ({status: 200, data: result}))
                .catch((err) => ({status: 400, message: err}));
    },
    updateTheme: async (id, body) => {
        return themeQueries.updateTheme(id, body)
                .then((result) => ({status: 201, message: "Update Success"}))
                .catch((err) => ({status: 400, message: err}));
    },
    deleteTheme: async (id) => {
        return themeQueries.deleteTheme(id)
                .then((result) => ({status: 200, message: "Deleted"}))
                .catch((err) => ({status: 400, message: err}));
    }
}; 

module.exports = themeService;