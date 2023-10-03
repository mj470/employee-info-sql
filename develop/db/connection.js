const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "1234",
    database: "employee_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to the employee_db database.");
});

module.exports = connection;