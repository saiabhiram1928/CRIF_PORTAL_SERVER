const mysql = require("mysql2");
require("dotenv").config();

var pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  database: process.env.DB_SCHEMA,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 70,
  queueLimit: 0,
});

module.exports = pool;
