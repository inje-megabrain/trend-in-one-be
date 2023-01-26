import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { UserBookmarkResponse } from '@app/user/user-account/dto/user-bookmark.response';
import { UserBookmarkService } from '@app/user/user-bookmark/user-bookmark.service';

@Controller('bookmarks/:userId')
@ApiTags('[계정] 북마크')
export class UserBookmarkController {
  constructor(private readonly userBookmarkService: UserBookmarkService) {}

  @Get(':userId')
  @ApiOperation({ summary: '회원의 북마크 목록을 조회합니다.' })
  @ApiParam({
    name: 'userId',
    type: String,
    example: 'a6f9cd0d-8cae-414e-bb68-ae9b6d83118d',
  })
  async getUserBookmarks(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<UserBookmarkResponse[]> {
    const bookmarks = await this.userBookmarkService.getUserBookmarks(userId);
    return bookmarks.map((bookmark) => new UserBookmarkResponse(bookmark));
  }

  @Post(':contentId')
  @ApiOperation({ summary: '회원의 북마크를 추가합니다.' })
  @ApiParam({
    name: 'userId',
    type: String,
    example: 'a6f9cd0d-8cae-414e-bb68-ae9b6d83118d',
  })
  @ApiParam({
    name: 'postId',
    type: String,
    example: 'a6f9cd0d-8cae-414e-bb68-ae9b6d83118d',
  })
  async addUserBookmark(
    @Param('id', ParseUUIDPipe) userId: string,
    @Param('contentId', ParseUUIDPipe) contentId: string,
  ): Promise<UserBookmarkResponse> {
    const bookmark = await this.userBookmarkService.addUserBookmark(
      userId,
      contentId,
    );
    return new UserBookmarkResponse(bookmark);
  }

  @Delete(':userId/:contentId')
  @ApiOperation({ summary: '회원의 북마크를 삭제합니다.' })
  @ApiParam({
    name: 'userId',
    type: String,
    example: 'a6f9cd0d-8cae-414e-bb68-ae9b6d83118d',
  })
  @ApiParam({
    name: 'contentId',
    type: String,
    example: 'a6f9cd0d-8cae-414e-bb68-ae9b6d83118d',
  })
  async removeUserBookmark(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('contentId', ParseUUIDPipe) contentId: string,
  ): Promise<boolean> {
    return await this.userBookmarkService.removeUserBookmark(userId, contentId);
  }
}
