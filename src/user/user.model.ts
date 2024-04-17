import {Column, Model, Table, DataType} from 'sequelize-typescript';

@Table
export class User extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;
}