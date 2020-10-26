const mysql = require('mysql2'); 

//init database if not exist
const connection = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
}); 

connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_BASE}`, (err, result) => {
    err ? console.log(err) : console.log("Database ready");
});
connection.changeUser({ database: process.env.DB_BASE }, (err) => {
    if(err){
        console.log('error to change database', err);
        return;
    }
})
//Connecting to database
connection.connect((err) => {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
}); 

module.exports = connection;