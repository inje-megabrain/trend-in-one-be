import * as AdminJSTypeorm from '@adminjs/typeorm';
import { Module, OnModuleInit } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import AdminJS from 'adminjs';

import { AppController } from '@app/app.controller';
import { AuthModule } from '@app/auth/auth.module';
import { ContentsModule } from '@app/contents/contents.module';
import { ContentsService } from '@app/contents/contents.service';
import { ManagementModule } from '@app/management/management.module';
import { TasksModule } from '@app/tasks/tasks.module';
import { TasksService } from '@app/tasks/tasks.service';
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
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly contentsService: ContentsService,
    private readonly tasksService: TasksService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.contentsService.createAllCommunities();
    await this.tasksService.initializeTasks();
    await this.tasksService.restoreTasks();
  }
}
