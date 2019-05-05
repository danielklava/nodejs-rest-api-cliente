'use strict';

const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
	const Cliente = sequelize.define('Cliente', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		nome: {
			type: DataTypes.STRING
		},
		nomeFantasia: {
			type: DataTypes.STRING
		},
		senha: {
			type: DataTypes.STRING,
			allowNull: false
		},
		logradouro: {
			type: DataTypes.STRING
		},
		bairro: {
			type: DataTypes.STRING
		},
		cidade: {
			type: DataTypes.STRING
		},
		uf: {
			type: DataTypes.STRING
		},
		limiteCredito: {
			type: DataTypes.INTEGER
		}
	}
		, {
			hooks: {
				beforeCreate: async (user) => {
					const salt = bcrypt.genSaltSync();
					user.senha = await bcrypt.hash(user.senha, salt);
				}
			}
		});

	Cliente.prototype.validPassword = async function (password) {
		return await bcrypt.compare(password, this.password);
	}

	Cliente.associate = function (models) {
		// associations can be defined here
		models.Cliente.belongsToMany(models.CondicaoPagamento, {
			through: 'ClienteCondicao',
			as: 'condicoes',
			foreignKey: 'clienteId'
		});
	};
	return Cliente;
};