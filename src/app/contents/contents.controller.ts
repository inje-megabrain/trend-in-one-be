import { Post, Controller, Param } from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import { ContentsResponse, ContentsType } from '@app/contents/contents.command';
import { ContentsService } from '@app/contents/contents.service';
import { PostProfileResponse } from '@app/contents/post/dto/post-profile.response';
import { TopicProfileResponse } from '@app/contents/topic/dto/topic-profile.response';
import { VideoProfileResponse } from '@app/contents/video/dto/video.profile.response';
import { CommunityTitle } from '@domain/post/post';

@Controller('contents')
@ApiTags('[콘텐츠] 종합')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Post('community/:communityType')
  @ApiParam({
    name: 'communityType',
    required: true,
    enum: CommunityTitle,
    description: '커뮤니티 제목',
    example: CommunityTitle.DC_INSIDE,
  })
  @ApiOperation({
    summary: '커뮤니티명으로 콘텐츠를 가져옵니다.',
  })
  @ApiExtraModels(PostProfileResponse, VideoProfileResponse)
  @ApiBody({
    description: '커뮤니티명에 따라 다른 DTO를 반환합니다.',
    schema: {
      oneOf: [
        {
          $ref: getSchemaPath(PostProfileResponse),
        },
        {
          $ref: getSchemaPath(VideoProfileResponse),
        },
        {
          $ref: getSchemaPath(TopicProfileResponse),
        },
      ],
    },
    examples: {
      DC_INSIDE: {
        value: {
          id: 'e29e6f5d-d5c3-4aa2-a26c-50a6bd23f65e',
          title: '글 제목',
          author: '글 작성자',
          views: 123456,
          likes: 123456,
          hasImage: true,
          postUrl: 'https://www.reddit.com/r/funny/comments/zqfzfc/no_way/',
          uploadedAt: new Date(),
          communityTitle: CommunityTitle.REDDIT,
          contentsType: ContentsType.POST,
        },
      },
      YOUTUBE: {
        value: {
          id: 'e29e6f5d-d5c3-4aa2-a26c-50a6bd23f65e',
          videoId: 'zqfzfc',
          videoUrl: 'https://youtu.be/zqfzfc',
          title: '영상 제목',
          description: '영상 설명',
          thumbnailUri: 'https://i.ytimg.com/vi/zqfzfc/hqdefault.jpg',
          channelId: 'UCzqfzfc',
          channelTitle: '채널 제목',
          communityTitle: CommunityTitle.YOUTUBE,
          uploadedAt: new Date(),
        },
      },
      TWITTER: {
        value: {
          name: '#스마일리뽀이_승준날_생일축하해',
          query:
            '%23%EC%8A%A4%EB%A7%88%EC%9D%BC%EB%A6%AC%EB%BD%80%EC%9D%B4_%EC%8A%B9%EC%A4%80%EB%82%A0_%EC%83%9D%EC%9D%BC%EC%B6%95%ED%95%98%ED%95%B4',
          tweetVolume: '18447',
          url: 'http://twitter.com/search?q=%23%EC%8A%A4%EB%A7%88%EC%9D%BC%EB%A6%AC%EB%BD%80%EC%9D%B4_%EC%8A%B9%EC%A4%80%EB%82%A0_%EC%83%9D%EC%9D%BC%EC%B6%95%ED%95%98%ED%95%B4',
          communityTitle: CommunityTitle.TWITTER,
          contentsType: ContentsType.TOPIC,
        },
      },
    },
  })
  async getContentsByCommunityType(
    @Param('communityType') communityType: CommunityTitle,
  ): Promise<ContentsResponse[]> {
    return await this.contentsService.getContentsByCommunityType(communityType);
  }
}
