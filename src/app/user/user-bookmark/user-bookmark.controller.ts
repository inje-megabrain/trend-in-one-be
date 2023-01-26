import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

import { UserBookmarkResponse } from '@app/user/user-account/dto/user-bookmark.response';
import { UserBookmarkService } from '@app/user/user-bookmark/user-bookmark.service';

@Controller('user-account-bookmark')
export class UserBookmarkController {
  constructor(private readonly userBookmarkService: UserBookmarkService) {}

  @Get(':id/bookmarks')
  @ApiOperation({ summary: '회원의 북마크 목록을 조회합니다.' })
  @ApiParam({
    name: 'id',
    type: String,
    example: 'a6f9cd0d-8cae-414e-bb68-ae9b6d83118d',
  })
  async getUserBookmarks(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserBookmarkResponse[]> {
    const bookmarks = await this.userBookmarkService.getUserBookmarks(id);
    return bookmarks.map((bookmark) => new UserBookmarkResponse(bookmark));
  }

  @Post(':id/bookmarks/:postId')
  @ApiOperation({ summary: '회원의 북마크를 추가합니다.' })
  @ApiParam({
    name: 'id',
    type: String,
    example: 'a6f9cd0d-8cae-414e-bb68-ae9b6d83118d',
  })
  @ApiParam({
    name: 'postId',
    type: String,
    example: 'a6f9cd0d-8cae-414e-bb68-ae9b6d83118d',
  })
  async addUserBookmark(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('postId', ParseUUIDPipe) postId: string,
  ): Promise<UserBookmarkResponse> {
    const bookmark = await this.userBookmarkService.addUserBookmark(id, postId);
    return new UserBookmarkResponse(bookmark);
  }

  @Delete(':id/bookmarks/:postId')
  @ApiOperation({ summary: '회원의 북마크를 삭제합니다.' })
  @ApiParam({
    name: 'id',
    type: String,
    example: 'a6f9cd0d-8cae-414e-bb68-ae9b6d83118d',
  })
  @ApiParam({
    name: 'postId',
    type: String,
    example: 'a6f9cd0d-8cae-414e-bb68-ae9b6d83118d',
  })
  async removeUserBookmark(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('postId', ParseUUIDPipe) postId: string,
  ): Promise<boolean> {
    return await this.userBookmarkService.removeUserBookmark(id, postId);
  }
}
