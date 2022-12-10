const note = require('express').Router();

const {v4: uuidv4} = require('uuid');

const {readAndAppend, readFromFile, writeToFile} = require('../utils/fsUtils');

note.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

note.post('/notes', (req, res) => {
    console.log(req.body);

    const {title, text} = req.body;

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