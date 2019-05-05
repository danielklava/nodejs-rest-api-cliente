'use strict';
module.exports = (sequelize, DataTypes) => {
	const CondicaoPagamento = sequelize.define('CondicaoPagamento', {
		codigo: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		descricao: DataTypes.STRING
	}, {});
	CondicaoPagamento.associate = function (models) {
		// associations can be defined here
		CondicaoPagamento.belongsToMany(models.Cliente, {
			through: 'ClienteCondicao',
			as: 'clientes',
			foreignKey: 'condicaoId'
		})
	};
	return CondicaoPagamento;
};