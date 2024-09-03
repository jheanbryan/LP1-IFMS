
const User = require('../model/userSchema.js');
const bcrypt = require('bcrypt');

exports.userRegister = async (req, res) => {
  const user = req.headers.user;
  const password = req.headers.password;
  const email = req.headers.email;

  if (!user || !password || !email)
    return res.status(400).send({ msg: '[ERRO]: Informe user, password e email!' });

  try {
    const existingUser = await User.findOne({ user: user });
    if (existingUser) {
      return res.status(400).send({ msg: '[ERRO]: usuário já cadastrado!' });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      user: user,
      email: email,
      password: encryptedPassword
    }

    await User.create(newUser);
    res.status(200).send({ msg: '[SUCESSO]: Usuário criado!', user: newUser });
  } catch (erro) {
    console.log(erro);
    res.status(500).send({ msg: '[ERRO]: Erro ao registrar usuário', detalhes: erro });
  }
}