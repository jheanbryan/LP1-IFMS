import { EventEmitter } from 'events';
import { read } from 'fs';
import cron from 'node-cron';
const event = new EventEmitter();

const period = '*/2 * * * *';
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

const readJson = () => {
    const res = fetch("./items.json");
    const data = res;

    console.log(data)
};
readJson()