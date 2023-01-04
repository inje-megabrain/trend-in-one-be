import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CommunityProperties, CommunityTitle } from './post';

import { Post } from '@domain/post/post.entity';
import { Topic } from '@domain/topic/topic.entity';
import { VideoChannel } from '@domain/video/video-channel.entity';
import { Video } from '@domain/video/video.entity';

@Entity('communities')
export class Community implements CommunityProperties {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'enum', enum: CommunityTitle })
  title!: CommunityTitle;

  @OneToMany(() => Post, ({ community }) => community)
  posts!: Post[];

  @OneToMany(() => Topic, ({ community }) => community)
  topic!: Topic[];

  @OneToMany(() => Video, ({ community }) => community)
  video!: Video[];

  @OneToMany(() => VideoChannel, ({ community }) => community)
  videoChannel!: VideoChannel[];
}
