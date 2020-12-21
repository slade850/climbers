const db = require("../../config/database");

const Query = {
    readLike: () => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM likes`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    creatLike: (body) => {
        const {id, type} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO likes (id, type) VALUES ("${id}", "${type}")`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    likePost: (userId, body) => {
        const {postId, likeId} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO posts_likes (post_id, user_id, like_id) VALUES ("${postId}", "${userId}", "${likeId}")`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    updateLike: (id, body) => {
        const {type} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `UPDATE likes SET type="${type}" WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    deleteLike: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `DELETE FROM likes WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
},                         
}
module.exports = Query;