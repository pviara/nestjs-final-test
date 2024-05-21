import {
    Injectable,
    ConflictException,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async addUser(email: string): Promise<User> {
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new ConflictException('User already exists');
        }
        const user = new this.userModel({ email });
        const rlt = await user.save();
        return rlt;
    }

    async getUser(param: string): Promise<User> {
        const isObjectId = Types.ObjectId.isValid(param);
        const user = await this.userModel.findOne({
            $or: [
                { email: param },
                { id: isObjectId ? new Types.ObjectId(param) : null },
            ],
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async resetData(): Promise<void> {
        await this.userModel.deleteMany({});
    }
}
