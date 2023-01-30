import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
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

import { UserAuthType, UserProperties, UserRole } from '@domain/user/user';
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

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  @Length(5)
  password: string | null;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserAuthType,
  })
  @IsEnum(UserAuthType)
  @IsNotEmpty()
  authType: UserAuthType;

  @OneToMany(() => UserBookmark, (userBookmark) => userBookmark)
  bookmarks: UserBookmark[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
