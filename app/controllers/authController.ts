import express, { Request, Response } from 'express';
import Usuario from '../models/usuario.model';
import jwt from 'jsonwebtoken';

class AuthController {

    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.post('/login', this.authenticate);
    }

    authenticate = (req, res) => {

        const { username, password } = req.body;

        Usuario.findOne({
            where: {
                username: username
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
}

export default AuthController;