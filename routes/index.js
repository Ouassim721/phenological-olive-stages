const express = require('express');
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
    res.render('index'); // Renders index.ejs
});

// Sign-in page route
router.get('/sign-in', (req, res) => {
    res.render('sign-in'); // Renders sign-in.ejs
});

module.exports = router;
