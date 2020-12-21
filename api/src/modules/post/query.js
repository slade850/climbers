const db = require("../../config/database");
const dateTime = require('../../utils/dateNow');

const Query = {
    creatPost: (userId, body) => {
        const {id,title,text} = body;
        return new Promise((resolve, reject) => {
            let date = dateTime();
            let sqlQuery = `INSERT INTO posts (id, created_at, title, text, user) VALUES ("${id}", ${date}, "${title}", "${text}", "${userId}")`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    addThemeToPost: (postId, themeId) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `INSERT INTO posts_themes (post_id, theme_id) VALUES ("${postId}", "${themeId}")`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readPost: () => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT posts.*, themes.theme, users.pseudo, users.avatar FROM posts LEFT OUTER JOIN posts_themes ON posts.id = posts_themes.post_id LEFT OUTER JOIN themes ON posts_themes.theme_id = themes.id LEFT OUTER JOIN users ON posts.user = users.id ORDER BY posts.created_at DESC`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readPostByTheme: (theme) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT posts.*, themes.id AS theme_id, themes.theme, users.pseudo, users.avatar FROM posts, themes, users, posts_themes WHERE themes.theme = "${theme}" AND posts_themes.theme_id = themes.id AND posts.id = posts_themes.post_id AND posts.user = users.id ORDER BY posts.created_at DESC`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    readCommentsByPost: (postId) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT comments.*, users.pseudo, users.avatar FROM comments, users WHERE comments.post_id = "${postId}" AND comments.active = 1 AND users.id = comments.user_id ORDER BY comments.created_at DESC`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result)
            })
        })
    },
    readLikeByPost: (postId) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT posts_likes.*, likes.type, users.pseudo, users.avatar FROM posts_likes , likes, users WHERE posts_likes.post_id = "${postId}" AND likes.id = posts_likes.like_id AND users.id = posts_likes.user_id`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result)
            })
        })
    },
    updatePost: (userId, id, body) => {
        const {title,text} = body;
        return new Promise((resolve, reject) => {
            let date = dateTime();
            let sqlQuery = `UPDATE posts SET title="${title}", text="${text}", updated_at=${date} WHERE id = "${id}" AND user = "${userId}"`;
            db.query(sqlQuery, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
    deletePost: (user, id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `SELECT * FROM posts WHERE id = "${id}"`;
            let hidePost = `UPDATE posts SET active=0 WHERE id = "${id}"`;
            db.query(sqlQuery, (err, result) => {
                if(err){
                    reject(err);
                }else if((result[0].user == user.id) || ["admin", "moderator"].includes(user.role)){
                    db.query(hidePost, (err2, result2) => {
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