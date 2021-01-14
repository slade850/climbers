const db = require("../../config/database");
const dateTime = require('../../utils/dateNow');

const Query = {
    creatGroup: (userId, body) => {
        const {id, name,picture,description, slug} = body;
        return new Promise((resolve, reject) => {
            let date = dateTime();
            let sqlQuery = `INSERT INTO groups (id, created_at, name, picture, description, slug) VALUES ("${id}", ${date}, "${name}", "${picture}", "${description}", "${slug}")`;
            let sqlQuery2 = `INSERT INTO groups_members (group_id, user_id, role) VALUES ("${id}", "${userId}", "admin")`;
            db.query(sqlQuery, (err, result) => {
                if(err) reject(err);
                db.query(sqlQuery2, (err2, result2) => {
                    err2 ? reject(err2) : resolve('nouveau groupe créé');
                })
            });
        });
    },
    addInGroup: (userId, groupId, newUser) => {
        return new Promise((resolve, reject) => {
            let checkUser = `SELECT role FROM groups_members WHERE (group_id = "${groupId}" AND user_id = "${userId}")`
            let sqlQuery = `INSERT INTO groups_members (group_id, user_id) VALUES ("${groupId}", "${newUser}")`;
            db.query(checkUser, (err, result) => {
                if(err) reject(err);
                result[0].role !== "admin" ? 
                reject("Seul un administrateur du groupe peut ajouter un nouveau membre!")
                :
                db.query(sqlQuery, (err2, result2) => {
                    err2 ? reject(err2) : resolve("Nouvel utilisateur ajouté au groupe")
                })
            });
        });
    },
    leaveGroup: (userId, groupId) => {
        return new Promise((resolve, reject) => {
            let sqlCheck = `SELECT user_id FROM groups_members WHERE (group_id = "${groupId}" AND role = "admin")`;
            let sqlDelete = `DELETE FROM groups_members WHERE (group_id = "${groupId}" AND user_id = "${userId}")`
            db.query(sqlCheck, (err, result) => {
                if(err) reject(err);
                const admins = result.map( r => r.user_id);
                const userIsAdmin = admins.includes(userId);
                admins < 2 && userIsAdmin ? reject("Désignez un nouvel admin avant de quitter le groupe")
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
            let sqlQuery = `SELECT g.*, gm.role FROM \`groups\` AS \`g\`, \`groups_members\` AS \`gm\` WHERE gm.user_id = "${userId}" AND g.id = gm.group_id AND g.active = 1`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
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
    getGroupIdBySlug: (userId, slug) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT groups.id FROM \`groups\`, \`groups_members\` WHERE groups.slug = "${slug}" AND groups_members.group_id = groups.id AND groups_members.user_id = "${userId}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : result[0] ? resolve(result[0].id) : reject('group invalide');
            });
        })
    },
    getGroupMembers: (userId, id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM groups_members WHERE group_id = "${id}" AND NOT user_id = "${userId}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        })
    }
}
module.exports = Query;