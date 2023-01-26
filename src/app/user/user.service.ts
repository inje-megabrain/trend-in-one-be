import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, FindOptionsSelect, Repository } from 'typeorm';

import { PostService } from '@app/contents/post/post.service';
import { UserCreateRequest } from '@app/user/dto/user-create.request';
import { UserUpdateRequest } from '@app/user/dto/user-update.request';
import { UserBookmark } from '@domain/user/user-bookmark.entity';
import { User } from '@domain/user/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserBookmark)
    private readonly bookmarkRepository: Repository<UserBookmark>,
    private readonly postService: PostService,
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

  async getUserBookmarks(userId: string): Promise<UserBookmark[]> {
    const user = await this.findById(userId);
    const bookmarks = await this.bookmarkRepository
      .createQueryBuilder('bookmark')
      .select(['bookmark.id', 'post.id', 'user.id'])
      .where('bookmark.userId = :id', { id: user.id })
      .getMany();

    return bookmarks;
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

  async addUserBookmark(id: string, postId: string): Promise<UserBookmark> {
    const user = await this.findById(id);
    const post = await this.postService.findById(postId);

    const bookmark = await this.bookmarkRepository.findOne({
      where: { user: { id: user.id }, post: { id: post.id } },
    });
    if (bookmark) {
      return bookmark;
    }

    return await this.bookmarkRepository.save({
      user,
      post,
    });
  }

  async removeUserBookmark(id: string, postId: string): Promise<boolean> {
    const user = await this.findById(id);
    const post = await this.postService.findById(postId);

    const bookmark = await this.bookmarkRepository.findOne({
      where: { user: { id: user.id }, post: { id: post.id } },
    });
    if (!bookmark) {
      throw new Error('Bookmark not found');
    }
    const { affected } = await this.bookmarkRepository.delete(bookmark.id);
    return affected > 0;
  }
}
