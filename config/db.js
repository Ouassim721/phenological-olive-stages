// config/db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'users'
});

connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à MySQL:', err.stack);
        return;
    }
    console.log('Connecté à MySQL en tant que ID ' + connection.threadId);
});

module.exports = connection;
