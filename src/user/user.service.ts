import { Injectable, NotImplementedException } from '@nestjs/common';
import { User } from './model/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    /*addUser(email: string): Promise<void> {
        throw new NotImplementedException();
    }

    getUser(email: string): Promise<unknown> {
        throw new NotImplementedException();
    }*/

    resetData(): Promise<void> {
        throw new NotImplementedException();
    }
}
