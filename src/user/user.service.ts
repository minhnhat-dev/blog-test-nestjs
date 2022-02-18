import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../datasources/mongodb/models/User.model';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async getList(query: Record<string, any>): Promise<any> {
    const { limit, skip, sortObject, select } = query;
    const conditions: any = {};

    const [users, total] = await Promise.all([
      this.UserModel.find(conditions)
        .select(select)
        .sort(sortObject)
        .skip(skip)
        .limit(limit),
      this.UserModel.countDocuments(conditions),
    ]);

    return { users, total };
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await new this.UserModel(createUserDto).save();
  }

  async findOne(id: string): Promise<User> {
    return await this.UserModel.findById(id);
  }
}
