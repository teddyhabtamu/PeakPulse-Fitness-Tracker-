const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "mysql-teddy.alwaysdata.net",
  user: "teddy",
  password: "1234tttt@#@#",
  database: "teddy_fitness_tracker",
  port: 3306,
  connectionLimit: 10,
});

module.exports = pool.promise();
