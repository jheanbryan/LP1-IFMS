const jwt = require('jsonwebtoken');
const privateKey = 'senhaDeAcessoAoToken ';

exports.authentic = (req, res, next) => {
    console.log('entrou no midware');

    const token = false;

    if (!token) {
        return res.status(401).send({ msg: 'Token Inválido' })
    }
    next()
};

exports.login = (req, res, next) => {
    /*
    const user = req.query.user;
    const password = req.query.password;
    */

    const { user, password } = req.query;
    if (user == 'jhean' && password == '123456') {
        const userData = {
            id: 1,
            name: 'jhean',
            email: 'jhean@email.com'
        };

        jwt.sign(userData, privateKey, (error, token) => {
            if (error)
                return res.status(500).send({ msg: 'Erro ao gerar JWT!'  });
            res.status(200).send({ token: token })
        }) 
    } else 
        res.status(401).send({ msg: 'Usuário ou senha errados!' })


};