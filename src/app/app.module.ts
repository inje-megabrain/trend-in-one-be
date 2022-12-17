import { Module } from '@nestjs/common';

import { PostModule } from '@app/post/post.module';

@Module({
  imports: [PostModule],
})
export class AppModule {}
