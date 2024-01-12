const mysql = require('mysql2');
const config = require('config');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pass123',
  database: 'kcl_bid',
});

function query(sql, params) {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Optionally, close the connection when your application is shutting down
// connection.end();

module.exports = {
  query,
};