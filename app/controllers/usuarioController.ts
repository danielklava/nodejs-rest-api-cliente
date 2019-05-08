import express, { Request, Response } from 'express';
import Sequelize from 'sequelize';

import Usuario from '../models/usuario.model';

const Op = Sequelize.Op;

class UsuarioController {

    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.post('/usuarios', this.createUsuario);
    }
    createUsuario = (req: Request, res: Response) => {
        console.log(req.body);
        Usuario.create(req.body).then((condicao) => {
            res.json(condicao);
        });
    }
}

export default UsuarioController