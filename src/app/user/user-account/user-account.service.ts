import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, FindOptionsSelect, Repository } from 'typeorm';

import { UserCreateRequest } from '@app/user/user-account/dto/user-create.request';
import { UserUpdateRequest } from '@app/user/user-account/dto/user-update.request';
import { User } from '@domain/user/user.entity';

@Injectable()
export class UserAccountService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async joinUser(data: UserCreateRequest): Promise<User> {
    await Promise.all([
      this.validateUsername('username'),
      this.validateEmail('email'),
    ]);
    const user = await this.userRepository.save({
      ...data,
    });
    return user;
  }

  async getUserProfile(id: string): Promise<User> {
    const user = await this.findById(id);
    return user;
  }

  async updateUserProfile(id: string, data: UserUpdateRequest): Promise<User> {
    await Promise.all([
      this.validateUsername('username'),
      this.validateEmail('email'),
    ]);

    const user = await this.findById(id);

    const updatedUser = await this.userRepository.save({
      ...user,
      ...data,
    });
    return updatedUser;
  }

  async updateUserPassword(id: string, password: string): Promise<boolean> {
    const user = this.findById(id);
    const updatedUser = await this.userRepository.save({
      ...user,
      password,
    });
    return updatedUser !== null;
  }

  async withdrawUser(id: string): Promise<boolean> {
    const user = await this.findById(id);
    const { affected } = await this.userRepository.softDelete(user.id);
    return affected > 0;
  }

  async findById(
    id: string,
    relations?: FindOptionsRelations<User>,
    select?: FindOptionsSelect<User>,
  ): Promise<User> {
    const user = this.userRepository.findOne({
      where: { id },
      select,
      relations,
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  protected async validateUsername(username: string): Promise<void> {
    const count = await this.userRepository.count({ where: { username } });
    if (count > 0) {
      throw new Error('Username already exists');
    }
  }

  protected async validateEmail(email: string): Promise<void> {
    const count = await this.userRepository.count({ where: { email } });
    if (count > 0) {
      throw new Error('Email already exists');
    }
  }
}
