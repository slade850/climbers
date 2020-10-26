const db = require("../../config/database");
const initGroupTable = () => {
        let sqlQuery = 'CREATE TABLE IF NOT EXISTS groups(id VARCHAR(100) PRIMARY KEY NOT NULL, name VARCHAR(255) NOT NULL UNIQUE,picture VARCHAR(255) NULL,description TEXT NULL,active INT NOT NULL)';
        return db.query(sqlQuery, (err, result) => {
                err ? console.log(err) : console.log("groups Table ready");
        });
}; 

initGroupTable();
const Query = {
    creatGroup: (body) => {
        const {id, name,picture,description,active} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO groups (id, name, picture, description, active) VALUES ("${id}", "${name}", "${picture}", "${description}", "${active}")`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
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