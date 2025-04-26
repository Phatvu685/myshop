const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

console.log('DB Config:', dbConfig);

const pool = mysql.createPool(dbConfig);

pool.getConnection()
    .then(() => console.log('Connected to MySQL database successfully'))
    .catch((error) => {
        console.error('MySQL Connection Error:', error.message);
        process.exit(1);
    });

module.exports = pool;
