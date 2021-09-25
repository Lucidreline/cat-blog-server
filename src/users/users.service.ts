import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUserById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findOne(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  async createUser(user: CreateUserDto) {
    try {
      const newUser = new this.userModel(user);

      newUser.password = await bcrypt.hash(user.password, 10); // hash password

      return await newUser.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  // loginUser(user: CreateUserDto) {}

  // updateUser(updateUser: UpdateUserDto) {}

  // deleteUser(userId: string): Promise<User> {}
}
