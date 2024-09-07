const { EventEmitter } = require('events');
const { read } = require('fs');
const cron = require('node-cron');
const fs = require('fs');
const { readFile } = require('node:fs/promises'); // Utilize fs.promises para manipular arquivos de forma assíncrona

const fetch = require('node-fetch');

const event = new EventEmitter();
const user = 'jhean';
const password = 'bryan';
const period = '*/2 * * * *';
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQ3NGQzYTZhMTEzZWRiMDZkMmI2NmIiLCJ1c2VyIjoiamhlYW4iLCJlbWFpbCI6ImpoZWFuYmV5YTEyM0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRvd3JQMGpjVnNVc256a2N0a09YNGR1OE8vblNSNlNwQTIwZlFycE5Zbjc3Ujl3UG9FeDlLYSIsIl9uufdiI6MCwiaWF0IjoxNzI1NzI0MzU0LCJleHAiOjE3MjU3MjYxNTR9.VyyhKWIzRsn0arwV9GjViXxdTjr1vi2wOHJOX-HZmcY';


/*
console.log(`Iniciando em: ${new Date()}`);
cron.schedule(period, async () => {
    console.log(`Agora eh: ${new Date()}`);
    const post = await postInFilmApi();
    event.emit(`Item ${22} cadastrado com sucesso!`)
});
const postInFilmApi = async (object)=> {
    //pegar os dados do objeto e postar
    const name = object.name;
    const releaseData = object.releaseData;
    const language = object.language;
    const coverImgUrl = object.coverImgUrl;

    //dar um fetch de post;

    return name;
}
 */



const readJson = async () => {
    fs.readFile('./4-api-filmes-com-autenticacao-e-node-cron/items.json', 'utf8', (err, data) => {
        if (err) {
          console.log('[ERRO]: Ao ler JSON: ', err);
          return;
        }
        return data;
      });
};


const postInApi = async () => {
    /*
    const filmObject = await readJson();
    filmObject.forEach(film => {
        //dar um posta
    });
    console.log(filmObject)
    */

   const name = 'filme2';
   const releaseData = '2022-01-01';
   const language = ['pt', 'us'];
   const coverImgUrl = 'Linkz'
    const urlApi = `http://localhost:3000/add-film?name=${name}&releaseData=${releaseData}&language=${language}&coverImgUrl=${coverImgUrl}`

    const response = await fetch(urlApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : token
        }
    });
    const data = await response.json();
    console.log(data);
}

const getToken = async () =>{
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
}

const tokenIsValid = async () => {
    const urlApi = `http://localhost:3000/filmes`;
    const response = await fetch(urlApi, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        }
    });
    if (response.status === 200)
        return true;
    else
        return false;
    
}

const main = async () => {
    //verificar se o token ta valido, se nao tiver tem que gerar um novo
    const tokenValid = await tokenIsValid()

    if (tokenValid == false)
        console.log(`Token Alterado!`)
        token = await getToken();

    //contina, pois aqui se o token tiver invalido ja tem outro novo na variavel token
    //ler o JSON, e fazer um forEach com uma requisicao post pra cada item do json

    const filmsList = await readJson();
    console.log(filmsList)
    
};
main()
//postInApi()