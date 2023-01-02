import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CommunityProperties, CommunityTitle } from './post';

import { Post } from '@domain/post/post.entity';
import { Topic } from '@domain/topic/topic.entity';

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
}
