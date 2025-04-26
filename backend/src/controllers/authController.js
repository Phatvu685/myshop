const { register: authServiceRegister, login: authServiceLogin } = require('../services/authService');

async function register(req, res) {
    if (!req.body) {
        return res.status(400).json({ success: false, message: 'Request body is missing' });
    }
    console.log('Register req.body:', req.body);
    try {
        const { username, email, password, full_name, phone, address } = req.body;
        const userId = await authServiceRegister({ username, email, password, full_name, phone, address });
        res.status(201).json({ success: true, message: 'User registered successfully', userId });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

async function login(req, res) {
    if (!req.body) {
        return res.status(400).json({ success: false, message: 'Request body is missing' });
    }
    console.log('Login req.body:', req.body);
    try {
        const { email, password } = req.body;
        const result = await authServiceLogin({ email, password });
        // Return token along with user info
        res.json({ success: true, userId: result.userId, email: result.email, token: result.token });
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
}

module.exports = { register, login };
