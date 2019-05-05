import { Table, ForeignKey, Column, PrimaryKey, Model } from "sequelize-typescript";
import Cliente from "./cliente.model";
import CondicaoPagamento from "./condicaopagamento.model";

@Table
export default class CondicaoCliente extends Model<CondicaoCliente>{

    @ForeignKey(() => Cliente)
    @PrimaryKey
    @Column
    clienteId: number;

    @ForeignKey(() => CondicaoPagamento)
    @PrimaryKey
    @Column
    condicaoId: number;

}