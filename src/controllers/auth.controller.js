const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretJWT = process.env.SECRET_JWT;
const User = require('../models/user.model');

const login = async (req, res) => {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound) {
        return res.status(401).json({
            message: "email o contraseña incorrecta"
        });
    }

    const isCorrectPass = bcrypt.compareSync(password, userFound.password)

    if (!isCorrectPass) {
        return res.status(401).json({
            message: "email o contraseña incorrecta"
        });
    }

    const payload = {
        user: {
            _id: userFound._id
        }
    }

    const token = jwt.sign(payload, secretJWT, { expiresIn: '1h' });

    return res.status(200).json({
        message: "acceso concedido",
        token
    });
}

module.exports = {
    login
}