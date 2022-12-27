import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateCommunityTables1672145390923 implements MigrationInterface {
  name = 'updateCommunityTables1672145390923';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TYPE "public"."communities_title_enum"
            RENAME TO "communities_title_enum_old"
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."communities_title_enum" AS ENUM('Reddit', 'DC Inside', 'Twitter')
        `);
    await queryRunner.query(`
            ALTER TABLE "communities"
            ALTER COLUMN "title" TYPE "public"."communities_title_enum" USING "title"::"text"::"public"."communities_title_enum"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."communities_title_enum_old"
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."communities_title_enum_old" AS ENUM('Reddit')
        `);
    await queryRunner.query(`
            ALTER TABLE "communities"
            ALTER COLUMN "title" TYPE "public"."communities_title_enum_old" USING "title"::"text"::"public"."communities_title_enum_old"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."communities_title_enum"
        `);
    await queryRunner.query(`
            ALTER TYPE "public"."communities_title_enum_old"
            RENAME TO "communities_title_enum"
        `);
  }
}
