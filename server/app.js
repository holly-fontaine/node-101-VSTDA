const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());

let mock =  [
    {todoItemId: 0, name: 'an item', priority: 3, completed: false},
    {todoItemId: 1, name: 'another item', priority: 2, completed: false},
    {todoItemId: 2, name: 'a done item', priority: 1, completed: true}
    ];

app.get('/', (req, res) => {
    res.status(200).json({status: 'ok'});
})

app.get('/api/TodoItems', (req, res) => {
    
    res.json(mock);
})

app.get('/api/TodoItems/:number', (req, res) => { 
    let number = Number(req.params.number); 
    res.json(mock.find(e => e.todoItemId === number)) 
})

app.post('/api/TodoItems/', (req, res) => {
    let newID = {todoItemId: mock.length, ...req.body};
    mock.push(newID);
    res.status(201).json(newID);
})

app.delete('/api/TodoItems/:number', (req, res) => {
    let number = Number(req.params.number);
    let index = mock.findIndex(e => e.todoItemId === number);
    let deleted = mock.splice(index, 1)
    res.status(200).json(deleted[0]);});

module.exports = app;
