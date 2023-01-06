import { MigrationInterface, QueryRunner } from 'typeorm';

export class createVideosTables1672806887632 implements MigrationInterface {
  name = 'createVideosTables1672806887632';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TYPE "public"."communities_title_enum"
            RENAME TO "communities_title_enum_old"
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."communities_title_enum" AS ENUM('REDDIT', 'DC_INSIDE', 'TWITTER', 'YOUTUBE')
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
            CREATE TYPE "public"."communities_title_enum_old" AS ENUM('REDDIT', 'DC_INSIDE', 'TWITTER')
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
