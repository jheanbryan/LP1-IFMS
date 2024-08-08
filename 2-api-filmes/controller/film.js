const Films = require('../model/schema.js')

function returnErrorMessage(res, messageError, error= '') {
    if(error == '')
        res.send({message: `[ERRO]: ${messageError}`});
    else
        res.send({message: `[ERRO]: ${messageError}`, error: error});
};

function returnMessage(res, message) {
    res.send({message: `[SUCESSO]: ${message}`})
};

exports.listFilms = async (req, res) => {
    try {
        const films = await Films.find();
        res.send(films);

    } catch (error) {
        console.log(error);
        returnErrorMessage(res, 'Erro ao listar filmes!', error)
    }
};

//tirar o else
exports.addFilm = async (req, res) => {
    const newFilm = req.query;

    if (!newFilm.name) {
        returnErrorMessage(res, 'Informe o nome do filme!');

    } else {
        try {
            await Films.create(newFilm);
            returnMessage(res, 'Filme adicionado!')

        } catch (error) {
            console.log(error);
            returnErrorMessage(res, 'Problemas ao cadastrar!', error)
        }
    }
};

exports.editFilm = async (req, res) => {
    const film = req.query;
    console.log(film)
    if (!film.name) {
        return returnErrorMessage(res, 'Informe o nome do filme a ser editado!')
    }
    try {
        const editedFilm = await Films.findOneAndUpdate({ name: film.name }, film);

        if (editedFilm == null)
            returnErrorMessage(res, 'Esse filme nao existe no Banco!');
        else 
            returnMessage(res, 'Filme editado!')

    } catch (error) {
        console.log(error);
        returnErrorMessage(res, 'Erro ao editar!', error)
    }
};

exports.deleteFilm = async (req, res) => {
    const film = req.query;

    if (!film) {
        return returnErrorMessage(res, 'Informe o nome do filme a ser deletado!');
    }
    try {
        const deletedFilm = await Films.findOneAndDelete({ name: film.name });
        if(deletedFilm == null)
            returnErrorMessage(res, 'Filme nao encontrado no Banco!');
        else
            returnMessage(res, 'Filme deletado!')
    } catch (error) {
        console.log(error);
        returnErrorMessage(res, 'Errro ao deletar filme!', error)
    }
};

//forçar os errros pra testar dps