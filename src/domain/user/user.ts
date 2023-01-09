export type UserProperties = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
