import { Table, Model, Column, HasMany, PrimaryKey, AutoIncrement, BelongsToMany, ForeignKey } from 'sequelize-typescript';
import CondicaoPagamento from './condicaopagamento.model';
import CondicaoCliente from './condicaocliente.model';

@Table
export default class Cliente extends Model<Cliente> {

	constructor(values?: any, options?: any) {
		super(values, options);
	}

	@PrimaryKey
	@AutoIncrement
	@Column
	id: number;

	@Column
	nome: string;

	@Column
	nomeFantasia: string;

	@Column
	logradouro: string;

	@Column
	bairro: string;

	@Column
	uf: string;

	@BelongsToMany(() => CondicaoPagamento, () => CondicaoCliente)
	condicoes: CondicaoPagamento[]
}