const db = require("../../config/database");
const dateTime = require('../../utils/dateNow');

const Query = {
    creatPrivate_message: (userId, body) => {
        const {id, message, receiver} = body;
        return new Promise((resolve, reject) => {
            const date = dateTime();
            let sqlQuery = `INSERT INTO private_messages (id, created_at, message, sender, receiver) VALUES ("${id}", ${date}, "${message}", "${userId}", "${receiver}")`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    viewAllCurrentConversations: (userId) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT DISTINCT users.id, users.pseudo, users.slug, users.avatar, (SELECT Count (private_messages.id) FROM private_messages WHERE receiver = "${userId}" AND sender = users.id AND reading = 0) as new_messages FROM \`users\`, \`private_messages\` WHERE (users.id = private_messages.receiver AND private_messages.sender = "${userId}" AND view_by_sender = 1 AND friend_request = 0) OR (private_messages.receiver = "${userId}" AND users.id = private_messages.sender AND view_by_receiver = 1 AND friend_request = 0) `;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readPrivate_message: (userId, contactId) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM private_messages WHERE (sender = "${userId}" AND receiver = "${contactId}" AND view_by_sender = 1 AND friend_request = 0) OR (receiver = "${userId}" AND sender = "${contactId}" AND view_by_receiver = 1 AND friend_request = 0) ORDER BY private_messages.created_at DESC`;
            let sqlUpdate = `UPDATE private_messages SET reading = 1 WHERE (receiver = "${userId}" AND sender = "${contactId}")`;
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
            let sqlQuery = `SELECT private_messages.id, private_messages.sender AS senderId, users.pseudo, users.lastName, users.firstName, users.avatar FROM \`private_messages\`, \`users\` WHERE private_messages.receiver = "${userId}" AND private_messages.friend_request = 1 AND users.id = private_messages.sender AND view_by_receiver = 1`;
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
                let update = result[0].sender == userId ? `UPDATE private_messages SET view_by_sender = 0 WHERE id = "${id}"` : `UPDATE private_messages SET view_by_receiver = 0 WHERE id = "${id}"`;
                db.query(update, (err2, result2) => {
                    err2 ? reject(err2) : resolve(result2);
                })
            });
        });
    },
    getAllPrivate_messageId: (userId) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT id FROM private_messages WHERE receiver = "${userId}" AND view_by_receiver = 1 AND friend_request = 0 ORDER BY created_at DESC`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
}
module.exports = Query;