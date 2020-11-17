const db = require("../../config/database");

const Query = {
    creatEvent: (userId, body) => {
        const {id, start_at, end_at, name,description,minUsers,maxUsers} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO events (id, start_at, end_at, name, description, minUsers, maxUsers) VALUES ("${id}", "${start_at}", "${end_at}", "${name}", "${description}", "${minUsers}", "${maxUsers}")`;
            let insertCreator = `INSERT INTO events_participants (event_id, user_id, role) VALUES ("${id}", "${userId}", "creator")`;
            db.query(sqlQuery, (err, result) => {
                if(err) reject(err); 
                db.query(insertCreator, (err2, result2) => {
                    err2 ? reject(err2) : resolve("event created")
                })
            });
        });
    },
    readEvent: () => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM events WHERE active = 1`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readOneEvent: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM events WHERE id = "${id}" AND active = 1`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result[0]); // the result is always an array[0]
            });
        });
    },
    getParticipantsByEvent: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT events_participants.*, users.pseudo, users.avatar FROM events_participants, users WHERE events_participants.event_id = "${id}" AND users.id = events_participants.user_id`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    joinEvent: (userId, eventId) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO events_participants (Event_id, user_id) VALUES ("${eventId}", "${userId}")`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve('Event successfully joined');
            });
        });
    },
    leaveEvent: (userId, eventId) => {
        return new Promise((resolve, reject) => {
            let sqlCheck = `SELECT role FROM events_participants WHERE (event_id = "${eventId}" AND user_id = "${userId}")`;
            let sqlDelete = `DELETE FROM events_participants WHERE (event_id = "${eventId}" AND user_id = "${userId}")`
            db.query(sqlCheck, (err, result) => {
                if(err) reject(err);
                result[0].role == "creator" ? reject("creator can't leave the Event")
                :
                db.query(sqlDelete, (err2, result2) => {
                    err2 ? reject(err2) : resolve('succes')
                })
            });
        });
    },
    updateEvent: (userId, id, body) => {
        const {start_at, end_at, name,description,minUsers,maxUsers} = body;
        return new Promise((resolve, reject) => {
            let sqlCheck = `SELECT role FROM events_participants WHERE 	event_id = "${id}" AND user_id = "${userId}"`;
            let sqlQuery = `UPDATE events SET start_at= "${start_at}", end_at= "${end_at}", name= "${name}", description= "${description}", minUsers= "${minUsers}", maxUsers= "${maxUsers}", Event= "${Event}" WHERE id = "${id}"`;
            db.query(sqlCheck, (err, result) => {
                if(err) reject(err); 
                result[0].role != "creator" ? reject("only creator of event can update")
                :
                db.query(sqlQuery, (err2, result2) => {
                    err2 ? reject(err2) : resolve('succes')
                })
            });
        });
    },
    deleteEvent: (userId, id) => {
        return new Promise((resolve, reject) => {
            let sqlCheck = `SELECT role FROM events_participants WHERE 	event_id = "${id}" AND user_id = "${userId}"`;
            let sqlQuery = `UPDATE events SET active=0 WHERE id = "${id}"`;
            db.query(sqlCheck, (err, result) => {
                if(err) reject(err); 
                result[0].role != "creator" ? reject("only creator of event can delete")
                :
                db.query(sqlQuery, (err2, result2) => {
                    err2 ? reject(err2) : resolve('succes')
                })
            });
        });
    },
}
module.exports = Query;