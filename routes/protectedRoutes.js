// routes/protectedRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const connection = require('../config/db'); // Connexion MySQL
const authorize = require('../middleware/authorize'); // Middleware pour vérifier les rôles

// Middleware pour vérifier le token et décoder le JWT
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

// Route protégée pour les administrateurs uniquement
router.get('/admin-only', verifyToken, authorize('admin'), (req, res) => {
    res.send('Welcome, Admin!');
});

module.exports = router;
