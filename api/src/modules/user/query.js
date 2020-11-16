const db = require("../../config/database");
const { v4: uuidv4 } = require('uuid');

// Our query is performed on the database and the data is sent back to the service.
const Query = {
    register: (user) => {
        const {id, lastName, firstName, pseudo, email, hashedPassword} = user;
        return new Promise((resolve, reject) => {
            const date = new Date().toLocaleString();
            let sqlQuery = `INSERT INTO users (id, created_at, lastName, firstName, pseudo, email, password) VALUES ("${id}", "${date}", "${lastName}", "${firstName}", "${pseudo}", "${email}", "${hashedPassword}")`;
            //role ="user", role is added as a default for the Enum in the database
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    login: (userLogin) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM users WHERE (email= "${userLogin}" OR pseudo= "${userLogin}")`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result[0]);
            });
        });
    },
    last_logon: (id) => {
        let date = new Date().toLocaleString();
        let update = `UPDATE users SET last_logon= "${date}" WHERE id = "${id}"`;
        db.query(update, (err, result) => {
                    err ? err : result;
        })
    },
    getUser: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM users WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    addContact: (id, contactId) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO users_contacts (user_id, contact) VALUES ("${id}","${contactId}")`;
            let uuid = uuidv4();
            let date = new Date().toLocaleString();
            let sqlQuery2 =  `INSERT INTO private_messages (id, created_at, sender, reciver, friend_request) VALUES ("${uuid}","${date}","${id}", "${contactId}", 1)`;
            db.query(sqlQuery, (err, result) => {
                if(err) reject(err);
                db.query(sqlQuery2, (err2, result2) => {
                    err2 ? reject(err2) : resolve("friend request successfully sent")
                })
            })
        })
    },
    acceptContact: (id, body) => {
        return new Promise((resolve, reject) => {
        let date = new Date().toLocaleString();
        let update = `UPDATE users_contacts SET connected_at="${date}", active=1  WHERE user_id="${body.contactId}" AND contact="${id}"`;
        let insertContact = `INSERT INTO users_contacts (connected_at, user_id, contact, active) VALUES ("${date}","${id}","${body.contactId}",1)`;
        let removeMsg = `DELETE FROM private_messages WHERE id = "${body.msgId}"`;
        db.query(update, (err, result) => {
            if(err) reject(err);
            db.query(insertContact, (err2, result2) => {
                if(err2) reject(err2);
                db.query(removeMsg, (err3, result3) => {
                    err3 ? reject(err3) : resolve("operation complete");
                })
            })
        })
        })
    },
    getContact: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT id AS contactId, pseudo, avatar, blocked FROM users, users_contacts WHERE users_contacts.user_id = "${id}" AND users_contacts.locked = 0 AND users_contacts.active = 1 AND users_contacts.contact = users.id`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
}

module.exports = Query;