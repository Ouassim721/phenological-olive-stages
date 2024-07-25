// middleware/auth.js
const jwt = require('jsonwebtoken');
const connection = require('../config/db'); // Assurez-vous que le chemin est correct

module.exports = (roles) => {
    return (req, res, next) => {
        const token = req.cookies.token || req.headers['authorization'];

        if (!token) {
            return res.status(401).json({ message: 'Access denied' });
        }

        jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }

            // Vérifiez le rôle de l'utilisateur dans la base de données
            connection.query('SELECT role FROM users WHERE username = ?', [decoded.username], (error, results) => {
                if (error) {
                    return res.status(500).json({ message: 'Database query error' });
                }

                const userRole = results[0] ? results[0].role : null;
                
                if (!roles.includes(userRole)) {
                    return res.status(403).json({ message: 'Insufficient permissions' });
                }

                req.user = { ...decoded, role: userRole };
                next();
            });
        });
    };
};
