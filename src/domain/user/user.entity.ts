import { IsEmail, IsString, Length } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { OAuthType, UserProperties, UserRole } from '@domain/user/user';
import { UserBookmark } from '@domain/user/user-bookmark.entity';

@Entity('users')
export class User extends BaseEntity implements UserProperties {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  @IsEmail()
  @IsString()
  email: string;

  @Column()
  @IsString()
  @Length(5)
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: OAuthType,
    nullable: true,
  })
  oAuthType: OAuthType | null;

  @OneToMany(() => UserBookmark, (userBookmark) => userBookmark)
  bookmarks: UserBookmark[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
