import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostModule } from '@app/contents/post/post.module';
import { UserController } from '@app/user/user.controller';
import { UserService } from '@app/user/user.service';
import { UserBookmark } from '@domain/user/user-bookmark.entity';
import { User } from '@domain/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserBookmark]), PostModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
