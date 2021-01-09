const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studySession = new Schema({
    username: { type: String, required: true },
    subject: { type: String, required: true },
    task: { type: String, required: true },
    start: { type: Date, required: true},
    end: { type: Date, required: true },
    duration: { type: Number, required: true },
    productivity: { type: Number, required: true },
    websites: { type: [String]}
}, {
    timestamps: true,
});

const StudySession = mongoose.model('StudySession', studySession);

module.exports = StudySession;