import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { isEmail } from 'validator';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) {}

    async addUser(email: string): Promise<void> {
        if (!isEmail(email)) {
            throw new Error('Invalid email');
        }
        
        const existingUser = await this.userModel.findOne({ where: { email } });

        if (existingUser) {
            throw new Error('Email already exists');
        }
        
        await this.userModel.create({ email });
    }

    
    getUser(userId: string): Promise<User> {
        return this.userModel.findOne({ 
            where: {
                 userId,
            },
        });
    }

    
    async resetData(): Promise<void> {
        await this.userModel.destroy({ where: {} });
    }
}