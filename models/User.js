const bcrypt = require('bcryptjs');
const connection = require('../config/db'); // Assurez-vous que le chemin est correct

// Fonction pour ajouter un utilisateur
const createUser = async (email, password, role = 'user') => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
        connection.query(query, [email, hashedPassword, role], (error, results) => {
            if (error) return reject(error);
            resolve(results.insertId); // Retourne l'ID de l'utilisateur inséré
        });
    });
};

// Fonction pour trouver un utilisateur par email
const findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        connection.query(query, [email], (error, results) => {
            if (error) return reject(error);
            resolve(results[0]); // Retourne le premier résultat trouvé
        });
    });
};

// Fonction pour vérifier le mot de passe
const verifyPassword = async (plainPassword, hashedPassword) => {
    return bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = {
    createUser,
    findUserByEmail,
    verifyPassword
};
