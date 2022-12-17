import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Community } from './community.entity';
import { PostProperties } from './post';

@Entity('posts')
export class Post implements PostProperties {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  title!: string;

  @Column({ type: 'varchar', length: 100 })
  author!: string;

  @Column({ type: 'int', nullable: true })
  views!: number | null;

  @Column({ type: 'int', nullable: true })
  likes!: number | null;

  @Column({ type: 'boolean' })
  hasImage!: boolean;

  @Column()
  postUrl!: string;

  @Column({ type: 'date' })
  uploadedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt!: Date | null;

  @OneToOne(() => Community)
  @JoinColumn()
  community!: Community;
}
