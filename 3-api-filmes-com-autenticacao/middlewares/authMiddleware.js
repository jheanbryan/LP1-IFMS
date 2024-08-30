require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/userSchema')
const secretKey = process.env.JWT_SECRET_KEY || '';

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).send({ msg: 'Invalid username or password!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).send({ msg: 'Invalid username or password!' });
        }

        const userData = {
            id: user._id,
            username: user.username
        };

        jwt.sign(userData, secretKey, { expiresIn: '1h' }, (err, token) => {
            if (err) return res.status(500).send({ msg: 'Error generating JWT!' });
            res.status(200).send({ token });
        });
    } catch (err) {
        res.status(500).send({ msg: 'Internal server error', error: err.message });
    }
};

exports.authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).send({ msg: 'Token not provided!' });

    jwt.verify(token, secretKey, (err, userData) => {
        if (err) return res.status(401).send({ msg: 'Invalid or expired token!' });
        req.user = userData;
        next();
    });
};
