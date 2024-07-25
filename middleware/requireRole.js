// middleware/requireRole.js
const jwt = require('jsonwebtoken');
const connection = require('../config/db'); // Assurez-vous que le chemin est correct

const JWT_SECRET = 'your_jwt_secret'; // Assurez-vous que c'est le même que dans auth.js

const requireRole = (role) => {
    return (req, res, next) => {
        const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access denied' });
        }

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }

            // Vérifiez le rôle de l'utilisateur dans la base de données
            connection.query('SELECT role FROM users WHERE username = ?', [decoded.username], (error, results) => {
                if (error) return res.status(500).json({ message: 'Database query error' });

                const userRole = results[0] ? results[0].role : null;

                if (userRole !== role) return res.status(403).json({ message: 'Access denied' });

                req.user = { ...decoded, role: userRole };
                next();
            });
        });
    };
};

module.exports = requireRole;
