import { AdminModule } from '@adminjs/nestjs';
import * as AdminJSTypeorm from '@adminjs/typeorm';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import AdminJS from 'adminjs';

import { ContentsModule } from '@app/contents/contents.module';
import { TasksModule } from '@app/tasks/tasks.module';
import { TasksService } from '@app/tasks/tasks.service';
import { Community } from '@domain/post/community.entity';
import { TaskStatus } from '@domain/task/task';
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
                      await tasksService.runTask(
                        task.id,
                        task['taskType.title'],
                        1,
                      );
                      task.status = TaskStatus.RUNNING;

                      return {
                        record: context.record.toJSON(),
                      };
                    },
                    component: false,
                    icon: 'Play',
                  },

                  stopTask: {
                    actionType: 'record',
                    handler: async (req, res, context) => {
                      const { record } = context;
                      const task = record.params;
                      await tasksService.stopTask(
                        task.id,
                        task['taskType.title'],
                      );
                      task.status = TaskStatus.STOPPED;

                      return {
                        record: context.record.toJSON(),
                        msg: 'Hello world',
                      };
                    },
                    guard: '???????????? ??????????????????????',
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
    TasksModule,
    ContentsModule,
  ],
})
export class AppModule {}
