import { MigrationInterface, QueryRunner } from 'typeorm';

export class createBookmarksTable1674748866584 implements MigrationInterface {
  name = 'createBookmarksTable1674748866584';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user_bookmarks" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "userId" uuid,
                "postId" uuid,
                CONSTRAINT "PK_1d1b73d6be08cec5c83521e4432" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "user_bookmarks"
            ADD CONSTRAINT "FK_4b389508f2d566939ed163a00d6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "user_bookmarks"
            ADD CONSTRAINT "FK_7ad1b47dd13eedba66aad858e7a" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user_bookmarks" DROP CONSTRAINT "FK_7ad1b47dd13eedba66aad858e7a"
        `);
    await queryRunner.query(`
            ALTER TABLE "user_bookmarks" DROP CONSTRAINT "FK_4b389508f2d566939ed163a00d6"
        `);
    await queryRunner.query(`
            DROP TABLE "user_bookmarks"
        `);
  }
}
