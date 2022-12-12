const note = require('express').Router();

// This creates a unique identifier for each note
const {v4: uuidv4} = require('uuid');

// Obtains the variables required to read, write and append the notes
const {readAndAppend, readFromFile, writeToFile} = require('../utils/fsUtils');

// Performs a GET request to obtain information from the notes html file
note.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

// This will post a note once the user has written the title and the information about the note.
note.post('/notes', (req, res) => {
    console.log(req.body);

    const {title, text} = req.body;

    // This if statement will create a new note, updating the empty title, text and id and filling them in with the users input
    // It will then append the json file containing the notes, adding the new one into it
    if(req.body){
        const newNote = {
            title,
            text,
            id: uuidv4(),
        }

        readAndAppend(newNote, './db/db.json');
        res.json('New note added successfully');
    } else{
        res.error('Note not added. Error in adding this note.')
    }
});

// This will delete a selected note made once pressing the delete icon, using the notes unique id
note.delete('/notes/:id', (req,res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((note) => note.note_id !== noteId);

        writeToFile('./db/db.json', result);

        res.json(`Item ${noteId} has been removed`);
    })
});

module.exports = note;