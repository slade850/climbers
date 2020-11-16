const db = require("./database");

//TABLES STRUCTURE
const initCommentTable = () => {
        let sqlQuery = 'CREATE TABLE IF NOT EXISTS comments (id VARCHAR(100) PRIMARY KEY NOT NULL, comment TEXT NULL,user_id VARCHAR(100) ,post_id VARCHAR(100), active TINYINT(1) DEFAULT 1 NOT NULL)';
        return db.query(sqlQuery, (err, result) => {
                err ? console.log(err) : console.log("structure comments Table ready");
        });
}; 

initCommentTable();

const initEventTable = () => {
    let sqlQuery = 'CREATE TABLE IF NOT EXISTS events (id VARCHAR(100) PRIMARY KEY NOT NULL, name VARCHAR(255) NOT NULL,description TEXT NULL,minUsers INT NOT NULL,maxUsers INT NOT NULL,group_id VARCHAR(100), active TINYINT(1) DEFAULT 1 NOT NULL)';
    return db.query(sqlQuery, (err, result) => {
            err ? console.log(err) : console.log("structure events Table ready");
    });
}; 

initEventTable();

const initGroupTable = () => {
    let sqlQuery = 'CREATE TABLE IF NOT EXISTS groups (id VARCHAR(100) PRIMARY KEY NOT NULL, name VARCHAR(255) NOT NULL UNIQUE,picture VARCHAR(255) NULL,description TEXT NULL,active TINYINT(1) DEFAULT 1 NOT NULL)';
    return db.query(sqlQuery, (err, result) => {
            err ? console.log(err) : console.log("structure groups Table ready");
    });
}; 

initGroupTable();

const initLikeTable = () => {
    let sqlQuery = 'CREATE TABLE IF NOT EXISTS likes (id VARCHAR(100) PRIMARY KEY NOT NULL, type VARCHAR(255) NOT NULL UNIQUE)';
    return db.query(sqlQuery, (err, result) => {
            err ? console.log(err) : console.log("structure likes Table ready");
    });
}; 

initLikeTable();

const initMediaTable = () => {
    let sqlQuery = 'CREATE TABLE IF NOT EXISTS medias (id VARCHAR(100) PRIMARY KEY NOT NULL, type ENUM("image","video","doc") NOT NULL,path VARCHAR(255) NOT NULL,post_id VARCHAR(100) ,user_id VARCHAR(100))';
    return db.query(sqlQuery, (err, result) => {
            err ? console.log(err) : console.log("structure medias Table ready");
    });
}; 

initMediaTable();

const initPostTable = () => {
    let sqlQuery = 'CREATE TABLE IF NOT EXISTS posts (id VARCHAR(100) PRIMARY KEY NOT NULL, title VARCHAR(255) NOT NULL,text TEXT NULL, user VARCHAR(100), active TINYINT(1) DEFAULT 1 NOT NULL)';
    return db.query(sqlQuery, (err, result) => {
            err ? console.log(err) : console.log("structure posts Table ready");
    });
}; 

initPostTable();

const initPrivate_messageTable = () => {
    let sqlQuery = 'CREATE TABLE IF NOT EXISTS private_messages (id VARCHAR(100) PRIMARY KEY NOT NULL, message TEXT NOT NULL,view_by_sender TINYINT(1) DEFAULT 1 NOT NULL,view_by_reciver TINYINT(1) DEFAULT 1 NOT NULL,sender VARCHAR(100) ,reciver VARCHAR(100), friend_request TINYINT(1) NOT NULL, reading TINYINT(1) NOT NULL)';
    return db.query(sqlQuery, (err, result) => {
            err ? console.log(err) : console.log("structure private_messages Table ready");
    });
}; 

initPrivate_messageTable();

const initUserTable = () => {
    let sqlQuery = 'CREATE TABLE IF NOT EXISTS users (id VARCHAR(100) PRIMARY KEY NOT NULL, lastName VARCHAR(255) NOT NULL,firstName VARCHAR(255) NOT NULL,pseudo VARCHAR(255) NOT NULL UNIQUE,email VARCHAR(255) NOT NULL UNIQUE,avatar VARCHAR(255) NULL,password VARCHAR(255) NOT NULL,active TINYINT(1) DEFAULT 1 NOT NULL,role ENUM("user","moderator","admin") NOT NULL)';
    return db.query(sqlQuery, (err, result) => {
            err ? console.log(err) : console.log("structure users Table ready");
    });
}; 

initUserTable();

//JOIN TABLES
const initUsers_contacts = () => {
    let sqlQuery = 'CREATE TABLE IF NOT EXISTS users_contacts (user_id VARCHAR(100) NOT NULL, contact VARCHAR(100) NOT NULL, blocked TINYINT(1) NOT NULL, active TINYINT(1) NOT NULL)';
    return db.query(sqlQuery, (err, result) => {
        err ? console.log(err) : console.log("join table users_contacts ready");
    });
}

initUsers_contacts();

const initEvents_participants = () => {
    let sqlQuery = 'CREATE TABLE IF NOT EXISTS events_participants (event_id VARCHAR(100) NOT NULL, user_id VARCHAR(100) NOT NULL, role ENUM("participant", "creator") NOT NULL)';
    return db.query(sqlQuery, (err, result) => {
        err ? console.log(err) : console.log("join table events_participants ready");
    });
}

initEvents_participants();

const initGroups_members = () => {
    let sqlQuery = 'CREATE TABLE IF NOT EXISTS groups_members (group_id VARCHAR(100) NOT NULL, user_id VARCHAR(100) NOT NULL, role ENUM("admin","member") NOT NULL, PRIMARY KEY (group_id,user_id))';
    return db.query(sqlQuery, (err, result) => {
        err ? console.log(err) : console.log("join table groups_members ready");
    });
}

initGroups_members();

const initPosts_likes = () => {
    let sqlQuery = 'CREATE TABLE IF NOT EXISTS posts_likes (post_id VARCHAR(100) NOT NULL, user_id VARCHAR(100) NOT NULL, like_id VARCHAR(100) NOT NULL, PRIMARY KEY (post_id,user_id))';
    return db.query(sqlQuery, (err, result) => {
        err ? console.log(err) : console.log("join table posts_likes ready");
    });
}

initPosts_likes();

//ADD FK

const fkCommentTable = () => {
    let sqlQuery = 'ALTER TABLE comments ADD CONSTRAINT comments_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id), ADD CONSTRAINT comments_ibfk_2 FOREIGN KEY (post_id) REFERENCES posts (id);';
    return db.query(sqlQuery, (err, result) => {
            err ? console.log(err.errno == 1022 ? "fk comments Table ready" : err) : console.log("fk comments Table ready");
    });
}; 

fkCommentTable();

const fkEventsTable = () => {
    let sqlQuery = 'ALTER TABLE events ADD CONSTRAINT events_ibfk_1 FOREIGN KEY (group_id) REFERENCES groups (id);';
    return db.query(sqlQuery, (err, result) => {
            err ? console.log(err.errno == 1022 ? "fk events Table ready" : err) : console.log("fk events Table ready");
    });
}; 

fkEventsTable();

const fkEvents_participantsTable = () => {
    let sqlQuery = 'ALTER TABLE events_participants ADD CONSTRAINT events_participants_ibfk_1 FOREIGN KEY (event_id) REFERENCES events (id), ADD CONSTRAINT events_participants_ibfk_2 FOREIGN KEY (user_id) REFERENCES users (id);';
    return db.query(sqlQuery, (err, result) => {
            err ? console.log(err.errno == 1022 ? "fk events_participants Table ready" : err) : console.log("fk events_participants Table ready");
    });
}; 

fkEvents_participantsTable();

const fkGroups_membersTable = () => {
    let sqlQuery = 'ALTER TABLE groups_members ADD CONSTRAINT groups_members_ibfk_1 FOREIGN KEY (group_id) REFERENCES groups (id), ADD CONSTRAINT groups_members_ibfk_2 FOREIGN KEY (user_id) REFERENCES users (id);';
    return db.query(sqlQuery, (err, result) => {
            err ? console.log(err.errno == 1022 ? "fk groups_members Table ready" : err) : console.log("fk groups_members Table ready");
    });
}; 

fkGroups_membersTable();

const fkMediasTable = () => {
    let sqlQuery = 'ALTER TABLE medias ADD CONSTRAINT medias_ibfk_1 FOREIGN KEY (post_id) REFERENCES posts (id), ADD CONSTRAINT medias_ibfk_2 FOREIGN KEY (user_id) REFERENCES users (id);';
    return db.query(sqlQuery, (err, result) => {
            err ? console.log(err.errno == 1022 ? "fk medias Table ready" : err) : console.log("fk medias Table ready");
    });
}; 

fkMediasTable();

const fkPostsTable = () => {
    let sqlQuery = 'ALTER TABLE posts ADD CONSTRAINT posts_ibfk_1 FOREIGN KEY (user) REFERENCES users (id);';
    return db.query(sqlQuery, (err, result) => {
            err ? console.log(err.errno == 1022 ? "fk posts Table ready" : err) : console.log("fk posts Table ready");
    });
}; 

fkPostsTable();

const fkPosts_likesTable = () => {
    let sqlQuery = 'ALTER TABLE posts_likes ADD CONSTRAINT posts_likes_ibfk_1 FOREIGN KEY (post_id) REFERENCES posts (id), ADD CONSTRAINT posts_likes_ibfk_2 FOREIGN KEY (user_id) REFERENCES users (id), ADD CONSTRAINT posts_likes_ibfk_3 FOREIGN KEY (like_id) REFERENCES likes (id);';
    return db.query(sqlQuery, (err, result) => {
            err ? console.log(err.errno == 1022 ? "fk posts_likes Table ready" : err) : console.log("fk posts_likes Table ready");
    });
}; 

fkPosts_likesTable();

const fkPrivate_messagesTable = () => {
    let sqlQuery = 'ALTER TABLE private_messages ADD CONSTRAINT private_messages_ibfk_1 FOREIGN KEY (sender) REFERENCES users (id), ADD CONSTRAINT private_messages_ibfk_2 FOREIGN KEY (reciver) REFERENCES users (id);';
    return db.query(sqlQuery, (err, result) => {
            err ? console.log(err.errno == 1022 ? "fk private_messages Table ready" : err) : console.log("fk private_messages Table ready");
    });
}; 

fkPrivate_messagesTable();

const fkUsers_contactsTable = () => {
    let sqlQuery = 'ALTER TABLE users_contacts ADD CONSTRAINT users_contacts_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id), ADD CONSTRAINT users_contacts_ibfk_2 FOREIGN KEY (contact) REFERENCES users (id);';
    return db.query(sqlQuery, (err, result) => {
            err ? console.log(err.errno == 1022 ? "fk users_contacts Table ready" : err) : console.log("fk users_contacts Table ready");
    });
}; 

fkUsers_contactsTable();