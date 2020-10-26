const db = require("../../config/database");
const initUserTable = () => {
        let sqlQuery = 'CREATE TABLE IF NOT EXISTS users(id VARCHAR(100) PRIMARY KEY NOT NULL, lastName VARCHAR(255) NOT NULL,firstName VARCHAR(255) NOT NULL,pseudo VARCHAR(255) NOT NULL UNIQUE,email VARCHAR(255) NOT NULL UNIQUE,avatar VARCHAR(255) NULL,password VARCHAR(255) NOT NULL,active INT NOT NULL,role VARCHAR(255) )';
        return db.query(sqlQuery, (err, result) => {
                err ? console.log(err) : console.log("users Table ready");
        });
}; 

initUserTable();
// Our query is performed on the database and the data is sent back to the service.
const Query = {
    register: (user) => {
        const {id, lastName, firstName, pseudo, email, hashedPassword} = user;
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO users (id, lastName, firstName, speudo, email, password) VALUES ("${id}", "${lastName}", "${firstName}", "${pseudo}", "${email}", "${hashedPassword}")`;
            //role ="user", role is added as a default for the Enum in the database
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    login: (userLogin) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM users WHERE email = "${userLogin}" OR pseudo = "${userLogin}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result[0]); // the result is always an array[0]
            });
        });
    },
    getUser: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM users WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
}

module.exports = Query;