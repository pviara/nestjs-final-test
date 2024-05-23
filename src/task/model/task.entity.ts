import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from '../../user/model/user.entity';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({})
    name: string;

    @Column({})
    priority: number;

    @ManyToOne(() => User, (user) => user.task, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userid' })
    user: User;
}
