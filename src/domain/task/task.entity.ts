import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Community } from '@domain/post/community.entity';
import { TaskProperties, TaskStatus } from '@domain/task/task';

@Entity('tasks')
export class Task extends BaseEntity implements TaskProperties {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Community, (community) => community, { eager: true })
  taskType: Community;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.STOPPED,
  })
  status: TaskStatus;
}
