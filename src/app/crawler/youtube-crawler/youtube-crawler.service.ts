import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { google } from 'googleapis';
import * as he from 'he';
import { FindOptionsSelect, Repository } from 'typeorm';

import { videoIngredients } from '@app/crawler/youtube-crawler/youtube.command';
import { TasksService } from '@app/tasks/tasks.service';
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
    @Inject(forwardRef(() => TasksService))
    private readonly tasksService: TasksService,
  ) {}

  async getVideos(): Promise<boolean> {
    const youtubeVideos = await this.getVideosData();

    let community = await this.communityRepository.findOne({
      where: { title: CommunityTitle.YOUTUBE },
    });

    if (!community) {
      community = await this.communityRepository.save({
        title: CommunityTitle.YOUTUBE,
      });
    }

    for (const videoData of youtubeVideos) {
      const channel = await this.findByChannelId(videoData.snippet.channelId);
      const video = await this.videoRepository.findOne({
        where: { videoId: videoData.id.videoId, etag: videoData.etag },
      });

      if (video) {
        continue;
      }

      const normalizedVideo = await this.normalizeVideo(videoData);

      if (!channel) {
        const createdChannel = await this.videoChannelRepository.save({
          channelId: videoData.snippet.channelId,
          title: videoData.snippet.channelTitle,
          community,
        });

        await this.videoRepository.save({
          ...normalizedVideo,
          community,
          channel: { id: createdChannel.id },
        });
      } else {
        await this.videoRepository.save({
          ...normalizedVideo,
          community,
          channel: { id: channel.id },
        });
      }
    }

    return true;
  }

  async normalizeVideo(data: videoIngredients): Promise<Video> {
    const decodedTitle = he.decode(data.snippet.title);
    const video = await this.videoRepository.create({
      videoId: data.id.videoId,
      etag: data.etag,
      title: decodedTitle,
      description: data.snippet.description,
      thumbnailUri: data.snippet.thumbnails.medium.url,
      uploadedAt: data.snippet.publishedAt,
    });

    return video;
  }

  async findByChannelId(
    channelId: string,
    select?: FindOptionsSelect<VideoChannel>,
  ): Promise<VideoChannel> {
    const channel = await this.videoChannelRepository.findOne({
      where: { channelId },
      select,
    });

    return channel;
  }

  async getVideosData(): Promise<videoIngredients[]> {
    try {
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
      return trendingVideos.data.items as videoIngredients[];
    } catch (error) {
      await this.tasksService.stopTask(CommunityTitle.YOUTUBE);
      throw new Error('Youtube API 1일 할당량 초과');
    }
  }
}
