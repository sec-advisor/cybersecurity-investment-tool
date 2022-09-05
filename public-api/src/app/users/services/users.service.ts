import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, map } from 'rxjs';

import { User } from '../../models/database.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}

  insertUser(userName: string, password: string) {
    const username = userName.toLowerCase();
    const newUser = new this.userModel({
      username,
      password,
    });
    return from(newUser.save()).pipe(map(() => newUser));
  }

  getUser(userName: string) {
    const username = userName.toLowerCase();
    return from(this.userModel.findOne({ username }));
  }
}
