const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  
  password: 'tlqorgkdl7916@',  
  database: 'crowdfunding_db' 
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

