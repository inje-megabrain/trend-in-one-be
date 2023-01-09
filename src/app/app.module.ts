import { AdminModule } from '@adminjs/nestjs';
import * as AdminJSTypeorm from '@adminjs/typeorm';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import AdminJS from 'adminjs';

import { TasksModule } from './tasks/tasks.module';

import { CrawlerModule } from '@app/crawler/crawler.module';
import { PostModule } from '@app/post/post.module';
import { TopicModule } from '@app/topic/topic.module';
import { VideoModule } from '@app/video/video.module';

AdminJS.registerAdapter({
  Resource: AdminJSTypeorm.Resource,
  Database: AdminJSTypeorm.Database,
});

const DEFAULT_ADMIN = {
  email: 'test@gmail.com',
  password: 'test12345',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

@Module({
  imports: [
    AdminModule.createAdminAsync({
      useFactory: () => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [],
        },
        // auth: {
        //   authenticate,
        //   cookieName: 'adminjs',
        //   cookiePassword: 'secret',
        // },
        // sessionOptions: {
        //   resave: true,
        //   saveUninitialized: true,
        //   secret: 'secret',
        // },
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
