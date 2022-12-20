import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatePostsCommunitiesTable1671530859136
  implements MigrationInterface
{
  name = 'updatePostsCommunitiesTable1671530859136';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "posts" DROP CONSTRAINT "FK_63078ada3266846e539d930b1be"
        `);
    await queryRunner.query(`
            ALTER TABLE "posts" DROP CONSTRAINT "REL_63078ada3266846e539d930b1b"
        `);
    await queryRunner.query(`
            ALTER TABLE "posts"
            ADD CONSTRAINT "FK_63078ada3266846e539d930b1be" FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "posts" DROP CONSTRAINT "FK_63078ada3266846e539d930b1be"
        `);
    await queryRunner.query(`
            ALTER TABLE "posts"
            ADD CONSTRAINT "REL_63078ada3266846e539d930b1b" UNIQUE ("community_id")
        `);
    await queryRunner.query(`
            ALTER TABLE "posts"
            ADD CONSTRAINT "FK_63078ada3266846e539d930b1be" FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }
}
