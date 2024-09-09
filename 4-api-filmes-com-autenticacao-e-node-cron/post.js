require('dotenv').config();
const { EventEmitter } = require('events');
const { Promise } = require('mongoose');
const cron = require('node-cron');
const fs = require('fs').promises;
const fetch = require('node-fetch');

const event = new EventEmitter();
const period = '*/2 * * * * *' //'*/1 * * * *';
const token = process.env.TOKEN;
let i = 0;
console.log(process.env.TOKEN)

const readJson = async () => {
    const data = await fs.readFile('./items.json', 'utf8');
    return JSON.parse(data);
};

const postInApi = async (name, releaseData, language, coverImgUrl) => {
    const urlApi = `http://localhost:3000/add-film?name=${name}&releaseData=${releaseData}&language=${language}&coverImgUrl=${coverImgUrl}`;
    const response = await fetch(urlApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });
    return await response.json();
};

const getToken = async (user, password) => {
    const urlApi = `http://localhost:3000/login`;
    const response = await fetch(urlApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user': user,
            'password': password
        }
    });
    const data = await response.json();
    return data.token;
};

const tokenIsValid = async () => {
    const urlApi = `http://localhost:3000/filmes`;
    const response = await fetch(urlApi, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        }
    });
    return response.status === 200;
};

const returnTokenError = () => {
    return '[ERRO]: Insira um token correto no arquivo .env!';
};

const successPost = (filmName) => {
    return `[SUCESSO]: Filme ${filmName} cadastrado com sucesso!`;
};

// Listener para o evento 'acessoNegado'
event.on('acessoNegado', (message) => {
    console.error(message); // Usar console.error para erros
});

// Listener para o evento 'filmeCadastrado'
event.on('filmeCadastrado', (message) => {
    console.log(message);
});


cron.schedule(period, async () => {
    console.log('Iniciando...');
    const tokenValid = await tokenIsValid();
    const filmsList = await readJson();

    if (tokenValid == false) {
        console.log('Token inválido.');
        event.emit('acessoNegado', returnTokenError()); 

    } else {
        console.log('Token eh valido.');

        if (i < 10) {
            const film = filmsList[i];
            const postResult = await postInApi(film.name, film.releaseData, film.language, film.coverImgUrl);
            console.log(postResult); 
            event.emit('filmeCadastrado', successPost(film.name));
            i++;
            
        } else {
            console.log('Todos os filmes foram cadastrados.');
        };
    };
});


