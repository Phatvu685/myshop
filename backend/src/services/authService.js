const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');

async function register({ username, email, password, full_name, phone, address }) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await createUser({
            username,
            email,
            password_hash: hashedPassword,
            full_name,
            phone,
            address,
        });
        return userId;
    } catch (error) {
        throw new Error(`Registration failed: ${error.message}`);
    }
}

async function login({ email, password }) {
    try {
        const user = await findUserByEmail(email);
        if (!user) throw new Error('User not found');

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) throw new Error('Invalid credentials');

        const token = jwt.sign({ user_id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { token, user: { user_id: user.user_id, username: user.username, role: user.role } };
    } catch (error) {
        throw new Error(`Login failed: ${error.message}`);
    }
}

module.exports = { register, login };