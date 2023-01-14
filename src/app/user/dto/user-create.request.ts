import { UserCreateCommand } from '@app/user/user.commands';
import { OAuthType, UserRole } from '@domain/user/user';

export class UserCreateRequest implements UserCreateCommand {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  oAuthType: OAuthType | null;
}
