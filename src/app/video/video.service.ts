import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { Pagination } from '../../infrastructure/types/pagination.types';

import { VideoListQuery } from '@app/video/video.comand';
import { Community } from '@domain/post/community.entity';
import { VideoChannel } from '@domain/video/video-channel.entity';
import { Video } from '@domain/video/video.entity';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    @InjectRepository(VideoChannel)
    private readonly videoChannelRepository: Repository<VideoChannel>,
    @InjectRepository(Community)
    private readonly communityRepository: Repository<Community>,
  ) {}

  async getVideo(data: VideoListQuery): Promise<Pagination<Video>> {
    const { items, meta } = await paginate(
      this.videoRepository,
      {
        page: data.page,
        limit: data.limit,
      },
      {
        relations: ['community'],
        order: { uploadedAt: 'DESC' },
      },
    );

    return { items, meta };
  }
}
