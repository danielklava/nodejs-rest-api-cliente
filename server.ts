import { createServer } from 'http';
import App from './App'; // The express app we just created
import ClienteController from './app/controllers/condicaoPagamentoController';
import sequelize from './sequelize';
import CondicaoPagamento from './app/models/condicaopagamento.model';
import CondicaoPagamentoController from './app/controllers/clienteController';

console.log("Starting up");

const port: number = parseInt(process.env.PORT, 10) || 8080;

const app = new App(
    [
        new ClienteController(),
        new CondicaoPagamentoController()
    ],
    port
);

(async () => {
    console.log("Syncing db");

    await sequelize.sync({})

    app.listen()
})();


