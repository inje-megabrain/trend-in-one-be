import { NotFoundException, RequestTimeoutException } from '@nestjs/common';

export const DC_INSIDE_CRAWLER_ERRORS = {
  POST_NOT_FOUND: 'POST_NOT_FOUND',
  TIMEOUT: 'TIMEOUT',
};

export class PostNotFoundException extends NotFoundException {
  constructor() {
    super(
      '존재하지 않는 게시글입니다.',
      DC_INSIDE_CRAWLER_ERRORS.POST_NOT_FOUND,
    );
  }
}

export class TimeoutException extends RequestTimeoutException {
  constructor() {
    super(
      '크롤링 진행 중 Timeout Error가 발생했습니다.',
      DC_INSIDE_CRAWLER_ERRORS.TIMEOUT,
    );
  }
}
