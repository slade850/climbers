const db = require("../../config/database");

const Query = {
    creatMediaForMessage: (userId, body) => {
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
    readMedia: () => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM medias`;
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
                err ? reject(err) : resolve(result); // the result is always an array[0]
            });
        });
    },
    readMediaInMessage: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM medias WHERE message_id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result); // the result is always an array[0]
            });
        });
    },
    readMediaSharedWithMe: () => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM medias`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    deleteMedia: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `DELETE FROM medias WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
}
module.exports = Query;