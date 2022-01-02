const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'remotemysql.com',
    user: 'HJHeEeKjei',
    database: 'HJHeEeKjei',
    password: 'nw1tAmWRSl'
});
console.log("created connection");

module.exports = pool.promise();
