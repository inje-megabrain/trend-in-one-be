import { AdminModule } from '@adminjs/nestjs';
import * as AdminJSTypeorm from '@adminjs/typeorm';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import AdminJS from 'adminjs';

import { CrawlerModule } from '@app/crawler/crawler.module';
import { PostModule } from '@app/post/post.module';
import { TasksModule } from '@app/tasks/tasks.module';
import { TasksService } from '@app/tasks/tasks.service';
import { TopicModule } from '@app/topic/topic.module';
import { VideoModule } from '@app/video/video.module';
import { Community } from '@domain/post/community.entity';
import { Task } from '@domain/task/task.entity';
import { User } from '@domain/user/user.entity';

AdminJS.registerAdapter({
  Resource: AdminJSTypeorm.Resource,
  Database: AdminJSTypeorm.Database,
});

@Module({
  imports: [
    AdminModule.createAdminAsync({
      imports: [TasksModule],
      inject: [TasksService],
      useFactory: (tasksService: TasksService) => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [
            {
              resource: User,
            },
            {
              resource: Community,
            },
            {
              resource: Task,
              options: {
                actions: {
                  runTask: {
                    actionType: 'record',
                    handler: async (req, res, context) => {
                      const task = context.record.params;
                      await tasksService.runTask(task['taskType.title'], 5);
                      return { record: context.record.toJSON() };
                    },
                    component: false,
                    icon: 'Play',
                  },
                  stopTask: {
                    actionType: 'record',
                    handler: async (req, res, context) => {
                      const task = context.record.params;
                      await tasksService.stopTask(task['taskType.title']);
                      return { record: context.record.toJSON() };
                    },
                    component: false,
                    icon: 'Stop',
                  },
                },
              },
            },
          ],
          branding: {
            companyName: 'Trend In One',
            logo: false,
          },
        },
        auth: {
          authenticate: async (email, password) =>
            Promise.resolve({ email: 'puleugo@gmail.com' }),
          cookieName: 'adminjs',
          cookiePassword: 'secret',
        },
        sessionOptions: {
          resave: true,
          saveUninitialized: true,
          secret: 'secret',
        },
      }),
    }),
    ScheduleModule.forRoot(),
    PostModule,
    CrawlerModule,
    TopicModule,
    VideoModule,
    TasksModule,
  ],
})
export class AppModule {}
