import { Injectable, Global } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from '@utils/base';
import { Model } from 'mongoose';
import { User } from './identification.model';

@Global()
@Injectable()
export class IdentificationService {
  constructor(@InjectModel(User.name) public model: Model<User>) {}

  async findOne(username: string): Promise<User> {
    return await this.model.findOne({ username });
  }

  async save(user?: UserModel): Promise<User> {
    const userToUpdate = await this.model.findOne({ username: user.username });

    if (!userToUpdate) {
      return await this.model.create({ ...user });
    }

    await userToUpdate.updateOne(user);

    return userToUpdate;
  }
}
