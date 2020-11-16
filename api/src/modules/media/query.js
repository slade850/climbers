const db = require("../../config/database");

const Query = {
    creatMedia: (body) => {
        const {id, type,path,post_id,user_id} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO medias (id, type, path, post_id, user_id) VALUES ("${id}", "${type}", "${path}", "${post_id}", "${user_id}")`;
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
    updateMedia: (id, body) => {
        const {type,path,post_id,user_id} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `UPDATE medias SET "type = "${type}", path = "${path}", post_id = "${post_id}", user_id = "${user_id}"" WHERE id = "${id}"`;
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