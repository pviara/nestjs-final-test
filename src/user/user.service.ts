import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
    successResponse: any;
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) {}

    async addUser(email: string): Promise<void> {
        const existingUser = await this.userModel.findOne({ where: { email } });
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }
        await this.userModel.create({ email });
    }

    getUser(email: string): Promise<User> {
        return this.userModel.findOne({
            where: {
                email,
            },
        });
    }
    getUserById(id: number) {
        return this.userModel.findByPk(id);
    }


    async resetData(): Promise<void> {
        await this.userModel.destroy({ where: {} });
    }
}
