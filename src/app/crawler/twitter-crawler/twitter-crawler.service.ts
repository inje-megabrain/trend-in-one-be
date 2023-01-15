import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WOEIDNotFoundException } from '@domain/errors/topic.errors';
import { Community } from '@domain/post/community.entity';
import { CommunityTitle } from '@domain/post/post';
import { Topic } from '@domain/topic/topic.entity';

@Injectable()
export class TwitterCrawlerService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
    @InjectRepository(Community)
    private readonly communityRepository: Repository<Community>,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}
  async getTopics(id: string): Promise<Topic[]> {
    const { data: data, status: status } =
      await this.httpService.axiosRef.request({
        method: 'GET',
        url: `trends/place.json?id=${id}`,
      });
    if (status == 404 && data.errors[0].code == 34)
      throw new WOEIDNotFoundException();

    const originTopics = await this.topicRepository.findBy({
      woeid: id,
    });

    await this.topicRepository.remove(originTopics);

    const topics = data[0].trends;

    topics.map(async (topic: any) => {
      const community = await this.communityRepository.findOne({
        where: { title: CommunityTitle.TWITTER },
      });
      const newTopic = this.topicRepository.create({
        name: topic.name,
        url: topic.url,
        promotedContent: topic.promoted_content,
        query: topic.query,
        tweetVolume: topic.tweet_volume,
        woeid: id,
        community,
      });
      await this.topicRepository.save(newTopic);
    });

    return topics;
  }
}
