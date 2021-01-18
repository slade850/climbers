const bcrypt = require("bcrypt");
const userQueries = require("./query");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const slugify = require('slugify');

const userService = {
    register: (body, file) => {
        return new Promise((resolve, reject) => {
            let { lastName, firstName, pseudo, email, password, passConfirm } = body;
            if (
            typeof lastName !== "string" ||
            typeof firstName !== "string" ||
            typeof email !== "string" ||
            typeof pseudo !== "string" ||
            typeof password !== "string" ||
            typeof passConfirm !== "string"
            ) {
        reject({ status: 400, message: "veuillez saisir une chaîne de caractères dans tous les champs" });
        }
        if (password === passConfirm) {
            let id = uuidv4();
            let avatar = file ? `avatars/${file.filename}` : 'avatars/default.jpg';
            let slug = slugify(pseudo);
            bcrypt.genSalt()
                .then((salt) => bcrypt.hash(password, salt))
                .then((hashedPassword) =>
                userQueries.register({ id, lastName, firstName, pseudo, email, avatar, hashedPassword, slug})
            )
            .then((user) => {
                resolve({ status: 201, message: "nouvel utilisateur créé" })
            })
            .catch((err) => {
                console.log(err);
                if(file) fs.unlinkSync(`./files/avatars/${file.filename}`);
                if(err.sqlMessage.includes('pseudo')){
                    reject({ status: 401, message: "ce pseudo est déjà utilisé !" })
                } else if(err.sqlMessage.includes('email')){
                    reject({ status: 401, message: "cet e-mail est déjà utilisé !" })
                } else {
                    reject({ status: 401, message: "une erreur s'est produite" })
                }
            });
        } else {
            reject({ status: 400, message: "mot de passe incorrect" });
        }
        });
    },
    updateAvatar: async (userId, file) => {
        console.log(userId)
        const avatar = `avatars/${file.filename}`;
        const info = await userQueries.getUser(userId);
        if(info.avatar && info.avatar != 'avatar/default.jpg'){
            fs.unlinkSync(`./files/${info.avatar}`)
        }
        return userQueries.updateAvatar(userId, avatar)
            .then(result => ({ status: 200, message: "avatar mis à jour" }))
            .catch(err => ({ status: 400, message: err }))
    },
    updateUser: async (userId, body) => {
        console.log(body);
        console.log(body.pseudo);
        if (body.password && body.password === body.passConfirm){
            let salt = bcrypt.genSaltSync();
            body.passwordHash = bcrypt.hashSync(body.password, salt);
        }
        body.slug = "pseudo" in body ? slugify(body.pseudo) : undefined;
        return userQueries.updateUser(userId, body)
            .then(result => ({ status: 200, message: "utilisateur mis à jour" }))
            .catch(err => ({ status: 400, message: err }))
    },
    login: (body) => {
        return new Promise((resolve, reject) => {
            let { login, password } = body;
            if (typeof login !== "string" || typeof password !== "string") {
                reject({ status: 400, message: "veuillez saisir une chaîne de caractères dans tous les champs" });
            }
            userQueries.login(login)
                .then((result) => {
                    if (bcrypt.compareSync(password, result.password)) {
                        let token = jwt.sign({ id: result.id, pseudo: result.pseudo, slug: result.slug, role: result.role, avatar: result.avatar },
                                    process.env.SECRET_TOKEN,
                                    { expiresIn: 86400 }
                                    );
                        userQueries.last_logon(result.id)            
                resolve({
                    status: 200,
                    message: "utilisateur connecté",
                    user: result,
                    token: token
                });
            }
            reject({ status: 401, message: "mauvais mot de passe saisi" });
            })
            .catch((err) =>
                reject({
                    status: 401,
                    message: "erreur de connexion, vérifiez vos informations",
                })
            );
        });
    },
    lostPassword: (email)=> {
        return new Promise((resolve, reject) => {
            userQueries.getByMail(email)
            .then((result) => {
                const random = Array(4)
                            .fill(null)
                            .map(() => Math.round(Math.random() * 16).toString(16))
                            .join(''); 
                const token = jwt.sign({id: result.id , randKey: random}, process.env.SECRET_TOKEN, { expiresIn: 600 });
                resolve({
                    status: 200,
                    message: "utilisateur trouvé",
                    user: result,
                    link: `${process.env.API_SERVER_ADDRESS}/reset-password/${token}`,
                    key: random
                });
            })
            .catch((err) =>
                reject({
                    status: 401,
                    message: "utilisateur introuvable",
                })
            );
        })
    },
    resetPassword: (body, token) => {
        const {key, password, passConfirm} = body;
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
                if(err) reject({status: 401, message: "autorisation invalide"})
                if(key === decoded.randKey){
                    if(password === passConfirm){
                        bcrypt.genSalt()
                        .then((salt) => bcrypt.hash(password, salt))
                        .then((hashedPassword) => userQueries.updatePassword(decoded.id, hashedPassword))
                        .then((user) => {
                            resolve({ status: 201, message: "mot de passe modifié", user: user})
                        })
                        .catch((err) => reject({status: 400, message: "une erreur s'est produite"}));
                    } else {
                        reject({status: 400, message: "mot de passe incorrect"});
                    }
                } else {
                    reject({status: 401, message: "autorisation invalide"});
                }
            })
        })
    },
    getById: (id) => {
        return new Promise((resolve, reject) => {
            userQueries.getUser(id)
            .then(result => {
                let { password, ...user } = result[0];
                resolve({
                    status: 200,
                    message: "user found",
                    user: user
                })
            })
            .catch(err => reject({
                status: 400,
                message: "user not found",
            }))
        })
    },
    getProfile: (slug) => {
        return new Promise((resolve, reject) =>{
            userQueries.getProfile(slug)
            .then(result => {
                let { password, role, active, ...user } = result[0];
                resolve({
                    status: 200,
                    message: "user found",
                    user: user
                })
            })
            .catch(err => reject({
                status: 400,
                message: "user not found",
            }))
            })
    },
    findUser: (query) => {
        const {user, limit, start} = query
        return new Promise((resolve, reject) =>{
            if(user){
                userQueries.findUser(user)
                .then(async (result) => {
                if(result.length){
                    const globalRes = await Promise.all(result.map(async (userRes) => {
                        let { password, role, active, email, ...info } = userRes;
                        return info;
                    }))
                    resolve({status: 200, message: "user found", data: globalRes});
                } else{
                    resolve({status: 200, message: "user found", data: result});
                }
                })
                .catch(err => {
                console.log(err)
                reject({
                status: 400,
                message: "user not found",
                })
                })
            }else{
                userQueries.getAllProfile(limit, start)
                .then(async (result) => {
                if(result.length){
                    const globalRes = await Promise.all(result.map(async (userRes) => {
                        let { password, role, active, email, ...info } = userRes;
                        return info;
                    }))
                    resolve({status: 200, message: "user found", data: globalRes});
                } else{
                    resolve({status: 200, message: "user found", data: result});
                }
                })
                .catch(err => {
                console.log(err)
                reject({
                status: 400,
                message: "user not found",
                })
            })
            }
        })
    },
    addContact: (id, contactId) => {
        return new Promise((resolve, reject) => {
            userQueries.addContact(id, contactId)
            .then(result => {
                resolve({
                    status: 200,
                    message: "invitation send"
                })
            })
            .catch(err => reject({
                status: 400,
                message: "an error occurred"
            }))
        })
    },
    acceptContact: (id, body) => {
        return new Promise((resolve, reject) => {
            userQueries.acceptContact(id, body)
            .then(result => {
                resolve({
                    status: 200,
                    message: "contact added"
                })
            })
            .catch(err => reject({
                status: 400,
                message: "an error occurred"
            }))
        })
    },
    getContact: (id) => {
        return new Promise((resolve, reject) => {
            userQueries.getContact(id)
            .then(result => {
                resolve({
                    status: 200,
                    message: "contacts found",
                    contacts: result
                })
            })
            .catch(err => reject({
                status: 400,
                message: "user not found",
            }))
        })
    },
    getUserIdBySlug: async (slug) => {
        return new Promise((resolve, reject) => {
            userQueries.getUserIdBySlug(slug)
                .then(result => {
                    console.log('resulta: ',result)
                    resolve(result)
                })
                .catch(error => {
                    console.log('erreur: ',error)
                    reject(error)
                })
        })        
    }
};

module.exports = userService;