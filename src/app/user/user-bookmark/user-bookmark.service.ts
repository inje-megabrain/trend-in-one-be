import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PostService } from '@app/contents/post/post.service';
import { UserAccountService } from '@app/user/user-account/user-account.service';
import { UserBookmark } from '@domain/user/user-bookmark.entity';

@Injectable()
export class UserBookmarkService {
  constructor(
    @InjectRepository(UserBookmark)
    private readonly bookmarkRepository: Repository<UserBookmark>,
    private readonly postService: PostService,
    private readonly userService: UserAccountService,
  ) {}

  async getUserBookmarks(userId: string): Promise<UserBookmark[]> {
    const user = await this.userService.findById(userId);
    const bookmarks = await this.bookmarkRepository.find({
      where: { user: { id: user.id } },
    });

    return bookmarks;
  }

  async addUserBookmark(id: string, postId: string): Promise<UserBookmark> {
    const user = await this.userService.findById(id);
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
    const user = await this.userService.findById(id);
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
