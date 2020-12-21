const db = require("../../config/database");

const Query = {
    creatLevel: (body) => {
        const {id, level_range} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO levels (id, level_range) VALUES ("${id}", "${level_range}")`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readLevel: () => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM levels`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readOneLevel: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM levels WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result[0]); // the result is always an array[0]
            });
        });
    },
    updateLevel: (id, body) => {
        const {level_range} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `UPDATE levels SET level_range = "${level_range}" WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    deleteLevel: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `DELETE FROM levels WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
}
module.exports = Query;