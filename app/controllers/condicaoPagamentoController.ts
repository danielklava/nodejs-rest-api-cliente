import express, { Request, Response } from 'express';
import Sequelize from 'sequelize';

import Cliente from '../models/cliente.model';
import CondicaoPagamento from '../models/condicaopagamento.model';

const Op = Sequelize.Op;

class CondicaoPagamentoController {

    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/condicoespagamento', this.getAllCondicoesPagamento);
        this.router.get('/condicoespagamento/:id', this.getCondicaoPagamentoById);
        this.router.post('/condicoespagamento', this.createCondicaoPagamento);
        this.router.put('/condicoespagamento/:id', this.updateCondicaoPagamento);
        this.router.delete('/condicoespagamento/:id', this.deleteCondicaoPagamento);
    }

    getAllCondicoesPagamento = async (req: Request, res: Response) => {
        res.json(await CondicaoPagamento.findAll());
    };

    getCondicaoPagamentoById = (req: Request, res: Response) => {
        const _paramId = req.params.id;

        CondicaoPagamento.findByPk(_paramId, { include: [Cliente] })
            .then((condicao) => {
                if (!condicao) {
                    res.status(400).send({ message: 'Condição de pagamento não encontrada' });
                }

                res.json(condicao);
            })
    }

    createCondicaoPagamento = (req: Request, res: Response) => {
        console.log(req.body);
        const client = CondicaoPagamento.create(req.body).then((condicao) => {
            res.json(condicao);
        });

    }

    updateCondicaoPagamento = (req: Request, res: Response) => {
        const _paramId = req.params.id;
        console.log(_paramId);
        console.log(req.body);

        CondicaoPagamento.update<CondicaoPagamento>(req.body, { where: { id: _paramId } })
            .then((Condição) => {
                if (!Condição) {
                    return res.status(400).send({
                        message: 'Condição não encontrado'
                    })
                }

                else {
                    res.sendStatus(200);
                }
            });
    }

    deleteCondicaoPagamento = (req: Request, res: Response) => {
        const id = req.params.id;

        CondicaoPagamento.destroy({
            where: { id: id }
        })
            .then((condicao) => {
                res.json(condicao);
            })
    }
}

export default CondicaoPagamentoController