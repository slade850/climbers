const db = require("../../config/database");
const initPrivate_messageTable = () => {
        let sqlQuery = 'CREATE TABLE IF NOT EXISTS private_messages(id VARCHAR(100) PRIMARY KEY NOT NULL, message TEXT NOT NULL,view_by_sender INT NOT NULL,view_by_reciver INT NOT NULL,sender VARCHAR(100) ,reciver VARCHAR(100) ,FOREIGN KEY (sender) REFERENCES users(id),FOREIGN KEY (reciver) REFERENCES users(id))';
        return db.query(sqlQuery, (err, result) => {
                err ? console.log(err) : console.log("private_messages Table ready");
        });
}; 

initPrivate_messageTable();
const Query = {
    creatPrivate_message: (body) => {
        const {id, message,view_by_sender,view_by_reciver,sender,reciver} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO private_messages (id, message, view_by_sender, view_by_reciver, sender, reciver) VALUES ("${id}", "${message}", "${view_by_sender}", "${view_by_reciver}", "${sender}", "${reciver}")`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readPrivate_message: () => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM private_messages`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readOnePrivate_message: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM private_messages WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result[0]); // the result is always an array[0]
            });
        });
    },
    updatePrivate_message: (id, body) => {
        const {message,view_by_sender,view_by_reciver,sender,reciver} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `UPDATE private_messages SET "message = "${message}", view_by_sender = "${view_by_sender}", view_by_reciver = "${view_by_reciver}", sender = "${sender}", reciver = "${reciver}"" WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    deletePrivate_message: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `DELETE FROM private_messages WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
}
module.exports = Query;