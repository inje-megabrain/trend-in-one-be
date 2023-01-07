import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { YoutubeCrawlerController } from '@app/crawler/youtube-crawler/youtube-crawler.controller';
import { YoutubeCrawlerService } from '@app/crawler/youtube-crawler/youtube-crawler.service';
import { Community } from '@domain/post/community.entity';
import { VideoChannel } from '@domain/video/video-channel.entity';
import { Video } from '@domain/video/video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Video, Community, VideoChannel])],
  controllers: [YoutubeCrawlerController],
  providers: [YoutubeCrawlerService],
  exports: [YoutubeCrawlerService],
})
export class YoutubeCrawlerModule {}
