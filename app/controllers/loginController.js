var models = require('../models');

exports.showLoginPage = (req, res, next) => {
    res.send('Login page');
}

exports.authenticate = (req, res, next) => {

    const { username, password } = req.body;

    var usuario = models.Usuario.findOne({
        where: {
            nome: username
        }
    }).then(async (usuario) => {
        if (!usuario || !usuario.validPassword(password)) {
            res.status(401).json({
                success: false,
                token: null,
                err: "Usuário ou senha incorretos"
            })
        } else {
            let token = jwt.sign({ id: usuario.id, username: usuario.nome }, 'private-key', { expiresIn: 129600 });
            res.json({
                success: true,
                err: null,
                token
            })
        }
    })
}
