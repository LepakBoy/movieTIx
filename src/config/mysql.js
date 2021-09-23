const express = require("express");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "moivetix",
});

connection.connect((error) => {
  if (error) {
    throw error;
  }
  console.log("you're now connected to database");
});

module.exports = connection;
