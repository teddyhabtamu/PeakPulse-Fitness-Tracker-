const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "sql8.freesqldatabase.com",
  user: "sql8765234",
  password: "H4dJgPaVsq",
  database: "sql8765234",
  port: 3306,
  connectionLimit: 10,
});

module.exports = pool.promise();
