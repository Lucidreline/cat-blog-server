import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  // registerUser(user: CreateUserDto) {}

  // loginUser(user: CreateUserDto) {}

  // updateUser(updateUser: UpdateUserDto) {}

  // deleteUser(userId: string): Promise<User> {}
}
