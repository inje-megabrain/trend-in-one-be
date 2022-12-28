import { Controller, Get, Param } from '@nestjs/common';

import { TopicProfileResponse } from '@app/topic/dto/topic-profile.response';
import { TopicService } from '@app/topic/topic.service';

@Controller('topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get(':id')
  async getTopics(@Param('id') id: string): Promise<TopicProfileResponse[]> {
    return await this.topicService.getTopics(id);
  }
}
