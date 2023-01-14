import { UserUpdateCommand } from '@app/user/user.commands';
import { UserProperties } from '@domain/user/user';

export class UserUpdateRequest implements UserUpdateCommand {
  username?: string;
  email?: string;
  password?: string;
  role?: UserProperties['role'];
  oAuthType?: UserProperties['oAuthType'];
}
