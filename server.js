const express = require('express');

// Obtains the file containing the route to post and delete notes
const apiRoute = require('./routes/apiRoutes');

const app = express();

const path = require('path');

// This port is needed to deploy the application onto heroku
const PORT = process.env.PORT || 3001;

// Middleware functions used to have access to json, url and html files and images requests 
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));
app.use('/api', apiRoute);

// This obtains the url for the notes page
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// This obtains the url for the homepage
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// This will log the application website url into the terminal
app.listen(PORT, () => 
    console.log(`Listening at http://localhost:${PORT}`)
);
