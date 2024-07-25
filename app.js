// app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mysql = require('mysql2');
const flash = require('connect-flash'); 

const connection = require('./config/db'); // Importez la connexion MySQL

// Routers
const authRouter = require('./routes/auth'); // Assurez-vous que le chemin est correct
const protectedRouter = require('./routes/protectedRoutes'); // Assurez-vous que le chemin est correct

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // Pour gérer les cookies

// Session configuration
app.use(session({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: true,
    store: new session.MemoryStore() // Utilisation de la mémoire pour les sessions, remplacez si nécessaire
}));

// Configuration de session et de flash
app.use(flash());

// Middleware pour injecter les messages flash dans les vues
app.use((req, res, next) => {
    res.locals.message = req.flash('message');
    res.locals.user = req.session.user; // Ajouter l'utilisateur à `res.locals` pour l'accès dans les vues
    next();
});

// Définir le moteur de vues
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Définir les chemins statiques
app.use(express.static(path.join(__dirname, ''))); // Assurez-vous que 'public' est le bon dossier

// Routes principales
app.get('/', (req, res) => {
    const data = {
        title: "Ma Page",
        nom: "Ouassim",
        articles: ["Article 1", "Article 2", "Article 3"]
    };
    res.render('sign-in', data); // Assurez-vous que index.ejs est dans views
});

app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/stade', (req, res) => {
    // Récupérer l'utilisateur connecté à partir de la session
    const user = req.session.user;
    // Passer l'utilisateur à la vue
    res.render('stade', { user });
});

// Middleware pour vérifier le rôle admin
function isAdmin(req, res, next) {
    if (req.session && req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    res.status(403).send('Accès refusé. Vous devez être administrateur.');
}

// Exemple de route protégée pour les administrateurs
app.get('/admin-dashboard', isAdmin, (req, res) => {
    res.render('admin-dashboard'); // Assurez-vous que admin-dashboard.ejs est dans views
});

app.get('/def', (req, res) => {
    res.render('def');
});

app.get('/recolte', (req, res) => {
    res.render('recolte');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/production', (req, res) => {
    res.render('production');
});

app.get('/sign-in', (req, res) => {
    res.render('sign-in');
});

app.get('/register', (req, res) => {
    res.render('register');
});

// Routes d'authentification
app.use('/api/auth', authRouter); // Routes d'authentification

// Routes protégées par rôle
app.use('/api/protected', protectedRouter); // Routes protégées par rôle

// Autres routes (définies dans votre fichier routes/index.js)
app.use('/', require('./routes/index')); // Routes de base (accueil, etc.)

// Gestion de l'inscription
app.post('/register', (req, res) => {
    const { nom, email, password } = req.body;

    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
    connection.query(checkEmailQuery, [email], (error, results) => {
        if (error) {
            return res.render('register', { error: 'Erreur lors de la vérification de l\'email' });
        }
        
        if (results.length > 0) {
            return res.render('register', { error: 'Email déjà utilisé' });
        } else {
            const role = 'user'; // Assignation directe du rôle 'user'

            const insertQuery = 'INSERT INTO users (nom, email, password, role) VALUES (?, ?, ?, ?)';
            connection.query(insertQuery, [nom, email, password, role], (error, results) => {
                if (error) {
                    return res.render('register', { error: 'Erreur lors de l\'enregistrement de l\'utilisateur' });
                }
                console.log('Utilisateur inscrit avec succès.');
                req.flash('message', 'Inscription réussie !');
                res.redirect('/index');
            });
        }
    });
});

// Gestion de la connexion
app.post('/sign-in', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], (error, results) => {
        if (error) {
            console.error('Erreur lors de la vérification des identifiants:', error);
            return res.render('sign-in', { error: 'Erreur lors de la vérification des identifiants' });
        }

        if (results.length === 0) {
            console.log('Email ou mot de passe invalide');
            return res.render('sign-in', { error: 'Email ou mot de passe invalide' });
        }

        const user = results[0];

        if (password !== user.password) { // Comparaison sans hachage
            console.log('Email ou mot de passe invalide');
            return res.render('sign-in', { error: 'Email ou mot de passe invalide' });
        }

        req.session.user = {
            id: user.id,
            nom: user.nom,
            email: user.email,
            role: user.role
        };

        console.log('Utilisateur connecté:', req.session.user);
        res.redirect('/index'); // Assurez-vous que cette route fonctionne
    });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
