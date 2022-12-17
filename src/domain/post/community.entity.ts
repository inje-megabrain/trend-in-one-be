import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { CommunityProperties, CommunityTitle } from './post';

@Entity('communities')
export class Community implements CommunityProperties {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'enum', enum: CommunityTitle })
  title!: CommunityTitle;
}
