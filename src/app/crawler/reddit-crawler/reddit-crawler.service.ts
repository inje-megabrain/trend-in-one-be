import { Injectable } from '@nestjs/common';

@Injectable()
export class RedditCrawlerService {
  constructor() {}

  async crawlReddit(): Promise<boolean> {
    console.log('Starting Crawling Reddit...');
    //API 엑세스 토큰 가져오기

    //API 엑세스 토큰으로 크롤링

    //크롤링한 데이터를 DB에 저장

    return true;
  }
}
