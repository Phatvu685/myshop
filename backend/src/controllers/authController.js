const { register, login } = require('../services/authService');

async function register(req, res) {
    try {
        const { username, email, password, full_name, phone, address } = req.body;
        const userId = await register({ username, email, password, full_name, phone, address });
        res.status(201).json({ success: true, message: 'User registered successfully', userId });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const result = await login({ email, password });
        res.json({ success: true, ...result });
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
}

module.exports = { register, login };