import express, { Request, Response } from 'express';
import Sequelize from 'sequelize';

import Cliente from '../models/cliente.model';
import CondicaoCliente from '../models/condicaocliente.model';
import CondicaoPagamento from '../models/condicaopagamento.model';

const Op = Sequelize.Op;

class ClienteController {

    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/clientes', this.getAllUsers);
        this.router.get('/clientes/:id', this.getUserById);
        this.router.post('/clientes', this.createUser);
        this.router.put('/clientes/:id', this.updateUser);
        this.router.delete('/clientes/:id', this.deleteUser);
    }

    getAllUsers = async (req: Request, res: Response) => {
        res.json(await Cliente.findAll({
            include: [
                {
                    model: CondicaoPagamento,
                    through: {
                        attributes: []
                    }
                }
            ]
        }));
    };

    getUserById = (req: Request, res: Response) => {
        const _paramId = req.params.id;

        Cliente.findByPk(_paramId, {
            include: [
                {
                    model: CondicaoPagamento,
                    through: {
                        attributes: []
                    }
                }
            ]
        })
            .then((cliente) => {
                if (!cliente) {
                    res.status(400).send({ message: 'Cliente não encontrado' });
                }

                res.json(cliente);
            })
    }

    createUser = (req: Request, res: Response) => {
        console.log(req.body);

        Cliente.create<Cliente>(req.body).then((cliente) => {
            let condicoes: Array<string> = [];

            req.body.condicoes.forEach(async condicao => {
                await CondicaoCliente.create<CondicaoCliente>({ clienteId: cliente.id, condicaoId: condicao.codigo });
            })

            Cliente.findByPk(cliente.id)
                .then(cliente => res.json(cliente));
        });
    }

    updateUser = (req: Request, res: Response) => {
        const _paramId = req.params.id;
        console.log(_paramId);
        console.log(req.body);
        let client = Cliente.update<Cliente>(req.body, { where: { id: _paramId } })
            .then((cliente) => {
                if (!cliente) {
                    return res.status(400).send({
                        message: 'Cliente não encontrado'
                    })
                }

                else {
                    res.sendStatus(200);
                }
            });
    }

    deleteUser = (req: Request, res: Response) => {
        const id = req.params.id;

        Cliente.destroy({
            where: { id: id }
        })
            .then((cliente) => {
                res.json(cliente);
            })
    }
}

export default ClienteController