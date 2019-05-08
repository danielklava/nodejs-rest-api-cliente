import { Table, Model, Column, HasMany, PrimaryKey, AutoIncrement, BelongsToMany, ForeignKey, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';
import bcrypt from 'bcrypt';

@Table
export default class Usuario extends Model<Usuario> {

	constructor(values?: any, options?: any) {
		super(values, options);
	}

	@PrimaryKey
	@Column
	username: string;

	@Column
	nome: string;

	@Column
	senha: string;

	@BeforeCreate
	@BeforeUpdate
	static encryptPassword(instance: Usuario) {
		//const salt = bcrypt.genSaltSync();
		//instance.senha = bcrypt.hash(instance.senha, salt);
	}

	validPassword(senha: string) {
		return bcrypt.compare(senha, this.senha);
	}
}