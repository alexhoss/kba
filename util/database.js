const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'remotemysql.com',
    user: 'Vr5tddTnB0',
    database: 'Vr5tddTnB0',
    password: 'HawknHJPOx'
});
console.log("created connection");

module.exports = pool.promise();