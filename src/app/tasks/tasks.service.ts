import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DcInsideCrawlerService } from '@app/crawler/dc-inside-crawler/dc-inside-crawler.service';
import { RedditCrawlerService } from '@app/crawler/reddit-crawler/reddit-crawler.service';
import { TwitterCrawlerService } from '@app/crawler/twitter-crawler/twitter-crawler.service';
import { YoutubeCrawlerService } from '@app/crawler/youtube-crawler/youtube-crawler.service';
import { TaskFactory } from '@app/tasks/utils/task-factory.utils';
import { Community } from '@domain/post/community.entity';
import { CommunityTitle } from '@domain/post/post';
import { TaskStatus } from '@domain/task/task';
import { Task } from '@domain/task/task.entity';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    private readonly taskFactory: TaskFactory,
    private readonly redditCrawlerService: RedditCrawlerService,
    private readonly dcInsideCrawlerService: DcInsideCrawlerService,
    private readonly twitterCrawlerService: TwitterCrawlerService,
    private readonly youtubeCrawlerService: YoutubeCrawlerService,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Community)
    private readonly communityRepository: Repository<Community>,
  ) {}

  async runTask(
    id: string,
    taskType: CommunityTitle,
    minute: number,
  ): Promise<boolean> {
    await this.taskFactory.runTask(taskType, minute);
    await this.taskRepository.update({ id }, { status: TaskStatus.RUNNING });
    return true;
  }

  async stopTask(id: string, taskType: CommunityTitle): Promise<boolean> {
    const result = await this.taskFactory.stopTask(taskType);
    await this.taskRepository.update({ id }, { status: TaskStatus.STOPPED });
    return result;
  }

  async initializeTasks(): Promise<void> {
    const communities = await this.communityRepository.find();

    for (const data of communities) {
      const task = await this.taskRepository.findOneBy({
        taskType: { id: data.id },
      });
      if (!task) {
        await this.taskRepository.save({
          title: data.title,
          description: `자동으로 생성된 ${data.title} 크롤러입니다.`,
          taskType: data,
        });
      }
    }
  }

  async restoreTasks(): Promise<void> {
    const tasks = await this.taskRepository.find();

    for (const task of tasks) {
      if (task.status === TaskStatus.RUNNING) {
        this.logger.log(`Restore ${task.title} task`);
        await this.runTask(task.id, task.taskType.title, task.period);
      }
    }
  }
}
