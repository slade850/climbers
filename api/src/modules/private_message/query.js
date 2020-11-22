const db = require("../../config/database");

const Query = {
    creatPrivate_message: (userId, body) => {
        const {id, message, reciver} = body;
        return new Promise((resolve, reject) => {
            let date = new Date().toLocaleString();
            let sqlQuery = `INSERT INTO private_messages (id, created_at, message, sender, reciver) VALUES ("${id}", "${date}", "${message}", "${userId}", "${reciver}")`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    viewAllCurrentConversations: (userId) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT DISTINCT users.id, users.pseudo, users.avatar, (SELECT Count (private_messages.id) FROM private_messages WHERE reciver = "${userId}" AND sender = users.id AND reading = 0) as new_messages FROM users, private_messages WHERE (users.id = private_messages.reciver AND private_messages.sender = "${userId}" AND view_by_sender = 1 AND friend_request = 0) OR (private_messages.reciver = "${userId}" AND users.id = private_messages.sender AND view_by_reciver = 1 AND friend_request = 0) `;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readPrivate_message: (userId, contactId) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM private_messages WHERE (sender = "${userId}" AND reciver = "${contactId}" AND view_by_sender = 1 AND friend_request = 0) OR (reciver = "${userId}" AND sender = "${contactId}" AND view_by_reciver = 1 AND friend_request = 0) `;
            let sqlUpdate = `UPDATE private_messages SET reading = 1 WHERE (reciver = "${userId}" AND sender = "${contactId}")`;
            db.query(sqlUpdate, (err, result) => {
                if(err) reject(err);
                db.query(sqlQuery, (err2, result2) => {
                    err2 ? reject(err2) : resolve(result2);
                })
            });
        });
    },
    readInvitation: (userId) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM private_messages WHERE reciver = "${userId}" AND friend_request = 1`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readOnePrivate_message: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM private_messages WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result[0]); // the result is always an array[0]
            });
        });
    },
    updatePrivate_message: (id, userId, body) => {
        const {message} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `UPDATE private_messages SET message = "${message}" WHERE id = "${id}" AND sender = "${userId}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    deletePrivate_message: (id, userId) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM private_messages WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                if(err) reject(err);  
                let update = result[0].sender == userId ? `UPDATE private_messages SET view_by_sender = 0 WHERE id = "${id}"` : `UPDATE private_messages SET view_by_reciver = 0 WHERE id = "${id}"`;
                db.query(update, (err2, result2) => {
                    err2 ? reject(err2) : resolve(result2);
                })
            });
        });
    },
}
module.exports = Query;