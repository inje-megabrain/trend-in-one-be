import { Controller, Param, Post } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { TwitterCrawlerService } from '@app/crawler/twitter-crawler/twitter-crawler.service';
import { TopicProfileResponse } from '@app/topic/dto/topic-profile.response';
import { TOPIC_ERRORS } from '@domain/errors/topic.errors';

@Controller('twitter-crawler')
@ApiTags('[크롤러] TWITTER')
export class TwitterCrawlerController {
  constructor(private readonly twitterCrawlerService: TwitterCrawlerService) {}

  @Post(':id')
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
  async getTopics(@Param('id') id: string): Promise<boolean> {
    const topics = await this.twitterCrawlerService.getTopics(id);

    return true;
  }
}
