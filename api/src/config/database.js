const mysql = require('mysql2'); 

const connection = mysql.createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_BASE, //if database exist
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}); 


//init database if not exist
/* connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_BASE}`, (err, result) => {
    err ? console.log(err) : console.log("Database ready");
});
//select database
connection.changeUser({ database: process.env.DB_BASE }, (err) => {
    if(err){
        console.log('error to change database', err);
        return;
    }
}) */
//Connecting to database
/* connection.connect((err) => {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});  */
connection.on('acquire', function (connection) {
    console.log('Connection %d acquired', connection.threadId);
});
connection.query('SELECT true AS solution', function (error, results, fields) {
    if (error) throw error;
    if(results[0].solution) console.log('pool connction work');
});

module.exports = connection;