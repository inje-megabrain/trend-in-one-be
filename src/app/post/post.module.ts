import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostController } from './post.controller';
import { PostService } from './post.service';

import { Community } from '@domain/post/community.entity';
import { Post } from '@domain/post/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Community])],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
