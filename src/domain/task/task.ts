import { Community } from '@domain/post/community.entity';

export type TaskProperties = {
  id: string;
  title: string;
  description: string;
  period: number;
  taskType: Community;
  status: TaskStatus;
};

export enum TaskStatus {
  RUNNING = 'RUNNING',
  STOPPED = 'STOPPED',
  FAILED = 'FAILED',
}
