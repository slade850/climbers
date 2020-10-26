const db = require("../../config/database");
const initCommentTable = () => {
        let sqlQuery = 'CREATE TABLE IF NOT EXISTS comments(id VARCHAR(100) PRIMARY KEY NOT NULL, comment TEXT NULL,like_option VARCHAR(255) NULL,user VARCHAR(100) ,post VARCHAR(100) ,FOREIGN KEY (user) REFERENCES users(id),FOREIGN KEY (post) REFERENCES posts(id))';
        return db.query(sqlQuery, (err, result) => {
                err ? console.log(err) : console.log("comments Table ready");
        });
}; 

initCommentTable();
const Query = {
    creatComment: (body) => {
        const {id, comment,like_option,user,post} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO comments (id, comment, like_option, user, post) VALUES ("${id}", "${comment}", "${like_option}", "${user}", "${post}")`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readComment: () => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM comments`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readOneComment: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM comments WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result[0]); // the result is always an array[0]
            });
        });
    },
    updateComment: (id, body) => {
        const {comment,like_option,user,post} = body;
        return new Promise((resolve, reject) => {
            let sqlQuery = `UPDATE comments SET "comment = "${comment}", like_option = "${like_option}", user = "${user}", post = "${post}"" WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    deleteComment: (id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `DELETE FROM comments WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
}
module.exports = Query;