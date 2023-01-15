import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  ContentsResponse,
  ContentsType,
  PostsResponse,
} from '@app/contents/contents.command';
import { PostProfileResponse } from '@app/contents/post/dto/post-profile.response';
import { TopicProfileResponse } from '@app/contents/topic/dto/topic-profile.response';
import { VideoProfileResponse } from '@app/contents/video/dto/video.profile.response';
import { Community } from '@domain/post/community.entity';
import { CommunityTitle } from '@domain/post/post';
import { Post } from '@domain/post/post.entity';
import { Topic } from '@domain/topic/topic.entity';
import { Video } from '@domain/video/video.entity';

@Injectable()
export class ContentsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    @InjectRepository(Community)
    private readonly communityRepository: Repository<Community>,
  ) {}

  async getAllContents(): Promise<PostsResponse[]> {
    return [];
  }

  async getContentsByCommunityType(
    communityType: CommunityTitle,
  ): Promise<ContentsResponse[]> {
    const { id: communityId } = await this.communityRepository.findOne({
      where: { title: communityType },
    });
    if (
      communityType === CommunityTitle.REDDIT ||
      communityType === CommunityTitle.DC_INSIDE
    ) {
      const posts = await this.postRepository.find({
        where: { community: { id: communityId } },
        relations: ['community'],
      });
      return posts.map((post) => new PostProfileResponse(post));
    }
    if (communityType === CommunityTitle.YOUTUBE) {
      const videos = await this.videoRepository.find({
        where: { community: { id: communityId } },
        relations: ['community'],
      });
      return videos.map(
        (video) =>
          new VideoProfileResponse({
            ...video,
            contentsType: ContentsType.VIDEO,
          }),
      );
    }
    if (communityType === CommunityTitle.TWITTER) {
      const topics = await this.topicRepository.find({
        where: { community: { id: communityId } },
        relations: ['community'],
      });
      return topics.map((topic) => new TopicProfileResponse(topic));
    }
  }

  async createAllCommunities(): Promise<void> {
    const communityTitles = await this.getCommunityTitleArray();

    for (const communityTitle of communityTitles) {
      const community = await this.communityRepository.findOneBy({
        title: communityTitle,
      });

      if (!community) {
        await this.communityRepository.save({
          title: communityTitle,
        });
      }
    }
  }

  async getCommunityTitleArray(): Promise<CommunityTitle[]> {
    return Object.keys(CommunityTitle)
      .filter((key) => isNaN(Number(key)))
      .map((key) => CommunityTitle[key]);
  }
}
