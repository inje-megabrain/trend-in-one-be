import { IsEnum, IsString } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Community } from '@domain/post/community.entity';
import { CommunityTitle } from '@domain/post/post';
import { TaskProperties, TaskStatus } from '@domain/task/task';

@Entity('tasks')
export class Task extends BaseEntity implements TaskProperties {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  id: string;

  @Column()
  @IsString()
  title: string;

  @Column({ nullable: true })
  @IsString()
  description: string | null;

  @ManyToOne(() => Community, (community) => community, { eager: true })
  @IsEnum(CommunityTitle)
  taskType: Community;

  @Column({ default: 5 })
  period: number;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.STOPPED,
  })
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
