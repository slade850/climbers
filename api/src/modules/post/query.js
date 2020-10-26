const db = require("../../config/database");
const initPostTable = () => {
        let sqlQuery = 'CREATE TABLE IF NOT EXISTS posts(id VARCHAR(100) PRIMARY KEY NOT NULL, title VARCHAR(255) NOT NULL,text TEXT NULL,media_type VARCHAR(255) NULL,media_path VARCHAR(255) NULL,user VARCHAR(100) ,FOREIGN KEY (user) REFERENCES users(id))';
        return db.query(sqlQuery, (err, result) => {
                err ? console.log(err) : console.log("posts Table ready");
        });
}; 

initPostTable();
const Query = {
    creatPost: (body) => {
        const {id, title,text,media_type,media_path,user} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO posts (id, title, text, media_type, media_path, user) VALUES ("${id}", "${title}", "${text}", "${media_type}", "${media_path}", "${user}")`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readPost: () => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM posts`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readOnePost: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM posts WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result[0]); // the result is always an array[0]
            });
        });
    },
    updatePost: (id, body) => {
        const {title,text,media_type,media_path,user} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `UPDATE posts SET "title = "${title}", text = "${text}", media_type = "${media_type}", media_path = "${media_path}", user = "${user}"" WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    deletePost: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `DELETE FROM posts WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
}
module.exports = Query;