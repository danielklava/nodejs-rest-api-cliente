import { createServer } from 'http';
import App from './App'; // The express app we just created
import ClienteController from './app/controllers/clienteController';
import sequelize from './sequelize';
import CondicaoPagamentoController from './app/controllers/condicaoPagamentoController';
import UsuarioController from './app/controllers/usuarioController';
import AuthController from './app/controllers/authController';

console.log("Starting up");

const port: number = parseInt(process.env.PORT, 10) || 8080;

const app = new App(
    [
        new ClienteController(),
        new CondicaoPagamentoController(),
        new UsuarioController(),
        new AuthController()
    ],
    port
);

(async () => {
    console.log("Syncing db");

    await sequelize.sync({})

    app.listen()
})();


