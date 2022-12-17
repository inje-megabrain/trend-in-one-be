import { NotFoundException } from '@nestjs/common';

export const POST_ERRORS = {
  POST_NOT_FOUND: 'POST_NOT_FOUND',
  AUTHOR_NOT_FOUND: 'AUTHOR_NOT_FOUND',
  COMMUNITY_NOT_FOUND: 'COMMUNITY_NOT_FOUND',
};

export class PostNotFoundException extends NotFoundException {
  constructor() {
    super('존재하지 않는 게시글입니다.', POST_ERRORS.POST_NOT_FOUND);
  }
}

export class CommunityNotFoundException extends NotFoundException {
  constructor() {
    super('지원하지 않는 커뮤니티입니다.', POST_ERRORS.COMMUNITY_NOT_FOUND);
  }
}
