const db = require("../../config/database");

const Query = {
    creatTheme: (body) => {
        const {id, theme} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO themes (id, theme) VALUES ("${id}", "${theme}")`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readTheme: () => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM themes`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readOneTheme: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM themes WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result[0]); // the result is always an array[0]
            });
        });
    },
    updateTheme: (id, body) => {
        const {theme} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `UPDATE themes SET theme = "${theme}" WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    deleteTheme: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `DELETE FROM themes WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
}
module.exports = Query;