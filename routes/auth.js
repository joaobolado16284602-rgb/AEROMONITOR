const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Mock user database
const users = [  
    { id: 1, username: 'john_doe', password: 'password123' },
    { id: 2, username: 'jane_doe', password: 'password456' }
];

// Middleware for JWT verification
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token is required.');

    jwt.verify(token, 'your_jwt_secret_key', (err, decoded) => {
        if (err) return res.status(401).send('Invalid token.');
        req.userId = decoded.id;
        next();
    });
}

// Registration endpoint
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const existingUser = users.find(user => user.username === username);
    if (existingUser) return res.status(400).send('User already exists.');

    const newUser = { id: users.length + 1, username, password };
    users.push(newUser);
    res.status(201).send('User registered successfully.');
});

// Login endpoint
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) return res.status(400).send('Invalid credentials.');

    const token = jwt.sign({ id: user.id }, 'your_jwt_secret_key', { expiresIn: '1h' });
    res.status(200).json({ token });
});

// Logout endpoint
router.post('/logout', verifyToken, (req, res) => {
    // In a real application, you would handle logout by invalidating the token.
    res.status(200).send('Logged out successfully.');
});

// Profile retrieval endpoint
router.get('/profile', verifyToken, (req, res) => {
    const user = users.find(user => user.id === req.userId);
    if (!user) return res.status(404).send('User not found.');
    res.status(200).json({ id: user.id, username: user.username });
});

module.exports = router;