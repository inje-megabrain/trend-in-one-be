import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Community } from '@domain/post/community.entity';
import { TopicProperties } from '@domain/topic/topic';
import { Topic } from '@domain/topic/topic.entity';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private readonly postRepository: Repository<Topic>,
    @InjectRepository(Community)
    private readonly communityRepository: Repository<Community>,
  ) {}
  async getTopics(woeid: string): Promise<TopicProperties[]> {
    const tweetVolumeExistTopics = await this.postRepository
      .createQueryBuilder('topic')
      .where('topic.woeid = :woeid', { woeid })
      .where('topic.tweetVolume IS NOT NULL')
      .orderBy('topic.tweetVolume', 'DESC')
      .limit(4)
      .getMany();

    if (tweetVolumeExistTopics.length >= 4) {
      return tweetVolumeExistTopics;
    }

    const tweetVolumeNotExistTopics = await this.postRepository
      .createQueryBuilder('topic')
      .where('topic.woeid = :woeid', { woeid })
      .where('topic.tweetVolume IS NULL')
      .orderBy('topic.uploadedAt', 'DESC')
      .limit(4 - tweetVolumeExistTopics.length)
      .getMany();

    return [...tweetVolumeExistTopics, ...tweetVolumeNotExistTopics];
  }
}
