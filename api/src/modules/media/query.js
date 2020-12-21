const db = require("../../config/database");
const fs = require('fs');

const Query = {
    creatMediaForMessage: (userId, body) => {
        const {id, type,path,private_message_id} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO medias (id, type, path, private_message_id, user_id) VALUES ("${id}", "${type}", "${path}", "${private_message_id}", "${userId}")`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    creatMediaForGroupMessage: (userId, body) => {
        const {id, type,path,message_id} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO medias (id, type, path, message_id, user_id) VALUES ("${id}", "${type}", "${path}", "${message_id}", "${userId}")`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    creatMediaForPost: (userId, body) => {
        const {id, type,path,post_id} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO medias (id, type, path, post_id, user_id) VALUES ("${id}", "${type}", "${path}", "${post_id}", "${userId}")`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readMedia: (userId) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT type, path FROM medias WHERE user_id = "${userId}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readOneMedia: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM medias WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result[0]); // the result is always an array[0]
            });
        });
    },
    readMediaInPost: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM medias WHERE post_id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result); 
            });
        });
    },
    readMediaInMessage: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM medias WHERE private_message_id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result); 
            });
        });
    },
    readMediaInGroupMessage: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM medias WHERE message_id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result); 
            });
        });
    },
    readMediaSharedWithMe: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT type, path FROM medias WHERE message_id = "${id}" OR private_message_id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result); 
            });
        });
    },
    deleteMedia: (user, id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM medias WHERE id = "${id}"`;
            let delQuery = ["moderator","admin"].includes(user.role) ? `DELETE FROM medias WHERE id = "${id}"` : `DELETE FROM medias WHERE id = "${id}" AND user_id = "${user.id}"`;
            db.query(sqlQuery, (err, result) => {
                if(err) reject(err);
                if(["moderator","admin"].includes(user.role) || result[0].user_id === user.id){
                    db.query(delQuery, (err2, result2) => {
                        if(err2) reject(err2);
                        fs.unlinkSync(`./files/${result.path}`);
                        resolve('fichier supprimé');
                    })
                }
            });
        });
    },
}
module.exports = Query;