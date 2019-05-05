import { Model, Table, PrimaryKey, Column, AutoIncrement } from "sequelize-typescript";
import Cliente from "./cliente.model";
import { BelongsToMany } from "sequelize-typescript";
import CondicaoCliente from "./condicaocliente.model";

@Table({
	timestamps: true
})
export default class CondicaoPagamento extends Model<CondicaoPagamento>{

	@PrimaryKey
	@AutoIncrement
	@Column
	id: number;

	@PrimaryKey
	@Column
	codigo: string;

	@Column
	descricao: string;

	@BelongsToMany(() => Cliente, () => CondicaoCliente)
	condicoes?: CondicaoPagamento[]
}
