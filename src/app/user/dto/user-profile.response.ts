import { UserProfile } from '@app/user/user.commands';
import { OAuthType, UserRole } from '@domain/user/user';

export class UserProfileResponse implements UserProfile {
  username: string;
  email: string;
  role: UserRole;
  oAuthType: OAuthType;

  constructor(user: UserProfile) {
    Object.assign(this, user);
  }
}
