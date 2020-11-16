const db = require("../../config/database");

const Query = {
    creatEvent: (body) => {
        const {id, name,description,minUsers,maxUsers,group} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO events (id, name, description, minUsers, maxUsers, group) VALUES ("${id}", "${name}", "${description}", "${minUsers}", "${maxUsers}", "${group}")`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readEvent: () => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM events`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readOneEvent: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM events WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result[0]); // the result is always an array[0]
            });
        });
    },
    updateEvent: (id, body) => {
        const {name,description,minUsers,maxUsers,group} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `UPDATE events SET "name = "${name}", description = "${description}", minUsers = "${minUsers}", maxUsers = "${maxUsers}", group = "${group}"" WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    deleteEvent: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `DELETE FROM events WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
}
module.exports = Query;