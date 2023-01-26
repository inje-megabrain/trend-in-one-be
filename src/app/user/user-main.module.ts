import { Module } from '@nestjs/common';

import { UserAccountModule } from '@app/user/user-account/user-account.module';
import { UserBookmarkModule } from '@app/user/user-bookmark/user-bookmark.module';

@Module({
  imports: [UserAccountModule, UserBookmarkModule],
})
export class UserMainModule {}
