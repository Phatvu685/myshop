const { connection } = require('../../config/db');

async function createUser({ username, email, password_hash, full_name, phone, address }) {
    try {
        const conn = await connection();
        const [result] = await conn.query(
            'INSERT INTO users (username, email, password_hash, full_name, phone, address) VALUES (?, ?, ?, ?, ?, ?)',
            [username, email, password_hash, full_name, phone, address]
        );
        await conn.end();
        return result.insertId;
    } catch (error) {
        throw new Error(`Failed to create user: ${error.message}`);
    }
}

async function findUserByEmail(email) {
    try {
        const conn = await connection();
        const [users] = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
        await conn.end();
        return users[0];
    } catch (error) {
        throw new Error(`Failed to find user: ${error.message}`);
    }
}

module.exports = { createUser, findUserByEmail };