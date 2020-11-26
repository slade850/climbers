const db = require("../../config/database");
const dateTime = require('../../utils/dateNow');

const Query = {
    creatGroup: (userId, body) => {
        const {id, name,picture,description} = body;
        return new Promise((resolve, reject) => {
            let date = dateTime();
            let sqlQuery = `INSERT INTO groups (id, created_at, name, picture, description) VALUES ("${id}", ${date}, "${name}", "${picture}", "${description}")`;
            let sqlQuery2 = `INSERT INTO groups_members (group_id, user_id, role) VALUES ("${id}", "${userId}", "admin")`;
            db.query(sqlQuery, (err, result) => {
                if(err) reject(err);
                db.query(sqlQuery2, (err2, result2) => {
                    err2 ? reject(err2) : resolve('new group created');
                })
            });
        });
    },
    joinGroup: (userId, groupId) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO groups_members (group_id, user_id) VALUES ("${groupId}", "${userId}")`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve('group successfully joined');
            });
        });
    },
    leaveGroup: (userId, groupId) => {
        return new Promise((resolve, reject) => {
            let sqlCheck = `SELECT role FROM groups_members WHERE (group_id = "${groupId}" AND user_id = "${userId}")`;
            let sqlDelete = `DELETE FROM groups_members WHERE (group_id = "${groupId}" AND user_id = "${userId}")`
            db.query(sqlCheck, (err, result) => {
                if(err) reject(err);
                result[0].role == "admin" ? reject("admin can't leave the group")
                :
                db.query(sqlDelete, (err2, result2) => {
                    err2 ? reject(err2) : resolve('succes')
                })
            });
        });
    },
    readGroup: () => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM groups WHERE active=1`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readOneGroup: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM groups WHERE id = "${id}" AND active=1`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result[0]); // the result is always an array[0]
            });
        });
    },
    readMyGroup: (userId) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT groups.*, groups_members.role FROM groups, groups_members WHERE groups_members.user_id = "${userId}" AND groups.id = groups_members.group_id AND groups.active = 1`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result[0]); // the result is always an array[0]
            });
        });
    },
    updateGroup: (userId, id, body) => {
        const {name,picture,description} = body;
        return new Promise((resolve, reject) => {
            let sqlCheck = `SELECT role FROM groups_members WHERE group_id = "${id}" AND user_id = "${userId}"`;
            let sqlQuery = `UPDATE groups SET name="${name}", picture="${picture}", description="${description}" WHERE id = "${id}"`;
            db.query(sqlCheck, (err, result) => {
                if(err) reject(err); 
                result[0].role != "admin" ? reject("only group admin can update")
                :
                db.query(sqlQuery, (err2, result2) => {
                    err2 ? reject(err2) : resolve('succes')
                })
            });
        });
    },
    deleteGroup: (userId, id) => {
        return new Promise((resolve, reject) => {
            let sqlCheck = `SELECT role FROM groups_members WHERE group_id = "${id}" AND user_id = "${userId}"`;
            let sqlQuery = `UPDATE groups SET active=0 WHERE id = "${id}"`;
            db.query(sqlCheck, (err, result) => {
                if(err) reject(err); 
                result[0].role != "admin" ? reject("only group admin can delete")
                :
                db.query(sqlQuery, (err2, result2) => {
                    err2 ? reject(err2) : resolve('succes')
                })
            });
        });
    },
}
module.exports = Query;