"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
const path = require('path');
var NotesController_1 = require("../controllers/NotesController");
exports.default = function (app) {
    var apiRoutes = express.Router();
    var notesRoutes = express.Router();
    var notesController = new NotesController_1.NotesController();
    //Notes Routes
    //Api Routes
    apiRoutes.use('/notes', notesRoutes);
    // get all posts
    notesRoutes.get('/', notesController.getAllNotes);
    //get note by id
    notesRoutes.get('/:id', notesController.getNoteById);
    //create note
    notesRoutes.post('/', notesController.createNote);
    //update note by id
    notesRoutes.put('/:id', notesController.updateNote);
    //delte note by id
    notesRoutes.delete('/:id', notesController.deleteNote);
    //get today 
    apiRoutes.get('/today', notesController.getToday);
    app.use('/api', apiRoutes);

    app.use(express.static(__dirname+'/../dist'));
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname+'/../dist/index.html'));
    });
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname+'/../dist/index.html'));
    });

};
//# sourceMappingURL=v1.js.map