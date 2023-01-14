import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';

import { DcInsideCrawlerService } from '@app/crawler/dc-inside-crawler/dc-inside-crawler.service';
import { RedditCrawlerService } from '@app/crawler/reddit-crawler/reddit-crawler.service';
import { TwitterCrawlerService } from '@app/crawler/twitter-crawler/twitter-crawler.service';
import { YoutubeCrawlerService } from '@app/crawler/youtube-crawler/youtube-crawler.service';
import { CommunityTitle } from '@domain/post/post';

@Injectable()
export class TaskFactory {
  constructor(
    private readonly redditCrawlerService: RedditCrawlerService,
    private readonly dcInsideCrawlerService: DcInsideCrawlerService,
    private readonly twitterCrawlerService: TwitterCrawlerService,
    private readonly youtubeCrawlerService: YoutubeCrawlerService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  private readonly logger = new Logger(TaskFactory.name);

  async runTask(taskType: CommunityTitle, minute: number): Promise<boolean> {
    if (taskType === CommunityTitle.REDDIT) {
      const milliseconds = 1000 * 60 * minute;
      this.logger.warn(`Interval ${taskType} created!`);

      const callback = () => {
        this.logger.warn(
          `Interval ${taskType} executing at time (${milliseconds})!`,
        );
        this.redditCrawlerService.crawlReddit();
      };

      const interval = setInterval(callback, milliseconds);
      this.schedulerRegistry.addInterval(taskType, interval);

      return true;
    }

    if (taskType === CommunityTitle.TWITTER) {
      const milliseconds = 1000 * 60 * minute;
      this.logger.warn(`Interval ${taskType} created!`);

      const callback = () => {
        this.logger.warn(
          `Interval ${taskType} executing at time (${milliseconds})!`,
        );
        this.twitterCrawlerService.getTopics('23424868');
      };

      const interval = setInterval(callback, milliseconds);
      this.schedulerRegistry.addInterval(taskType, interval);
      return true;
    }

    if (taskType === CommunityTitle.YOUTUBE) {
      const milliseconds = 1000 * 60 * minute;
      this.logger.warn(`Interval ${taskType} created!`);

      const callback = () => {
        this.logger.warn(
          `Interval ${taskType} executing at time (${milliseconds})!`,
        );
        this.youtubeCrawlerService.getVideos();
      };

      const interval = setInterval(callback, milliseconds);
      this.schedulerRegistry.addInterval(taskType, interval);
      return true;
    }

    if (taskType === CommunityTitle.DC_INSIDE) {
      const milliseconds = 1000 * 60 * minute;
      this.logger.warn(`Interval ${taskType} created!`);

      const callback = () => {
        this.logger.warn(
          `Interval ${taskType} executing at time (${milliseconds})!`,
        );
        this.dcInsideCrawlerService.crawlDcInside();
      };

      const interval = setInterval(callback, milliseconds);
      this.schedulerRegistry.addInterval(taskType, interval);
      return true;
    }
  }

  async stopTask(taskType: CommunityTitle): Promise<boolean> {
    if (taskType === CommunityTitle.REDDIT) {
      this.schedulerRegistry.deleteInterval(taskType);
      this.logger.warn(`Interval ${taskType} deleted!`);
      return true;
    }
    if (taskType === CommunityTitle.TWITTER) {
      this.schedulerRegistry.deleteInterval(taskType);
      this.logger.warn(`Interval ${taskType} deleted!`);
      return true;
    }
    if (taskType === CommunityTitle.YOUTUBE) {
      this.schedulerRegistry.deleteInterval(taskType);
      this.logger.warn(`Interval ${taskType} deleted!`);
      return true;
    }
    if (taskType === CommunityTitle.DC_INSIDE) {
      this.schedulerRegistry.deleteInterval(taskType);
      this.logger.warn(`Interval ${taskType} deleted!`);
      return true;
    }
  }
}
