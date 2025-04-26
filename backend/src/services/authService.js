const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../model/userModel');
require('dotenv').config();

async function register({ username, email, password, full_name, phone, address }) {
    // Check if user with email already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        throw new Error('Email is already registered');
    }

    // Hash the password
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Create the user
    const userId = await createUser({ username, email, password_hash, full_name, phone, address });
    return userId;
}

async function login({ email, password }) {
    // Find user by email
    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error('Invalid email or password');
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
        throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    // Return user info and token
    return { userId: user.id, email: user.email, token };
}

module.exports = { register, login };
