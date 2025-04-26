const db = require('../../config/db');

async function createUser({ username, email, password_hash, full_name, phone, address }) {
    try {
        const [result] = await db.query(
            'INSERT INTO users (username, email, password_hash, full_name, phone, address) VALUES (?, ?, ?, ?, ?, ?)',
            [username, email, password_hash, full_name, phone, address]
        );
        return result.insertId;
    } catch (error) {
        throw new Error(`Failed to create user: ${error.message}`);
    }
}

async function findUserByEmail(email) {
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    } catch (error) {
        throw new Error(`Failed to find user: ${error.message}`);
    }
}

module.exports = { createUser, findUserByEmail };