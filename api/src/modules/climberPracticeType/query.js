const db = require("../../config/database");

const Query = {
    creatClimberPracticeType: (body) => {
        const {id, practice} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO climber_practice_types (id, practice) VALUES ("${id}", "${practice}")`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readClimberPracticeType: () => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM climber_practice_types`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    updateClimberPracticeType: (id, body) => {
        const {practice} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `UPDATE climber_practice_types SET practice = "${practice}" WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    deleteClimberPracticeType: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `DELETE FROM climber_practice_types WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
}
module.exports = Query;