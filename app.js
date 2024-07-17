const express = require('express');
const path = require('path');
const app = express();
//------------------------------------------------------------//
const indexRouter = require('./routes/index');

app.use('/', indexRouter);
//------------------------------------------------------------//
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views')); // This should point to the views folder

app.use(express.static(path.join(__dirname, '')));


app.get('/', (req, res) => {
    const data = {
        title: "Ma Page",
        nom: "Ouassim",
        articles: ["Article 1", "Article 2", "Article 3"]
    };
    res.render('views/index', data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
