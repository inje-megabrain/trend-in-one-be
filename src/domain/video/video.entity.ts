import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Community } from '@domain/post/community.entity';
import { VideoProperties } from '@domain/video/video';
import { VideoChannel } from '@domain/video/video-channel.entity';

@Entity('videos')
export class Video extends BaseEntity implements VideoProperties {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  videoId: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  thumbnailUri: string;

  @ManyToOne(() => VideoChannel, (videoChannel) => videoChannel)
  channel: VideoChannel | null;

  @ManyToOne(() => Community, (community) => community)
  community: Community;

  @Column()
  etag: string; // 콘텐츠 업데이트 여부

  @Column({ type: 'timestamp' })
  uploadedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
