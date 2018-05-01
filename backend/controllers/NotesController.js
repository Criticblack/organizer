"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Notes_1 = require("../models/Notes");
//get all notes
var NotesController = /** @class */ (function () {
    function NotesController() {
    }
    NotesController.prototype.getToday = function (rez, res, next) {
        // const today = new Date();
        Notes_1.default.find({
            'time': {
                $lt: new Date(),
                $gte: new Date(new Date().setDate(new Date().getDate() - 1))
            }
        })
            .then(function (note) {
            res.status(200).json({ note: note });
        })
            .catch(function (err) {
            res.status(500).json({ err: err });
        });
    };
    NotesController.prototype.getAllNotes = function (req, res, next) {
        Notes_1.default.find(function (err, notes) {
            if (err) {
                res.status(500).json({ err: err });
            }
            res.status(200).json({ notes: notes });
        });
    };
    NotesController.prototype.getNoteById = function (req, res, next) {
        var id = req.params.id;
        Notes_1.default.findById(id)
            .then(function (note) {
            res.status(200).json({ note: note });
        })
            .catch(function (err) {
            res.status(500).json({ err: err });
        });
    };
    NotesController.prototype.createNote = function (req, res, next) {
        var title = req.body.title;
        var content = req.body.content;
        var time = req.body.time;
        if (!title) {
            res.status(422).json({ error: 'Title is rquuire' });
        }
        if (!content) {
            res.status(422).json({ error: 'Content is required' });
        }
        if (!time) {
            res.status(422).json({ error: 'Time is required' });
        }
        var note = new Notes_1.default({
            title: title,
            content: content,
            time: time
        });
        note.save(function (err, note) {
            if (err) {
                res.status(500).json({ err: err });
            }
            res.status(200).json({ note: note });
        });
    };
    NotesController.prototype.updateNote = function (req, res, next) {
        var id = req.params.id;
        Notes_1.default.findByIdAndUpdate(id, req.body, function (err, note) {
            if (err) {
                res.status(500).json({ err: err });
            }
            res.status(200).json({ note: note });
        });
    };
    NotesController.prototype.deleteNote = function (req, res, next) {
        var id = req.params.id;
        Notes_1.default.findByIdAndRemove(id, function (err, note) {
            if (err) {
                res.status(500).json({ err: err });
            }
            res.status(200).json({ note: note });
        });
    };
    return NotesController;
}());
exports.NotesController = NotesController;
//# sourceMappingURL=NotesController.js.map