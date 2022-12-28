import { NotFoundException } from '@nestjs/common';

export const TOPIC_ERRORS = {
  WOEID_NOT_FOUND: 'WOEID_NOT_FOUND',
};

export class WOEIDNotFoundException extends NotFoundException {
  constructor() {
    super('지원하지 않는 WOEID입니다.', TOPIC_ERRORS.WOEID_NOT_FOUND);
  }
}
