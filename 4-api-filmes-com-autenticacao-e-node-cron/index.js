const express = require('express');
const mongoose = require('mongoose');
const api = express();
require('dotenv').config();



const URL_DB = process.env.URL_BD;
const API_PORT = process.env.API_PORT || 5000;

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


api.listen(API_PORT, () => console.log('API Online na porta '+ API_PORT));

api.get('/status', (req, res) => res.send('<h3>API Online!</h3>'));


const filmsController = require('./controller/film.js');
const userController = require('./controller/user.js');
const authMiddleware = require('./middlewares/authMiddleware.js');

api.post('/login', authMiddleware.login);
api.post('/new-user', userController.userRegister);
api.get('/filmes',  authMiddleware.authentication, filmsController.listFilms);
api.post('/add-film', authMiddleware.authentication, filmsController.addFilm);
api.put('/filme', authMiddleware.authentication, filmsController.editFilm);
api.delete('/filme', authMiddleware.authentication, filmsController.deleteFilm);

