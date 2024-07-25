// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../config/db');

// Route pour l'authentification
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Rechercher l'utilisateur dans la base de données
    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Erreur lors de la recherche de l\'utilisateur' });
        }
        if (results.length === 0) {
            return res.status(401).json({ error: 'Utilisateur non trouvé' });
        }

        const user = results[0];

        // Vérifier le mot de passe
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ error: 'Erreur lors de la vérification du mot de passe' });
            }
            if (!isMatch) {
                return res.status(401).json({ error: 'Mot de passe incorrect' });
            }

            // Générer un token JWT
            const token = jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
            res.json({ token });
        });
    });
});

module.exports = router;
