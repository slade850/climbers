const db = require("../../config/database");

const Query = {
    readOneClimberProfile: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM climber_profiles WHERE user_id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result[0]); // the result is always an array[0]
            });
        });
    },
    getAllClimberProfile: (limit, start) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT users.id, users.pseudo, users.slug ,users.avatar, climber_profiles.*, strong_points.strong_point FROM users LEFT OUTER JOIN climber_profiles ON users.id = climber_profiles.user_id LEFT OUTER JOIN strong_points ON strong_points.id = climber_profiles.strong_id ORDER BY users.id ASC LIMIT ${limit} OFFSET ${start}`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    getAllPracticeByProfile: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT climber_practice_types.practice, levels.level_range FROM profile_practice_levels, climber_practice_types, levels WHERE profile_practice_levels.profile_id = "${id}" AND climber_practice_types.id = profile_practice_levels.practice_id AND levels.id = profile_practice_levels.level_id`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    updateClimberProfile: (id, body) => {
        const valueTable = [];
        for(let key in body){
            if(body[key]){
                valueTable.push(`${key}="${body[key]}"`)
            };
        }
        return new Promise((resolve, reject) => {
            let sqlQuery = `UPDATE climber_profiles SET ${valueTable.join(',')} WHERE user_id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    deleteClimberProfile: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `DELETE FROM climber_profiles WHERE user_id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
}
module.exports = Query;