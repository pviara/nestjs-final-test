import { AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "src/user/user.model";

@Table
export class Task extends Model<Task> {
    @PrimaryKey
    @AutoIncrement
    @Column
    taskId: number;

    @Column
    name: string;

    @Column
    userId: User;

    @Column
    priority: string;
}