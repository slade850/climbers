const db = require("../../config/database");

const Query = {
    creatComment: (userId, body) => {
        const {id,comment,post_id} = body;
        return new Promise((resolve, reject) => {
            let date = new Date().toLocaleString();
            let sqlQuery = `INSERT INTO comments (id, created_at, comment, user_id, post_id) VALUES ("${id}", "${date}", "${comment}", "${userId}", "${post_id}")`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    updateComment: (userId,id, body) => {
        const {comment} = body;
        return new Promise((resolve, reject) => {
            let date = new Date().toLocaleString();
            let sqlQuery = `UPDATE comments SET comment="${comment}", updated_at="${date}" WHERE id = "${id}" AND user_id = "${userId}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    deleteComment: (user, id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM comments WHERE id = "${id}"`;
            let hideComment = `UPDATE comments SET active=0 WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                if(err){
                    reject(err);
                }else if((result[0].user == user.id) || ["admin", "moderator"].includes(user.role)){
                    db.query(hideComment, (err2, result2) => {
                        err2 ? reject(err2) : resolve({update: true});
                    })
                }else{
                    resolve({update: false});
                }
            });
        });
    },
}
module.exports = Query;