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
  async getTopics(id: string): Promise<TopicProperties[]> {
    const topics = await this.postRepository.find({
      where: { woeid: id },
      order: { tweetVolume: 'DESC' },
    });

    return topics;
  }
}
