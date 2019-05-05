'use strict';

module.exports = (sequelize, DataTypes) => {
	const ClienteCondicao = sequelize.define('ClienteCondicao', {
		clienteId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Cliente',
				key: 'id'
			}
		},
		condicaoId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'CondicaoPagamento',
				key: 'codigo'
			}
		}
	});

	return ClienteCondicao;
};