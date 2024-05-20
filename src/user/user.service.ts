import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async addUser(email: string): Promise<User> {
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    const newUser = new this.userModel({ email });
    return newUser.save();
  }

  async getUser(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async resetData(): Promise<void> {
    await this.userModel.deleteMany({});
  }
  async userExists(userId: string): Promise<boolean> {
    const user = await this.userModel.findById(userId).exec();
    return !!user;
  }
}
