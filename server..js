const express = require('express');

const apiRoute = require('./routes/noteRoutes');

const app = express();

const path = require('path');

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));
app.use('/api', apiRoute);

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () => 
    console.log(`Listening at http://localhost:${PORT}`)
);
