const db = require("../../config/database");

const Query = {
    creatStrongPoint: (body) => {
        const {id, strong_point} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO strong_points (id, strong_point) VALUES ("${id}", "${strong_point}")`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readStrongPoint: () => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM strong_points`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    updateStrongPoint: (id, body) => {
        const {strong_point} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `UPDATE strong_points SET "strong_point = "${strong_point}"" WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    deleteStrongPoint: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `DELETE FROM strong_points WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
}
module.exports = Query;