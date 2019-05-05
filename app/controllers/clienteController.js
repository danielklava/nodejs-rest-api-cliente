
var models = require('../models');

exports.getAllUsers = (req, res, next) => {
    models.Cliente.findAll().then((clientes) => {
        res.json(clientes);
    })
};

exports.getUserById = (req, res, next) => {
    const _paramId = req.params.id;

    models.Cliente.findOne({
        include: [{
            model: models.ClienteCondicao,
            as: 'condicoes',
            required: false,
            attributes: ['codigo', 'descricao'],
            through: { attributes: [] }
        }],
        where: {
            $or: [{ id: _paramId }, { nome: _paramId }]
        }
    })
        .then((cliente) => {
            if (!cliente) {
                res.status(400).send({ message: 'Cliente não encontrado' });
            }

            res.json(cliente);
        })
}

exports.createUser = (req, res, next) => {
    const client = models.Cliente.create({
        nome: req.body.nome,
        nomeFantasia: req.body.nomeFantasia,
        logradouro: req.body.logradouro,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        uf: req.body.uf,
        limiteCredito: req.body.limiteCredito,
        senha: req.body.senha
    }).then((cliente) => {
        res.json(cliente);
    });
}

exports.updateUser = (req, res, next) => {
    (req, res) => {
        const _paramId = req.params.id;

        let client = models.Cliente.findOne({
            where: {
                [Op.or]: [{ id: _paramId }, { nome: _paramId }]
            }
        }).then((cliente) => {
            if (!cliente) {
                return res.status(400).send({
                    message: 'Cliente não encontrado'
                })
            }
        });

    }
}

exports.deleteUser = (req, res, next) => {
    const id = req.params.id;

    models.Cliente.destroy({
        where: { id: id }
    })
        .then((cliente) => {
            res.json(cliente);
        })
}