import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PostProperties } from './post';

@Entity('posts')
export class Post implements PostProperties {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar', length: 100 })
  author!: string;

  @Column({ type: 'int' })
  views: number;

  @Column()
  redirectUrl: string;

  @Column({ type: 'date' })
  uploadedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;

  @UpdateDateColumn()
  updatedAt: Date;
}
