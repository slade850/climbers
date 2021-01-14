const db = require("../../config/database");
const dateTime = require('../../utils/dateNow');

const Query = {
    creatGroupMessage: (userId, body) => {
        const {id, group_id, message} = body;
        return new Promise((resolve, reject) => {
            let date = dateTime();
            console.log(date);
            let sqlQuery = `INSERT INTO groups_messages (id, group_id, author, create_at, message) VALUES ("${id}", "${group_id}", "${userId}", ${date}, "${message}")`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve('message créé');
            });
        });
    },
    messageNotRead: (userId, messageId) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO not_read (user_id, message_id) VALUES ("${userId}", "${messageId}")`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    deleteNotRead: (userId, messageId) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `DELETE FROM not_read WHERE user_id = "${userId}" AND message_id = "${messageId}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readAllGroupMessage: (userId) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT DISTINCT groups.id, groups.name, groups.slug, groups.picture, (SELECT Count (not_read.message_id) FROM \`not_read\`, \`groups_messages\` WHERE not_read.user_id = "${userId}" AND not_read.message_id = groups_messages.id AND groups_messages.group_id = groups.id) as new_messages FROM \`groups_messages\`, \`groups_members\`, \`groups\` WHERE (groups_members.user_id = "${userId}" AND groups.id = groups_members.group_id AND groups_messages.group_id = groups.id)`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readGroupMessage: (groupId) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM groups_messages WHERE group_id = "${groupId}" ORDER BY create_at DESC`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readOneGroupMessage: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM groups_messages WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result[0]); // the result is always an array[0]
            });
        });
    },
    updateGroupMessage: (id, body) => {
        const {goup_id,create_at,update_at,message} = body;
        return new Promise((resolve, reject) => {
            let date = dateTime();
            let sqlQuery = `UPDATE groups_messages SET update_at=${date}, message="${message}" WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    deleteGroupMessage: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `DELETE FROM groups_messages WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    getAllGroupMessageId: (userId) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT groups_messages.id FROM \`groups_messages\`, \`groups_members\` WHERE groups_members.user_id = "${userId}" AND groups_messages.group_id = groups_members.group_id AND NOT groups_messages.author = "${userId}" ORDER BY groups_messages.create_at DESC`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
}
module.exports = Query;