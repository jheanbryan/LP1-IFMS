const express = require('express');
const mongoose = require('mongoose');
const api = express();

const URL_DB = 'mongodb+srv://jhean:jheanbryan123@cluster0.5kg9w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const API_PORT = 3000;

// Coneccao e status
mongoose.connect(URL_DB);
mongoose.connection.on('connected', () => {
    console.log('API conectada ao BD!');
});

mongoose.connection.on('disconnected', () => {
    console.log('API foi desconectada do BD!');
});

mongoose.connection.on('error', (erro) => {
    console.log('Erro ao conectar no BD! ', erro);
});


api.listen(API_PORT, () => console.log('API Online!'));

api.get('/status', (req, res) => res.send('<h3>API Online!</h3>'));


const filmsController = require('./controller/film.js');
const authentic = require('./middlewares/authentic.js');
api.post('/login', authentic.login);

api.get('/filme', filmsController.listFilms);
api.post('/filme', filmsController.addFilm);
api.put('/filme', filmsController.editFilm);
api.delete('/filme', filmsController.deleteFilm);
