const db = require("../../config/database");

const Query = {
    creatGroup: (userId, body) => {
        const {id, name,picture,description,active} = body;
        return new Promise((resolve, reject) => {
            let date = new Date().toLocaleString();
            let sqlQuery = `INSERT INTO groups (id, created_at, name, picture, description) VALUES ("${id}", "${date}", "${name}", "${picture}", "${description}")`;
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
    readGroup: () => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM groups`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readOneGroup: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM groups WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result[0]); // the result is always an array[0]
            });
        });
    },
    readMyGroup: (userid) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT groups.*, groups_members.role FROM groups, groups_members WHERE groups_members.user_id = "${userId}" AND groups.id = groups_members.group_id`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result[0]); // the result is always an array[0]
            });
        });
    },
    updateGroup: (id, body) => {
        const {name,picture,description,active} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `UPDATE groups SET "name = "${name}", picture = "${picture}", description = "${description}", active = "${active}"" WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    deleteGroup: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `DELETE FROM groups WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
}
module.exports = Query;