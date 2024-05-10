import {
    Column,
    Model,
    Table,
    PrimaryKey,
    AutoIncrement,
    HasMany,
} from 'sequelize-typescript';
import { Task } from '../task/task.model';

@Table
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column
    userId: number;

    @Column
    email: string;

    @HasMany(() => Task)
    tasks: Task[];

}
