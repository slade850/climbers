const userServices = require('./service');
const mail = require('../../utils/mailService');
const { recovery, reset } = require('../../utils/mailModels');

const userController = {
register: (req, res) => {
    const file = req.file || undefined;
    userServices
        .register(req.body, file)
        .then((result) => res.status(result.status).send({message: result.message}))
        .catch((err) => res.status(err.status).send({ message: err.message }));
    },
updateAvatar: (req, res) => {
    userServices
        .updateAvatar(req.user.id, req.file)
        .then((result) => res.status(result.status).send({message: result.message}))
        .catch((err) => res.status(err.status).send({ message: err.message }));
    },
updateUser: (req, res) => {
    userServices
        .updateUser(req.user.id, req.body)
        .then((result) => res.status(result.status).send({message: result.message}))
        .catch((err) => res.status(err.status).send({ message: err.message }));
    },        
login: (req, res) => {
    userServices
        .login(req.body)
        .then((result) => {
        let { password, ...user } = result.user;
        res.cookie('token', { access_token: result.token }, { maxAge: 86400000, httpOnly: true, sameSite: 'lax' })
        res.status(result.status).send({user: user , message: result.message})
        })
        .catch((err) => res.status(err.status).send(err.message));
    },
lostPassword: (req, res) => {
    userServices.lostPassword(req.body.email)
    .then((result) => {
        let { password, ...user } = result.user;
        console.log(result.link);
        const body = recovery(user.firstName, result.link, result.key);
        mail({receiver: user.email}, 'réinitialisation du mot de passe', body)
        res.status(result.status).send({message: "un mail de récupération viens de vous être envoyé"})
    })
    .catch((err) => res.status(err.status).send(err.message));
},
resetPassword: (req, res) => {
    userServices.resetPassword(req.body, req.params.token)
    .then((result) => {
        let { password, ...user } = result.user;
        const body = reset(user.firstName);
        console.log(user);
        mail({receiver: user.email}, 'mot de passe modifé', body);
        res.status(result.status).send({message: result.message})
    })
    .catch((err) => res.status(err.status).send(err.message));
},
getById: (req, res) => {
    userServices.getById(req.user.id)
        .then((result) => res.status(result.status).send({message: result.message, user: result.user}))
        .catch((err) => res.status(err.status).send(err.message));
    },
getProfile: (req, res) => {
    userServices.getProfile(req.params.slug)
        .then((result) => res.status(result.status).send({message: result.message, user: result.user}))
        .catch((err) => res.status(err.status).send(err.message));
    },    
addContact: (req, res) => {
    userServices.addContact(req.user.id, req.body.contactId)
    .then((result) => res.status(result.status).send({message: result.message}))
    .catch((err) => res.status(err.status).send(err.message));
    },
acceptContact: (req, res) => {
    userServices.acceptContact(req.user.id, req.body)
    .then((result) => res.status(result.status).send({message: result.message}))
    .catch((err) => res.status(err.status).send(err.message));
},    
getContact: (req, res) => {
    userServices.getContact(req.user.id)
        .then((result) => res.status(result.status).send({message: result.message, contacts: result.contact}))
        .catch((err) => res.status(err.status).send(err.message));
    },       
};

module.exports = userController;