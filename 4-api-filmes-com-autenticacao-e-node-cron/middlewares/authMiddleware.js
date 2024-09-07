require('dotenv').config();
const secretKey = process.env.JWT_KEY || '';
const jwt = require('jsonwebtoken');
const User = require('../model/userSchema.js');
const bcrypt = require('bcrypt');

exports.authentication = (req, res, next) => {
  const token = req.headers['authorization'];
  console.log(req.headers)
  jwt.verify(token, secretKey, (erro, informacoesuser) => {
    if (erro)
      return res.status(401).send({ msg: 'Token inválido ou expirado!' });


    next();
  });
}

exports.login = async (req, res, next) => {
  /*const user = req.headers.user;
  const password = req.headers.password;*/

  const { user, password } = req.headers;

  const userBD = await User.findOne({ user: user });
  if (!userBD)
    return res.status(400).send({ msg: 'Usuário não existe' });

  const passwordCorreta = await bcrypt.compare(password, userBD.password);
  if (passwordCorreta) {
    delete userBD._id;
    delete userBD.password;

    jwt.sign(userBD.toJSON(), secretKey, { expiresIn: '30m' }, (erro, token) => {
      if (erro)
        return res.status(500).send({ msg: 'Erro ao gerar JWT!' });
      res.status(200).send({ token: token });
    });
  } else {
    res.status(401).send({ msg: 'Usuário ou password errados!' });
  }
}

