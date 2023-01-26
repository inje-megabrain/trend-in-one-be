import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserBookmarkController } from './user-bookmark.controller';
import { UserBookmarkService } from './user-bookmark.service';

import { PostModule } from '@app/contents/post/post.module';
import { UserAccountModule } from '@app/user/user-account/user-account.module';
import { UserBookmark } from '@domain/user/user-bookmark.entity';
import { User } from '@domain/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserBookmark]),
    UserAccountModule,
    PostModule,
  ],
  providers: [UserBookmarkService],
  controllers: [UserBookmarkController],
})
export class UserBookmarkModule {}
