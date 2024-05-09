import {
    Column,
    Model,
    Table,
    PrimaryKey,
    AutoIncrement,
    Validate,
} from 'sequelize-typescript';

@Table
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column
    @Validate({
        min: 0,
        isInt: true,
    })
    userId: number;

    @Column
    email: string;
}
