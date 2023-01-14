import { UserPasswordUpdateCommand } from '@app/user/user.commands';

export class UserPasswordUpdateRequest implements UserPasswordUpdateCommand {
  password!: string;
}
