import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';

import { DcInsideCrawlerService } from '@app/crawler/dc-inside-crawler/dc-inside-crawler.service';
import { RedditCrawlerService } from '@app/crawler/reddit-crawler/reddit-crawler.service';
import { TwitterCrawlerService } from '@app/crawler/twitter-crawler/twitter-crawler.service';
import { YoutubeCrawlerService } from '@app/crawler/youtube-crawler/youtube-crawler.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly redditCrawlerService: RedditCrawlerService,
    private readonly dcInsideCrawlerService: DcInsideCrawlerService,
    private readonly twitterCrawlerService: TwitterCrawlerService,
    private readonly youtubeCrawlerService: YoutubeCrawlerService,
  ) {}
  private readonly logger = new Logger(TasksService.name);

  @Interval(1000 * 60 * 30)
  handleInterval() {
    this.logger.debug('30분 마다 한번 호출');

    Promise.all([
      this.redditCrawlerService.crawlReddit(),
      this.dcInsideCrawlerService.crawlDcInside(),
      this.twitterCrawlerService.getTopics('23424868'),
      this.youtubeCrawlerService.getVideos(),
    ])
      .then(() => this.logger.debug('크롤링 완료'))
      .catch((error) => {
        this.logger.error(error);
      });
  }
}
