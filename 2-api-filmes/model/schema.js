const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FilmSchema = new Schema({
    name: { type: String, required: true, unique: true},
    releaseData: { type: String },
    language: { type: Array },
    coverImgUrl: { type: String, unique: true },
    creation: { type: Date,  default: Date.now}
});

module.exports = mongoose.model('Filmes', FilmSchema);