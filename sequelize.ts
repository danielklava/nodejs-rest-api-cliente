import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';
import Cliente from './app/models/cliente.model';
import Usuario from './app/models/usuario.model';
import CondicaoCliente from './app/models/condicaocliente.model';
import CondicaoPagamento from './app/models/condicaopagamento.model';

const sequelize = new Sequelize({
    dialect: 'mysql',
    operatorsAliases: null,
    database: 'gp_cadastro_clientes',
    username: 'root',
    password: 'root',
})

sequelize.addModels([Usuario, CondicaoCliente, Cliente, CondicaoPagamento])

export default sequelize;
