const mysql = require('mysql2');
const config = require('config');

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: 3306,
  user: 'root',
  password: 'pass123',
  database: 'kcl_bid',
  connectionLimit: 10, // Adjust the connection limit as needed
});

// Promisify the pool query method
const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  query,
};
