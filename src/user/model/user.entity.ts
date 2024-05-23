import { Entity, OneToMany, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../../task/model/task.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({})
    email: string;

    @OneToMany(() => Task, (task) => task.user)
    task: Task[];
}
