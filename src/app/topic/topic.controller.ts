import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { TopicProfileResponse } from '@app/topic/dto/topic-profile.response';
import { TopicService } from '@app/topic/topic.service';
import { TOPIC_ERRORS } from '@domain/errors/topic.errors';

@Controller('topics')
@ApiTags('[토픽] 핫한 주제')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get(':id')
  @ApiOperation({ summary: '인기 주제를 조회합니다.' })
  @ApiParam({
    name: 'id',
    required: true,
    description:
      '접근할 지역의 WOEID,  전세계: 1, UK: 23424975, Brazil: 23424768, South Korea: 23424868 ..',
    example: 23424868,
  })
  @ApiOkResponse({ type: [TopicProfileResponse] })
  @ApiNotFoundResponse({ description: TOPIC_ERRORS.WOEID_NOT_FOUND })
  async getTopics(@Param('id') id: string): Promise<TopicProfileResponse[]> {
    const topics = await this.topicService.getTopics(id);
    return topics.map((topic) => new TopicProfileResponse(topic));
  }
}
