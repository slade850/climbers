const db = require("../../config/database");
const { v4: uuidv4 } = require('uuid');
const dateTime = require('../../utils/dateNow');

// Our query is performed on the database and the data is sent back to the service.
const Query = {
    register: (user) => {
        const {id, lastName, firstName, pseudo, email, avatar, hashedPassword, slug} = user;
        return new Promise((resolve, reject) => {
            const date = dateTime();
            let sqlQuery = `INSERT INTO users (id, created_at, lastName, firstName, pseudo, email, avatar, password, slug) VALUES ("${id}", ${date}, "${lastName}", "${firstName}", "${pseudo}", "${email}", "${avatar}","${hashedPassword}", "${slug}")`;
            //role ="user", role is added as a default for the Enum in the database
            let climbQuery = `INSERT INTO climber_profiles (user_id) VALUES ("${id}")`;
            db.query(sqlQuery, (err, result) => {
                if(err) reject(err);
                db.query(climbQuery, (err2, result2) => {
                    err2 ? reject(err2) : resolve(result);
                })
            });
        });
    },
    updateAvatar: (id, avatar) => {
        const date = dateTime();
        return new Promise((resolve, reject) => {
            let sqlQuery = `UPDATE users SET updated_at=${date}, avatar="${avatar}" WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result[0]);
            });
        });
    },
    updatePassword: (id, password) => {
        const date = dateTime();
        return new Promise((resolve, reject) => {
            let sqlQuery = `UPDATE users SET updated_at=${date}, password="${password}" WHERE id = "${id}"`;
            let infoUser = `SELECT * FROM users WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                if(err) reject(err);
                db.query(infoUser, (err2 ,result2) => {
                    err2 ? reject(err2) : resolve(result2[0]);
                })
            });
        });
    },
    updateUser: (id, body) => {
        const date = dateTime();
        const {password, passConfirm, ...values} = body
        const valueTable = [];
        for(let key in values){
            switch(key){
                case 'passwordHash':
                    if(values[key]){
                        valueTable.push(`password="${values[key]}"`)
                    };
                    break;
                default:
                    if(values[key]){
                        valueTable.push(`${key}="${values[key]}"`)
                    };
            }
        }
        console.log(valueTable);
        return new Promise((resolve, reject) => {
            let sqlQuery = `UPDATE users SET updated_at=${date}, ${valueTable.join(',')} WHERE id = "${id}" `;
            console.log(sqlQuery);
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result[0]);
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
    getByMail: (email) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM users WHERE email= "${email}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result[0]);
            });
        });
    },
    last_logon: (id) => {
        const date = dateTime();
        let update = `UPDATE users SET last_logon=${date} WHERE id = "${id}"`;
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
    getProfile: (slug) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT users.*, climber_profiles.*, strong_points.strong_point FROM users LEFT OUTER JOIN climber_profiles ON users.id = climber_profiles.user_id LEFT OUTER JOIN strong_points ON strong_points.id = climber_profiles.strong_id WHERE users.slug = "${slug}"`;
            db.query(sqlQuery, (err, result) => {
                console.log(err, result);
                err ? reject(err) : resolve(result);
            });
        })
    },
    getAllProfile: (limit, start) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT users.*, climber_profiles.*, strong_points.strong_point FROM users LEFT OUTER JOIN climber_profiles ON users.id = climber_profiles.user_id LEFT OUTER JOIN strong_points ON strong_points.id = climber_profiles.strong_id ORDER BY users.id ASC LIMIT ${limit} OFFSET ${start}`;
            db.query(sqlQuery, (err, result) => {
                console.log(err, result);
                err ? reject(err) : resolve(result);
            });
        })
    },
    findUser: (user) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT users.*, climber_profiles.*, strong_points.strong_point FROM users LEFT OUTER JOIN climber_profiles ON users.id = climber_profiles.user_id LEFT OUTER JOIN strong_points ON strong_points.id = climber_profiles.strong_id WHERE (users.lastName LIKE '%${user}%' OR users.firstName LIKE '%${user}%' OR users.pseudo LIKE '%${user}%' OR users.email LIKE '%${user}%') ORDER BY users.id ASC LIMIT 20 OFFSET 0`;
            db.query(sqlQuery, (err, result) => {
                console.log(err, result);
                err ? reject(err) : resolve(result);
            });
        })
    },
    addContact: (id, contactId) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO users_contacts (user_id, contact) VALUES ("${id}","${contactId}")`;
            let uuid = uuidv4();
            const date = dateTime();
            let sqlQuery2 =  `INSERT INTO private_messages (id, created_at, sender, receiver, friend_request) VALUES ("${uuid}",${date},"${id}", "${contactId}", 1)`;
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
        const date = dateTime();
        let update = `UPDATE users_contacts SET connected_at=${date}, active=1  WHERE user_id="${body.contactId}" AND contact="${id}"`;
        let insertContact = `INSERT INTO users_contacts (connected_at, user_id, contact, active) VALUES (${date},"${id}","${body.contactId}",1)`;
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
            let sqlQuery = `SELECT id AS contactId, firstName, lastName, pseudo, avatar, blocked, slug FROM \`users\`, \`users_contacts\` WHERE users_contacts.user_id = "${id}" AND users_contacts.locked = 0 AND users_contacts.active = 1 AND users_contacts.contact = users.id`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    getUserIdBySlug: (slug) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT id FROM users WHERE slug = "${slug}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : result[0] ? resolve(result[0].id) : reject('slug invalide');
            });
        })
    }
}

module.exports = Query;