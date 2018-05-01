"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var NotesSchema = new Schema({
    time: {
        type: Date,
        default: Date.now,
        required: true
    },
    title: {
        type: String,
        default: '',
        required: true
    },
    content: {
        type: String,
        default: '',
        required: true
    }
});
exports.default = mongoose.model('Notes', NotesSchema);
//# sourceMappingURL=Notes.js.map