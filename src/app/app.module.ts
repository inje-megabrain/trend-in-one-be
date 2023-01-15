import * as AdminJSTypeorm from '@adminjs/typeorm';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import AdminJS from 'adminjs';

import { ContentsModule } from '@app/contents/contents.module';
import { ManagementModule } from '@app/management/management.module';
import { TasksModule } from '@app/tasks/tasks.module';
import { UserModule } from '@app/user/user.module';

AdminJS.registerAdapter({
  Resource: AdminJSTypeorm.Resource,
  Database: AdminJSTypeorm.Database,
});

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TasksModule,
    UserModule,
    ContentsModule,
    ManagementModule,
  ],
})
export class AppModule {}
