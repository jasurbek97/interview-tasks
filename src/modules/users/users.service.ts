import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterInterface } from '../auth/interfaces/register.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
  ) {}

  async findOne(email: string): Promise<UserEntity | undefined> {
    return await this.users.findOne({ email });
  }

  async create(user: RegisterInterface): Promise<UserEntity> {
    const newUser = this.users.create(user);
    return await this.users.save(newUser);
  }
}
