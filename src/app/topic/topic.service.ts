import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { TopicProfileResponse } from '@app/topic/dto/topic-profile.response';
import { WOEIDNotFoundException } from '@domain/errors/topic.errors';

@Injectable()
export class TopicService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}
  async getTopics(id: string): Promise<TopicProfileResponse[]> {
    const { data: data, status: status } =
      await this.httpService.axiosRef.request({
        method: 'GET',
        url: `trends/place.json?id=${id}`,
      });
    if (status == 404 && data.errors[0].code == 34)
      throw new WOEIDNotFoundException();
    const topics = data[0].trends;

    return topics.map((topic) => new TopicProfileResponse(topic));
  }
}
