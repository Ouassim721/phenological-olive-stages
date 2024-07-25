// routes/protected.js
const express = require('express');
const jwt = require('jsonwebtoken');
const connection = require('../config/db'); // Connexion MySQL
const authorize = require('../middleware/authorize'); // Middleware pour vérifier les rôles

const router = express.Router();

// Middleware pour vérifier le rôle et décoder le JWT
const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        req.user = decoded;
        next();
    });
};

// Route protégée pour les admins uniquement
router.get('/admin', verifyToken, authorize('admin'), (req, res) => {
    res.json({ message: 'Welcome Admin!' });
});

// Route protégée pour les utilisateurs
router.get('/user', verifyToken, authorize('admin', 'user'), (req, res) => {
    res.json({ message: 'Welcome User!' });
});

// Route accessible à tout le monde
router.get('/guest', (req, res) => {
    res.json({ message: 'Welcome Guest!' });
});

module.exports = router;
