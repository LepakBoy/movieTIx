require("dotenv/config");

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

connection.connect((error) => {
  if (error) {
    throw error;
  }
  console.log("you're now connected to database");
});

module.exports = connection;
