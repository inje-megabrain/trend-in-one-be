import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { google } from 'googleapis';
import { Repository } from 'typeorm';

import { videoIngredients } from '@app/crawler/youtube-crawler/youtube.command';
import { Community } from '@domain/post/community.entity';
import { CommunityTitle } from '@domain/post/post';
import { VideoChannel } from '@domain/video/video-channel.entity';
import { Video } from '@domain/video/video.entity';

//TODO: 리팩토링 필요
@Injectable()
export class YoutubeCrawlerService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    @InjectRepository(VideoChannel)
    private readonly videoChannelRepository: Repository<VideoChannel>,
    @InjectRepository(Community)
    private readonly communityRepository: Repository<Community>,
  ) {}

  async getVideos(): Promise<boolean> {
    const youtube = google.youtube({
      version: 'v3',
      auth: process.env.GOOGLE_API_KEY,
    });

    const trendingVideos = await youtube.search.list({
      part: ['snippet'],
      regionCode: 'KR',
      type: ['video'],
      videoDefinition: 'high',
    });
    const youtubeVideos = trendingVideos.data.items as videoIngredients[];

    let community = await this.communityRepository.findOne({
      where: { title: CommunityTitle.YOUTUBE },
    });

    if (!community) {
      community = await this.communityRepository.save({
        title: CommunityTitle.YOUTUBE,
      });
    }

    youtubeVideos.map(async (videoData: videoIngredients) => {
      if (!(await this.isExistChannelId(videoData.snippet.channelId))) {
      }

      let channel = await this.videoChannelRepository.findOne({
        where: { channelId: videoData.snippet.channelId },
      });

      if (!channel) {
        channel = await this.videoChannelRepository.save({
          channelId: videoData.snippet.channelId,
          title: videoData.snippet.channelTitle,
          community,
        });
      }

      const video = await this.videoRepository.findOne({
        where: { videoId: videoData.id.videoId, etag: videoData.etag },
      });

      if (!video) {
        await this.videoRepository.save({
          videoId: videoData.id.videoId,
          etag: videoData.etag,
          uploadedAt: videoData.snippet.publishedAt,
          title: videoData.snippet.title,
          description: videoData.snippet.description,
          thumbnailUri: videoData.snippet.thumbnails.high.url,
          community,
          channel: { id: channel.id },
        });
      }
    });

    return true;
  }

  protected async isExistChannelId(channelId: string): Promise<boolean> {
    const count = await this.videoChannelRepository.count({
      where: { channelId },
    });
    return count > 0;
  }
}
