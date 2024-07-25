const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../config/db'); // Importez la connexion MySQL

// Route de connexion
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Requête pour vérifier l'utilisateur dans la base de données
    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], async (error, results) => {
        if (error) {
            return res.status(500).send('Erreur serveur');
        }

        if (results.length === 0) {
            return res.status(400).send('Utilisateur non trouvé');
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send('Mot de passe incorrect');
        }

        // Générer un token JWT avec les informations de rôle
        const token = jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true }).redirect('/');
    });
});

module.exports = router;
